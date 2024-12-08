import {SENSITIVITY} from "./config.js";
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
 * @see {@link https://github.com/debaze/jsrenderer}
 * @see {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory}
 * @see {@link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {@link https://www.sitepoint.com/building-3d-engine-javascript}
 * @see {@link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 * @see {@link https://stackoverflow.com/questions/4097688/draw-distorted-image-on-html5s-canvas}
 */
export const
	lookAround = function({movementX, movementY}) {
		let x = -movementY * SENSITIVITY / 1000, // Rotation along the X axis
			y = movementX * SENSITIVITY / 1000; // Rotation along the Y axis

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && camera.rotation.x < -Math.PI / 2 || // To the top
			x > 0 && camera.rotation.x > Math.PI / 2 // To the bottom
		) x = 0;

		camera.rotation.x += x;
		camera.rotation.y += y;
		camera.rotation.z = movementX * Math.PI / 1000;
	},
	keys		= new Set(),
	pressKeys	= ({code}) => keys.add(code),
	releaseKeys	= ({code}) => keys.delete(code),
	renderer	= new Renderer(),
	scene		= new Scene(),
	camera		= new Camera(600);

init();
loop();
