/* eslint-disable require-jsdoc */
import GameObject from '../../GameObject.js';
import {DIRECTION} from '../../constants.js';
import {moveTowards} from '../../helpers/moveTowards';
import {calcNewDestPos} from '../../helpers/destinationPosition';
import Sprite from '../../components/Sprite';

class Player extends GameObject {
  #spiteComponent;
  constructor(position, sprite) {
    super({position});
    if (!(sprite instanceof Sprite)) {
      throw new Error('This sucks!');
    }
    this.distance = 0;
    this.#spiteComponent = sprite;
    this.destPos = this.position.duplicate();
  }
  get spiteComponent() {
    return this.#spiteComponent;
  }
  step(deltaTime, root) {
    const {input} = root;
    const direction = root.input.direction();
    const distance = moveTowards(this.position, this.destPos, 1);
    if (direction !== DIRECTION.default && distance < 1) {
      this.destPos = calcNewDestPos(direction, this.position);
    }
    switch (direction) {
      case DIRECTION.top:
        this.#spiteComponent.play('walkTop');
        break;
      case DIRECTION.down:
        this.#spiteComponent.play('walkDown');
        break;
      case DIRECTION.right:
        this.#spiteComponent.play('walkRight');
        break;
      case DIRECTION.left:
        this.#spiteComponent.play('walkLeft');
        break;

      case DIRECTION.default:
        if (distance === 0) {
          this.#spiteComponent.play('stand');
        }
    }
    this.#spiteComponent.step(deltaTime);
  }

  drawImage(ctx) {
    this.#spiteComponent.drawImage(ctx, this.position.x, this.position.y);
  }
}
export default Player;
