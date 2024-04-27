import {
	pickUpItem,
	standAnimation,
	walkDownAnimation,
	walkLeftAnimation,
	walkRightAnimation,
	walkTopAnimation,
} from "../animation/animation.js";
import AnimationsManager from "../animation/animations-manager.js";
import AnimationsMap from "../animation/animations-map.js";
import Sprite from "../components/sprite.js";
import { gridCells } from "../helpers/grid.js";
import { imageResources } from "../image-resources.js";
import { shadow } from "../level-objects.js";
import Vector2 from "../vector2.js";
import Player from "./player/player.js";

const playerAnimationsMap = new AnimationsMap({
	walkDown: walkDownAnimation,
	walkTop: walkTopAnimation,
	walkLeft: walkLeftAnimation,
	walkRight: walkRightAnimation,
	stand: standAnimation,
	pickUp: pickUpItem,
});

export const player = new Player(
	new Vector2(gridCells(7.5), gridCells(3)),
	shadow,
	new Sprite({
		imageResource: imageResources.resources.player,
		frameSize: new Vector2(32, 32),
		hFrames: 3,
		vFrames: 8,
		frame: 1,
		animationsManager: new AnimationsManager(playerAnimationsMap),
	}),
);
