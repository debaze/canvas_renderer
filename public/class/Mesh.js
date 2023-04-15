import {Vector2} from "./Vector2.js";
import {Vector3} from "./Vector3.js";

export function Mesh(geometry) {
	this.geometry = geometry;
	this.position = new Vector3();
	this.rotation = new Vector3();
	this.scale = this.geometry.type === "plane" ? new Vector2(1) : new Vector3(1);
};

Mesh.prototype.clone = function() {
	const mesh = new Mesh(this.geometry);

	mesh.position = this.position.clone();
	mesh.rotation = this.rotation.clone();
	mesh.scale = this.scale.clone();

	return mesh;
};