import {Vector3} from "./Vector3.js";

export function PlaneGeometry(width, height) {
	const
		w2 = width / 2,
		h2 = height / 2;

	this.type = "plane";
	this.width = width;
	this.height = height;
	this.vertices = [
		new Vector3(-w2, 0,  h2),
		new Vector3( w2, 0,  h2),
		new Vector3( w2, 0, -h2),
		new Vector3(-w2, 0, -h2),
	];
	this.indices = [
		[0, 1, 2],
		[2, 3, 0],
	];
};