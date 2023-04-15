import {renderer, lookAround, keys, pressKeys, releaseKeys} from "./main.js";

addEventListener("resize", () => renderer.stretch());

addEventListener("click", function({target}) {
	if (target === renderer.canvas) renderer.lock();
});

document.addEventListener("pointerlockchange", function() {
	if (renderer.isLocked()) {
		addEventListener("keydown", pressKeys);
		addEventListener("keyup", releaseKeys);
		addEventListener("mousemove", lookAround);
	} else {
		removeEventListener("keydown", pressKeys);
		removeEventListener("keyup", releaseKeys);
		removeEventListener("mousemove", lookAround);
		keys.clear();
	}
});