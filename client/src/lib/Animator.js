/* eslint-disable require-jsdoc */
import {Animation} from './animation';
import {AnimationInstanceError} from './utils/customErrors.js';
export class Animator {
  constructor(animation, multiplier) {
    if (!(animation instanceof Animation)) {
      throw new AnimationInstanceError('animation');
    }
    this._animation = animation;
    this._timer = 0;
    this._lastFrame = 0;
    this._currentFrame = 0;
    this.multiplier = multiplier ?? 1;
  }
  setAnimation(animation) {
    if (!(animation instanceof Animation)) {
      throw new AnimationInstanceError('animation');
    }
    if (animation === this._animation) {
      return;
    }

    this._animation = animation;
    this._timer = 0;
  }
  getNextAnimationFrame(timestamp) {
    this._currentFrame = timestamp;
    const deltaTime = this._currentFrame - this._lastFrame;

    this._timer += deltaTime;
    this._lastFrame = this._currentFrame;

    if (this._timer >= this._animation.animationDurationMS) {
      this._timer = 0;
      const midAnimation = Math.floor(this._animation.frames.length / 2);
      return this._animation.frames[midAnimation].frameNumber;
    }

    for (const frame of this._animation.frames) {
      if (this._timer < frame.displayTime * this.multiplier) {
        return frame.frameNumber;
      }
    }
  }
}
