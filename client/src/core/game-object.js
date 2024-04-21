/* eslint-disable require-jsdoc */
import Vector2 from './vector2.js';
import {Vector2InstanceError} from './utils/errors.js';

class GameObject {
  #children = [];
  #position;
  constructor({position} = {}) {
    this.#position = position instanceof Vector2 ? position : new Vector2(0, 0);
  }
  get position() {
    return this.#position;
  }
  set position(position) {
    if (!(position instanceof Vector2)) {
      throw new Vector2InstanceError('position', position);
    }
    this.#position = position;
  }
  draw(ctx, x, y) {
    const xPos = this.position.x + x;
    const yPos = this.position.y + y;
    this.drawImage(ctx, xPos, yPos);
    this.#children.forEach((child) => child.draw(ctx, xPos, yPos));
  }
  stepEntry(deltaTime, root) {
    this.#children.forEach((child) => child.stepEntry(deltaTime, root));
    this.step(deltaTime, root);
  }
  step(deltaTime, root) {
    return;
  }
  drawImage(ctx, xPos, yPos) {
    return;
  }
  hasChild(gameObject) {
    return this.#children.includes(gameObject);
  }
  addChild(gameObject) {
    if (!(gameObject instanceof GameObject)) {
      throw new SyntaxError('Expected an instance of GameObject');
    }
    this.#children.push(gameObject);
  }
  removeChild(gameObject) {
    this.#children.filter((child)=>{
      return child !== gameObject;
    });
  }
}

export default GameObject;
