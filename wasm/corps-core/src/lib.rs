use wasm_bindgen::prelude::*;

#[derive(Clone, Copy)]
struct Node {
    min: [f32; 3],
    max: [f32; 3],
    left: i32,
    right: i32,
    start: u32,
    end: u32,
}

impl Node {
    fn empty() -> Node {
        Node {
            min: [f32::INFINITY; 3],
            max: [f32::NEG_INFINITY; 3],
            left: -1,
            right: -1,
            start: 0,
            end: 0,
        }
    }
    fn expand(&mut self, min: [f32; 3], max: [f32; 3]) {
        for i in 0..3 {
            if min[i] < self.min[i] { self.min[i] = min[i]; }
            if max[i] > self.max[i] { self.max[i] = max[i]; }
        }
    }
}

/// Index spatial BVH sur les boîtes englobantes des structures anatomiques.
/// Le but est de garder le CPU hors du chemin critique : le rendu reste dans
/// Three.js, tandis que le culling, le LOD et le picking sont faits ici en WASM.
#[wasm_bindgen]
pub struct AnatomyIndex {
    centers: Vec<[f32; 3]>,
    radii: Vec<f32>,
    mins: Vec<[f32; 3]>,
    maxs: Vec<[f32; 3]>,
    nodes: Vec<Node>,
    order: Vec<u32>,
    leaf_size: usize,
}

#[wasm_bindgen]
impl AnatomyIndex {
    #[wasm_bindgen(constructor)]
    pub fn new(capacity: u32) -> AnatomyIndex {
        let capacity = capacity as usize;
        AnatomyIndex {
            centers: Vec::with_capacity(capacity),
            radii: Vec::with_capacity(capacity),
            mins: Vec::with_capacity(capacity),
            maxs: Vec::with_capacity(capacity),
            nodes: Vec::new(),
            order: Vec::with_capacity(capacity),
            leaf_size: 8,
        }
    }

    /// Ajoute une structure : identifiant, centre, rayon, bornes min/max.
    pub fn push(&mut self, id: u32, cx: f32, cy: f32, cz: f32, radius: f32,
                minx: f32, miny: f32, minz: f32, maxx: f32, maxy: f32, maxz: f32) {
        let idx = id as usize;
        if self.centers.len() <= idx {
            let new_len = idx + 1;
            self.centers.resize(new_len, [0.0; 3]);
            self.radii.resize(new_len, 0.0);
            self.mins.resize(new_len, [0.0; 3]);
            self.maxs.resize(new_len, [0.0; 3]);
        }
        self.centers[idx] = [cx, cy, cz];
        self.radii[idx] = radius;
        self.mins[idx] = [minx, miny, minz];
        self.maxs[idx] = [maxx, maxy, maxz];
    }

    /// Construit le BVH. À appeler une seule fois après tous les push().
    pub fn build(&mut self, leaf_size: u32) {
        self.leaf_size = leaf_size.max(1) as usize;
        self.nodes.clear();
        self.order.clear();
        for i in 0..self.centers.len() {
            if self.radii[i] > 0.0 { self.order.push(i as u32); }
        }
        if self.order.is_empty() { return; }
        let root = self.build_range(0, self.order.len() as u32);
        debug_assert_eq!(root, 0);
    }

    fn build_range(&mut self, start: u32, end: u32) -> i32 {
        let node_index = self.nodes.len() as i32;
        let mut node = Node::empty();
        for &id in &self.order[start as usize..end as usize] {
            let i = id as usize;
            node.expand(self.mins[i], self.maxs[i]);
        }
        let count = end - start;
        self.nodes.push(node);
        if count as usize <= self.leaf_size {
            self.nodes[node_index as usize].start = start;
            self.nodes[node_index as usize].end = end;
            return node_index;
        }
        // Axe le plus étendu (centroïdes).
        let mut extent = [0f32; 3];
        for axis in 0..3 {
            let mut lo = f32::INFINITY;
            let mut hi = f32::NEG_INFINITY;
            for &id in &self.order[start as usize..end as usize] {
                let v = self.centers[id as usize][axis];
                if v < lo { lo = v; }
                if v > hi { hi = v; }
            }
            extent[axis] = hi - lo;
        }
        let axis = if extent[0] >= extent[1] && extent[0] >= extent[2] { 0 }
                   else if extent[1] >= extent[2] { 1 } else { 2 };
        let mid = start + count / 2;
        self.order[start as usize..end as usize]
            .sort_unstable_by(|&a, &b| {
                self.centers[a as usize][axis]
                    .partial_cmp(&self.centers[b as usize][axis])
                    .unwrap_or(std::cmp::Ordering::Equal)
            });
        let left = self.build_range(start, mid);
        let right = self.build_range(mid, end);
        self.nodes[node_index as usize].left = left;
        self.nodes[node_index as usize].right = right;
        node_index
    }

    /// Raycast optimisé : renvoie l'identifiant de la structure la plus proche,
    /// ou -1. Origin + direction (normalisée) + distance maximale.
    pub fn raycast(&self, ox: f32, oy: f32, oz: f32, dx: f32, dy: f32, dz: f32, max_dist: f32) -> i32 {
        if self.nodes.is_empty() { return -1; }
        let inv = [
            if dx.abs() < 1e-8 { 1e8 } else { 1.0 / dx },
            if dy.abs() < 1e-8 { 1e8 } else { 1.0 / dy },
            if dz.abs() < 1e-8 { 1e8 } else { 1.0 / dz },
        ];
        let origin = [ox, oy, oz];
        let dir = [dx, dy, dz];
        let mut best_t = max_dist;
        let mut best_id: i32 = -1;
        let mut stack: Vec<i32> = Vec::with_capacity(64);
        stack.push(0);
        while let Some(node_index) = stack.pop() {
            let node = &self.nodes[node_index as usize];
            let mut tmin = 0.0f32;
            let mut tmax = best_t;
            let mut hit = true;
            for i in 0..3 {
                let t1 = (node.min[i] - origin[i]) * inv[i];
                let t2 = (node.max[i] - origin[i]) * inv[i];
                let (near, far) = if t1 < t2 { (t1, t2) } else { (t2, t1) };
                if near > tmin { tmin = near; }
                if far < tmax { tmax = far; }
                if tmin > tmax { hit = false; break; }
            }
            if !hit { continue; }
            if node.left >= 0 {
                stack.push(node.left);
                stack.push(node.right);
            } else {
                for &id in &self.order[node.start as usize..node.end as usize] {
                    let i = id as usize;
                    let mut tmin2 = 0.0f32;
                    let mut tmax2 = best_t;
                    let mut hit2 = true;
                    for a in 0..3 {
                        let t1 = (self.mins[i][a] - origin[a]) * inv[a];
                        let t2 = (self.maxs[i][a] - origin[a]) * inv[a];
                        let (near, far) = if t1 < t2 { (t1, t2) } else { (t2, t1) };
                        if near > tmin2 { tmin2 = near; }
                        if far < tmax2 { tmax2 = far; }
                        if tmin2 > tmax2 { hit2 = false; break; }
                    }
                    if hit2 && tmin2 < best_t {
                        // Distance au centre pour départager les AABB imbriquées.
                        let cx = self.centers[i][0] - ox;
                        let cy = self.centers[i][1] - oy;
                        let cz = self.centers[i][2] - oz;
                        let center_dist = (cx * cx + cy * cy + cz * cz).sqrt()
                            - (self.centers[i][0] * dir[0] + self.centers[i][1] * dir[1] + self.centers[i][2] * dir[2]);
                        let score = tmin2 + center_dist.abs() * 0.001;
                        if score < best_t {
                            best_t = score;
                            best_id = id as i32;
                        }
                    }
                }
            }
        }
        best_id
    }

    /// Culling frustum + LOD par distance. `planes` contient 6 plans (a,b,c,d).
    /// Renvoie les identifiants à rendre pour le niveau de détail demandé.
    pub fn visible(&self, planes: &[f32], camx: f32, camy: f32, camz: f32, lod_bias: f32) -> Vec<u32> {
        let mut out: Vec<u32> = Vec::with_capacity(self.order.len());
        if self.nodes.is_empty() { return out; }
        let mut stack: Vec<i32> = Vec::with_capacity(64);
        stack.push(0);
        while let Some(node_index) = stack.pop() {
            let node = &self.nodes[node_index as usize];
            let mut outside = false;
            for p in 0..6 {
                let o = p * 4;
                if o + 3 >= planes.len() { break; }
                let a = planes[o]; let b = planes[o + 1]; let c = planes[o + 2]; let d = planes[o + 3];
                // Sommet "positif" : si même lui est hors du plan, tout l'AABB
                // est hors du frustum et le sous-arbre peut être élagué.
                let px = if a >= 0.0 { node.max[0] } else { node.min[0] };
                let py = if b >= 0.0 { node.max[1] } else { node.min[1] };
                let pz = if c >= 0.0 { node.max[2] } else { node.min[2] };
                if a * px + b * py + c * pz + d < 0.0 { outside = true; break; }
            }
            if outside { continue; }
            if node.left >= 0 {
                stack.push(node.left);
                stack.push(node.right);
            } else {
                for &id in &self.order[node.start as usize..node.end as usize] {
                    let i = id as usize;
                    let center = self.centers[i];
                    let mut outside_i = false;
                    for p in 0..6 {
                        let o = p * 4;
                        if o + 3 >= planes.len() { break; }
                        let a = planes[o]; let b = planes[o + 1]; let c = planes[o + 2]; let d = planes[o + 3];
                        let sx = center[0] + if a >= 0.0 { self.radii[i] } else { -self.radii[i] };
                        let sy = center[1] + if b >= 0.0 { self.radii[i] } else { -self.radii[i] };
                        let sz = center[2] + if c >= 0.0 { self.radii[i] } else { -self.radii[i] };
                        if a * sx + b * sy + c * sz + d < 0.0 { outside_i = true; break; }
                    }
                    if outside_i { continue; }
                    let dx = center[0] - camx;
                    let dy = center[1] - camy;
                    let dz = center[2] - camz;
                    let dist = (dx * dx + dy * dy + dz * dz).sqrt();
                    // LOD angulaire : une structure est rendue si sa taille
                    // angulaire dépasse un seuil ~1/120 rad * lod_bias.
                    let threshold = (self.radii[i] * 120.0 + 0.05).max(3.5) * lod_bias;
                    if dist <= threshold {
                        out.push(id);
                    }
                }
            }
        }
        out
    }

    /// Variante sans allocation : écrit les identifiants dans un tableau JS
    /// pré-alloué et renvoie le nombre d'entrées écrites. C'est le chemin
    /// recommandé pour la boucle de rendu.
    pub fn visible_into(&self, planes: &[f32], camx: f32, camy: f32, camz: f32,
                        lod_bias: f32, out: &mut [u32]) -> u32 {
        let mut written = 0u32;
        if self.nodes.is_empty() { return 0; }
        let mut stack: Vec<i32> = Vec::with_capacity(64);
        stack.push(0);
        while let Some(node_index) = stack.pop() {
            let node = &self.nodes[node_index as usize];
            let mut outside = false;
            for p in 0..6 {
                let o = p * 4;
                if o + 3 >= planes.len() { break; }
                let a = planes[o]; let b = planes[o + 1]; let c = planes[o + 2]; let d = planes[o + 3];
                let px = if a >= 0.0 { node.max[0] } else { node.min[0] };
                let py = if b >= 0.0 { node.max[1] } else { node.min[1] };
                let pz = if c >= 0.0 { node.max[2] } else { node.min[2] };
                if a * px + b * py + c * pz + d < 0.0 { outside = true; break; }
            }
            if outside { continue; }
            if node.left >= 0 {
                stack.push(node.left);
                stack.push(node.right);
            } else {
                for &id in &self.order[node.start as usize..node.end as usize] {
                    let i = id as usize;
                    let center = self.centers[i];
                    let mut outside_i = false;
                    for p in 0..6 {
                        let o = p * 4;
                        if o + 3 >= planes.len() { break; }
                        let a = planes[o]; let b = planes[o + 1]; let c = planes[o + 2]; let d = planes[o + 3];
                        let sx = center[0] + if a >= 0.0 { self.radii[i] } else { -self.radii[i] };
                        let sy = center[1] + if b >= 0.0 { self.radii[i] } else { -self.radii[i] };
                        let sz = center[2] + if c >= 0.0 { self.radii[i] } else { -self.radii[i] };
                        if a * sx + b * sy + c * sz + d < 0.0 { outside_i = true; break; }
                    }
                    if outside_i { continue; }
                    let dx = center[0] - camx;
                    let dy = center[1] - camy;
                    let dz = center[2] - camz;
                    let dist2 = dx * dx + dy * dy + dz * dz;
                    let threshold = (self.radii[i] * 120.0 + 0.05).max(3.5) * lod_bias;
                    if dist2 <= threshold * threshold && (written as usize) < out.len() {
                        out[written as usize] = id;
                        written += 1;
                    }
                }
            }
        }
        written
    }

    pub fn len(&self) -> u32 { self.centers.len() as u32 }
    pub fn node_count(&self) -> u32 { self.nodes.len() as u32 }
}
