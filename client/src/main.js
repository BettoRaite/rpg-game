
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


const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const input = new Input();


let destPos = player.position.duplicate();

const update = (deltaTime) => {
  const dir = input.direction();
  const distance = moveTowards(player.position, destPos, 1);
  if (distance < 1 && dir != DIRECTION.default) {
    destPos = calcNewDestPos(dir, player.position);
  }
  switch (dir) {
    case DIRECTION.top:
      player.animator.play('walkTop');
      break;
    case DIRECTION.down:
      player.animator.play('walkDown');
      break;
    case DIRECTION.right:
      player.animator.play('walkRight');
      break;
    case DIRECTION.left:
      player.animator.play('walkLeft');
      break;
    case DIRECTION.default:
      player.animator.play('stand');
  }
  player.step(deltaTime);
};

const draw = () => {
  sky.drawImage(ctx, 0, 0);
  shadow.drawImage(ctx, player.position.x, player.position.y);
  ground.drawImage(ctx, 0, 0);
  player.drawImage(ctx, player.position.x, player.position.y);
};
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
