import { AnimationsManager } from "./core/animation/animations-manager.js";
import { playerAnimationsMap } from "./core/animation/animations-map.js";
import Sprite from "./core/components/sprite.js";
import { EVENT_KEYS } from "./core/constants.js";
// Player
import Player from "./core/entities/Player/player.js";
import { events } from "./core/events/events.js";
// Main
import { GameLoop } from "./core/game-loop.js";
import GameObject from "./core/game-object.js";
// Helpers
import { gridCells } from "./core/helpers/grid.js";
import ImageResourceManager from "./core/image-resource-manager.js";
import Input from "./core/input.js";
import Vector2 from "./core/vector2.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const input = new Input();

const imageResourceManager = new ImageResourceManager({
	ground: "assets/ground.png",
	sky: "assets/sky.png",
	shadow: "assets/shadow.png",
	player: "assets/hero-sheet.png",
	weapons: "assets/items.png",
});

const ground = new Sprite({
	imageResource: imageResourceManager.resources.ground,
	frameSize: new Vector2(320, 180),
});

const sky = new Sprite({
	imageResource: imageResourceManager.resources.sky,
	frameSize: new Vector2(320, 180),
});

const shadow = new Sprite({
	imageResource: imageResourceManager.resources.shadow,
	frameSize: new Vector2(32, 32),
});

const weapons = new Sprite(
	{
		imageResource: imageResourceManager.resources.weapons,
		frameSize: new Vector2(16, 16),
		hFrames: 11,
		vFrames: 4,
		frame: 33,
		scale: 1,
	},
	new Vector2(17, 12),
);

const mainScene = new GameObject();

const player = new Player(
	new Vector2(gridCells(3.5), gridCells(3)),
	shadow,
	new Sprite({
		imageResource: imageResourceManager.resources.player,
		frameSize: new Vector2(32, 32),
		hFrames: 3,
		vFrames: 8,
		frame: 1,
		animationsManager: new AnimationsManager(playerAnimationsMap),
	}),
);
const diffX = player.position.x - 160;
console.log(diffX);

events.on(EVENT_KEYS.player_move, mainScene, (deltaPos) => {
	mainScene.position.x += -deltaPos.x;
	mainScene.position.y += -deltaPos.y;
});

mainScene.addChild(ground);
mainScene.addChild(player);

mainScene.input = input;

const update = (deltaTime) => {
	mainScene.stepEntry(deltaTime, mainScene);
};

const draw = () => {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	sky.drawImage(ctx, 0, 0);
	mainScene.draw(ctx, 0, 0);

	// shadow.drawImage(ctx, player.position.x, player.position.y);
	// player.drawImage(ctx, player.position.x, player.position.y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
