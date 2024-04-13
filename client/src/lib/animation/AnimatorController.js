/* eslint-disable require-jsdoc */
import {
  AnimationInstanceError,
  InvalidNumberError,
} from '../utils/customErrors.js';
import {Animation} from './Animation.js';

export class AnimationController {
  #animation;
  #timer = 0;
  constructor(animation) {
    if (!(animation instanceof Animation)) {
      throw new AnimationInstanceError;
    }
    this.#animation = animation;
  }
  get frame() {
    for (const frame of this.#animation.frames) {
      if (this.#timer <= frame.displayTime) {
        return frame.frameIndex;
      }
    }
  }
  step(deltaTime) {
    if (!Number.isFinite(deltaTime)) {
      throw new InvalidNumberError('deltaTime', deltaTime);
    }
    this.#timer += deltaTime;
    if (this.#timer >= this.#animation.animationDurationMs) {
      this.#timer = 0;
    }
  }
}

