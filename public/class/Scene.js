export function Scene() {
	this.meshes = new Set();
};

Scene.prototype.add = function(...meshes) {
	for (const mesh of meshes) this.meshes.add(mesh);
};

Scene.prototype.remove = function(...meshes) {
	for (const mesh of meshes) this.meshes.delete(mesh);
};