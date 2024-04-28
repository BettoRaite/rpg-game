import Sprite from "./components/sprite.js";
import Pickable from "./entities/pickable.js";
import { gridCells } from "./helpers/grid.js";
import { imageResources } from "./image-resources.js";
import Vector2 from "./vector2.js";

export const ground = new Sprite({
	imageResource: imageResources.resources.ground,
	frameSize: new Vector2(320, 180),
});

export const sky = new Sprite({
	imageResource: imageResources.resources.sky,
	frameSize: new Vector2(320, 180),
});

export const pickaxe = new Pickable(
	new Vector2(gridCells(3), gridCells(6)),
	new Sprite({
		imageResource: imageResources.resources.weapons,
		frameSize: new Vector2(16, 16),
		position: new Vector2(gridCells(0.5), gridCells(1)),
		hFrames: 11,
		vFrames: 4,
		frame: 28,
		scale: 0.5,
	}),
);

export const sword = new Pickable(
	new Vector2(gridCells(4), gridCells(5)),
	new Sprite({
		imageResource: imageResources.resources.weapons,
		frameSize: new Vector2(16, 16),
		position: new Vector2(gridCells(0.6), gridCells(1)),
		hFrames: 11,
		vFrames: 4,
		frame: 22,
		scale: 0.7,
	}),
);

export const shadow = new Sprite({
	imageResource: imageResources.resources.shadow,
	frameSize: new Vector2(32, 32),
});
