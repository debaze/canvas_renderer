import {VELOCITY, SENSITIVITY} from "./config.js";
import {Renderer} from "./class/Renderer.js";
import {Scene} from "./class/Scene.js";
import {Camera} from "./class/Camera.js";
import "./events.js";
import init from "./init.js";
import loop from "./loop.js";

/**
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Fly up
 * [LeftCtrl]	Fly down
 * 
 * @see {@link https://github.com/matteokeole/jsrenderer}
 * @see {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory}
 * @see {@link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {@link https://www.sitepoint.com/building-3d-engine-javascript}
 * @see {@link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 * @see {@link https://stackoverflow.com/questions/4097688/draw-distorted-image-on-html5s-canvas}
 */
export const
	lookAround = e => {
		let x = -e.movementY * SENSITIVITY / 1000, // Rotation along the X axis
			y = e.movementX * SENSITIVITY / 1000; // Rotation along the Y axis

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && camera.rotation.x < -Math.PI / 2 || // To the top
			x > 0 && camera.rotation.x > Math.PI / 2 // To the bottom
		) x = 0;

		// Prevent unlimited rotation along the Y axis
		if (Math.abs(camera.rotationy) > Math.PI * 2) camera.rotation.y = 0;

		camera.rotation.x += x;
		camera.rotation.y += y;
		camera.rotation.z = e.movementX * Math.PI / 500;
	},
	keys		= new Set(),
	pressKeys	= e => keys.add(e.code),
	releaseKeys	= e => keys.delete(e.code),
	renderer	= new Renderer(),
	scene		= new Scene(),
	camera		= new Camera(600);

init();
loop();