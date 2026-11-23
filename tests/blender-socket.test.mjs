import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const out = execFileSync('python3', [root + 'scripts/blender_socket.py', 'get_scene_info'], {
  encoding: 'utf8',
  timeout: 30000,
});
const scene = JSON.parse(out);
if (!Number.isInteger(scene.object_count) || scene.object_count < 1) {
  throw new Error('réponse socket invalide : ' + out.slice(0, 200));
}
console.log('PASS socket Blender', scene.object_count, 'objets');
