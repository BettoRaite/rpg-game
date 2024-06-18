import Sprite from "./core/components/sprite.js";
import { EVENT_KEYS } from "./core/events/events.js";
import { events } from "./core/events/events.js";
import { GameLoop } from "./core/game-loop.js";
import GameObject from "./core/game-object.js";
import { gridCells } from "./core/helpers/grid.js";
import { imageResources } from "./core/image-resources.js";
import Input from "./core/input.js";
import Inventory from "./core/objects/inventory/inventory.js";
import { ground, pickaxe, sky, sword } from "./core/objects/level-objects.js";
import { player } from "./core/objects/main-character.js";
import Pickable from "./core/objects/pickable.js";
import Vector2 from "./core/vector2.js";

console.log(import.meta.url);
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const input = new Input();
const mainScene = new GameObject();
const inventory = new Inventory(new Vector2(0, 0));

events.on(EVENT_KEYS.player_move, mainScene, (_, deltaPos) => {
	mainScene.position.x += -deltaPos.x;
	mainScene.position.y += -deltaPos.y;
});

mainScene.addChild(ground);
mainScene.addChild(player);
mainScene.addChild(pickaxe);
mainScene.addChild(sword);
mainScene.input = input;

const update = (deltaTime) => {
	mainScene.stepEntry(deltaTime, mainScene);
};

const draw = () => {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	sky.drawImage(ctx, 0, 0);
	inventory.draw(ctx, 4, 4);
	mainScene.draw(ctx, 0, 0);
};
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
