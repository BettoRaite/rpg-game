// Main
import {GameLoop} from './core/game-loop.js';
import Input from './core/input.js';
import Vector2 from './core/vector2.js';
import Sprite from './core/components/sprite.js';
import ImageResourceManager from './core/image-resource-manager.js';
import GameObject from './core/game-object.js';
// Player
import Player from './core/entities/Player/player.js';
import {playerAnimationsMap} from './core/animation/animations-map.js';
import {AnimationsManager} from './core/animation/animations-manager.js';
// Helpers
import {gridCells} from './core/helpers/grid.js';


const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const input = new Input();


const imageResourceManager = new ImageResourceManager({
  ground: 'assets/ground.png',
  sky: 'assets/sky.png',
  shadow: 'assets/shadow.png',
  player: 'assets/hero-sheet.png',
  swords: 'assets/items.png',
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
const sword = new Sprite({
  imageResource: imageResourceManager.resources.swords,
  frame: 1,
  frameSize: new Vector2(32, 32),
}, new Vector2(18, 14));
const mainScene = new GameObject();


const player = new Player(
    new Vector2(gridCells(2.5), gridCells(5)),
    new Sprite({
      imageResource: imageResourceManager.resources.player,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      animationsManager: new AnimationsManager(playerAnimationsMap),
    }),
);
player.addChild(shadow);
mainScene.addChild(sky);
mainScene.addChild(ground);
mainScene.addChild(player);

mainScene.input = input;


// let destPos = player.position.duplicate();
const update = (deltaTime) => {
  mainScene.stepEntry(deltaTime, mainScene);
};

const draw = () => {
  mainScene.draw(ctx, 0, 0);

  // shadow.drawImage(ctx, player.position.x, player.position.y);
  // player.drawImage(ctx, player.position.x, player.position.y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
