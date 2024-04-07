
// Main
import {GameLoop} from './lib/GameLoop.js';
import Input from './lib/Input.js';
// Constants
import {DIRECTION} from './lib/constants.js';
// Helpers
import {moveTowards} from './lib/helpers/moveTowards.js';
import {calcNewDestPos} from './lib/helpers/movement.js';
// GameObjects
import {sky, player, ground, shadow} from './lib/gameObjects.js';
import {Animator} from './lib/Animator.js';
import {
  walkRightAnimation,
  walkLeftAnimation,
  walkDownAnimation,
  walkTopAnimation,
  idleAnimation,
} from './lib/animation.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const input = new Input();

const animator = new Animator(walkDownAnimation);


let destPos = player.position.duplicate();

const update = (timestamp) => {
  const dir = input.direction();
  const distance = moveTowards(player.position, destPos, 1);
  if (distance < 1 && dir != DIRECTION.default) {
    destPos = calcNewDestPos(dir, player.position);
  }
  let frame = 1;

  switch (dir) {
    case DIRECTION.right:
      animator.setAnimation(walkRightAnimation);
      break;
    case DIRECTION.left:
      animator.setAnimation(walkLeftAnimation);
      break;
    case DIRECTION.down:
      animator.setAnimation(walkDownAnimation);
      break;
    case DIRECTION.top:
      animator.setAnimation(walkTopAnimation);
      break;
    case DIRECTION.default:
      animator.setAnimation(idleAnimation);
  }

  frame = animator.getNextAnimationFrame(timestamp) ?? 1;
  player.frame = frame;
};

const draw = () => {
  sky.drawImage(ctx, 0, 0);
  shadow.drawImage(ctx, player.position.x, player.position.y);
  ground.drawImage(ctx, 0, 0);
  player.drawImage(ctx, player.position.x, player.position.y);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
