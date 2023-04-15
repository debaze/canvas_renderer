import {BACKFACE_CULLING, DRAW_MODE, WIREFRAME_COLOR} from "../config.js";
import * as Utils from "../utils.js";

const
	position = document.querySelector("#debug .position"),
	rotation = document.querySelector("#debug .rotation");

export function Renderer(width, height) {
	this.canvas = document.createElement("canvas");
	this.canvas.textContent = "This browser does not support Canvas API.";
	this.canvas.style.display = "block";
	this.canvas.requestPointerLock ||= this.canvas.mozRequestPointerLock;

	this.ctx = this.canvas.getContext("2d");

	// Set canvas size
	this.stretch(width, height);

	document.body.appendChild(this.canvas);
};

Renderer.prototype.lock = function() {
	this.canvas.requestPointerLock();
};

Renderer.prototype.isLocked = function() {
	return this.canvas === document.pointerLockElement || this.canvas === document.mozPointerLockElement;
};

Renderer.prototype.stretch = function(width = innerWidth, height = innerHeight) {
	this.width = this.canvas.width = width;
	this.height = this.canvas.height = height;
	this.halfWidth = this.width / 2;
	this.halfHeight = this.height / 2;

	// Reset context stroke color
	this.ctx.strokeStyle = WIREFRAME_COLOR;
};

Renderer.prototype.render = function(scene, camera) {
	this.ctx.fillStyle = scene.background;
	this.ctx.fillRect(0, 0, this.width, this.height);

	for (const mesh of scene.meshes) {
		let geometry = mesh.geometry,
			vertices = [...geometry.vertices];

		// Transform the vertices, project them and adapt them to the viewport
		for (const v in vertices) {
			vertices[v] = Utils.viewport(Utils.project(Utils.transform(vertices[v], mesh, camera), camera.fov), this);
		}

		// Loop through the mesh indices and draw the associated transformed polygon
		for (const i of geometry.indices) {
			let polygon = [vertices[i[0]], vertices[i[1]], vertices[i[2]]],
				bfc = BACKFACE_CULLING ? Utils.bfc(...polygon) : true;

			if (!bfc) continue;

			this.ctx.beginPath();
			this.ctx.moveTo(...polygon[0]);
			this.ctx.lineTo(...polygon[1]);
			this.ctx.lineTo(...polygon[2]);
			if (DRAW_MODE === "lines") this.ctx.closePath();
			this.ctx.stroke();
		}
	}

	position.textContent = camera.position;
	rotation.textContent = camera.rotation;
};