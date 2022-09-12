import {BoxGeometry} from "./class/BoxGeometry.js";
import {PlaneGeometry} from "./class/PlaneGeometry.js";
import {Mesh} from "./class/Mesh.js";
import {scene} from "./main.js";

export default () => {
	base = new Mesh(new PlaneGeometry(10, 6));
	base.position.set(0, -1, 5);

	mesh = new Mesh(new BoxGeometry(2, 2, 2));
	mesh.position.set(2.5, 0, 6);
	mesh.rotation.y = Math.PI / 5;

	rotatedCube = mesh.clone();
	rotatedCube.scale.set(.5, .5, .5);

	mesh2 = new Mesh(new BoxGeometry(.7, 3, .7));
	mesh2.position.set(-2, .5, 3.5);
	mesh2.rotation.y = Math.PI / 3;

	mesh3 = new Mesh(new BoxGeometry(.4, 2.5, .4));
	mesh3.position.set(-2.66, .25, 3.1);
	mesh3.rotation.y = Math.PI / 4;
	mesh3.rotation.z = Math.PI / 19;

	mesh4 = new Mesh(new BoxGeometry(3, .4, 1.2));
	mesh4.position.set(-1.5, -.8, 6);
	mesh4.rotation.y = -Math.PI / 7;

	scene.background = "#151515";
	scene.add(base, mesh, rotatedCube, mesh2, mesh3, mesh4);
};
export let base, mesh, rotatedCube, mesh2, mesh3, mesh4;