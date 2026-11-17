/* tslint:disable */
/* eslint-disable */

/**
 * Index spatial BVH sur les boîtes englobantes des structures anatomiques.
 * Le but est de garder le CPU hors du chemin critique : le rendu reste dans
 * Three.js, tandis que le culling, le LOD et le picking sont faits ici en WASM.
 */
export class AnatomyIndex {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Construit le BVH. À appeler une seule fois après tous les push().
     */
    build(leaf_size: number): void;
    len(): number;
    constructor(capacity: number);
    node_count(): number;
    /**
     * Ajoute une structure : identifiant, centre, rayon, bornes min/max.
     */
    push(id: number, cx: number, cy: number, cz: number, radius: number, minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number): void;
    /**
     * Raycast optimisé : renvoie l'identifiant de la structure la plus proche,
     * ou -1. Origin + direction (normalisée) + distance maximale.
     */
    raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, max_dist: number): number;
    /**
     * Culling frustum + LOD par distance. `planes` contient 6 plans (a,b,c,d).
     * Renvoie les identifiants à rendre pour le niveau de détail demandé.
     */
    visible(planes: Float32Array | number[], camx: number, camy: number, camz: number, lod_bias: number): Uint32Array;
    /**
     * Variante sans allocation : écrit les identifiants dans un tableau JS
     * pré-alloué et renvoie le nombre d'entrées écrites. C'est le chemin
     * recommandé pour la boucle de rendu.
     */
    visible_into(planes: Float32Array | number[], camx: number, camy: number, camz: number, lod_bias: number, out: Uint32Array): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_anatomyindex_free: (a: number, b: number) => void;
    readonly anatomyindex_build: (a: number, b: number) => void;
    readonly anatomyindex_len: (a: number) => number;
    readonly anatomyindex_new: (a: number) => number;
    readonly anatomyindex_node_count: (a: number) => number;
    readonly anatomyindex_push: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number) => void;
    readonly anatomyindex_raycast: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly anatomyindex_visible: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
    readonly anatomyindex_visible_into: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: any) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
