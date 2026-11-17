/* @ts-self-types="./corps_core.d.ts" */

/**
 * Index spatial BVH sur les boîtes englobantes des structures anatomiques.
 * Le but est de garder le CPU hors du chemin critique : le rendu reste dans
 * Three.js, tandis que le culling, le LOD et le picking sont faits ici en WASM.
 */
export class AnatomyIndex {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AnatomyIndexFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_anatomyindex_free(ptr, 0);
    }
    /**
     * Construit le BVH. À appeler une seule fois après tous les push().
     * @param {number} leaf_size
     */
    build(leaf_size) {
        wasm.anatomyindex_build(this.__wbg_ptr, leaf_size);
    }
    /**
     * @returns {number}
     */
    len() {
        const ret = wasm.anatomyindex_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        const ret = wasm.anatomyindex_new(capacity);
        this.__wbg_ptr = ret;
        AnatomyIndexFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    node_count() {
        const ret = wasm.anatomyindex_node_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Ajoute une structure : identifiant, centre, rayon, bornes min/max.
     * @param {number} id
     * @param {number} cx
     * @param {number} cy
     * @param {number} cz
     * @param {number} radius
     * @param {number} minx
     * @param {number} miny
     * @param {number} minz
     * @param {number} maxx
     * @param {number} maxy
     * @param {number} maxz
     */
    push(id, cx, cy, cz, radius, minx, miny, minz, maxx, maxy, maxz) {
        wasm.anatomyindex_push(this.__wbg_ptr, id, cx, cy, cz, radius, minx, miny, minz, maxx, maxy, maxz);
    }
    /**
     * Raycast optimisé : renvoie l'identifiant de la structure la plus proche,
     * ou -1. Origin + direction (normalisée) + distance maximale.
     * @param {number} ox
     * @param {number} oy
     * @param {number} oz
     * @param {number} dx
     * @param {number} dy
     * @param {number} dz
     * @param {number} max_dist
     * @returns {number}
     */
    raycast(ox, oy, oz, dx, dy, dz, max_dist) {
        const ret = wasm.anatomyindex_raycast(this.__wbg_ptr, ox, oy, oz, dx, dy, dz, max_dist);
        return ret;
    }
    /**
     * Culling frustum + LOD par distance. `planes` contient 6 plans (a,b,c,d).
     * Renvoie les identifiants à rendre pour le niveau de détail demandé.
     * @param {Float32Array | number[]} planes
     * @param {number} camx
     * @param {number} camy
     * @param {number} camz
     * @param {number} lod_bias
     * @returns {Uint32Array}
     */
    visible(planes, camx, camy, camz, lod_bias) {
        const val2 = +camx;
        const val3 = +camy;
        const val4 = +camz;
        const val5 = +lod_bias;
        const ptr0 = passArrayF32ToWasm0(planes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.anatomyindex_visible(this.__wbg_ptr, ptr0, len0, val2, val3, val4, val5);
        var v6 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v6;
    }
    /**
     * Variante sans allocation : écrit les identifiants dans un tableau JS
     * pré-alloué et renvoie le nombre d'entrées écrites. C'est le chemin
     * recommandé pour la boucle de rendu.
     * @param {Float32Array | number[]} planes
     * @param {number} camx
     * @param {number} camy
     * @param {number} camz
     * @param {number} lod_bias
     * @param {Uint32Array} out
     * @returns {number}
     */
    visible_into(planes, camx, camy, camz, lod_bias, out) {
        const val3 = +camx;
        const val4 = +camy;
        const val5 = +camz;
        const val6 = +lod_bias;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passArrayF32ToWasm0(planes, wasm.__wbindgen_malloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArray32ToWasm0(out, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 4, 4); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 4, 4); }
            throw e;
        }
        const ret = wasm.anatomyindex_visible_into(this.__wbg_ptr, ptr0, len0, val3, val4, val5, val6, ptr1, len1, out);
        return ret >>> 0;
    }
}
if (Symbol.dispose) AnatomyIndex.prototype[Symbol.dispose] = AnatomyIndex.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_copy_to_typed_array_680b191e71920dc1: function(arg0, arg1, arg2) {
            new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(getArrayU8FromWasm0(arg0, arg1));
        },
        __wbg___wbindgen_throw_4c88d8bf264fd984: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            table.set(0, undefined);
            table.set(1024, undefined);
            table.set(1025, null);
            table.set(1026, true);
            table.set(1027, false);
        },
    };
    return {
        __proto__: null,
        "./corps_core_bg.js": import0,
    };
}

const AnatomyIndexFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_anatomyindex_free(ptr, 1));

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(bytes) {
    numBytesDecoded += bytes.length;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
        cachedTextDecoder.decode();
        numBytesDecoded = bytes.length;
    }
    return cachedTextDecoder.decode(bytes);
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

let __wbg_init_promise;
async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;
    if (__wbg_init_promise === undefined) {
        __wbg_init_promise = __wbg_init_once(module_or_path);
        __wbg_init_promise.catch(() => { __wbg_init_promise = undefined; });
    }
    return __wbg_init_promise;
}

async function __wbg_init_once(module_or_path) {

    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('corps_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
