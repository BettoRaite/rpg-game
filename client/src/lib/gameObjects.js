import {resources} from './Resource.js';
import Sprite from './Sprite.js';
import Vector2 from './Vector2.js';
import {gridCells} from './helpers/grid.js';
import {playerAnimationsMap} from './animation/AnimationsMap.js';
import {AnimationsManager} from './animation/AnimationsManager.js';

export const ground = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

export const sky = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

export const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

export const player = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(2.5), gridCells(5)),
  animationsManager: new AnimationsManager(playerAnimationsMap),
});
console.log(playerAnimationsMap);
