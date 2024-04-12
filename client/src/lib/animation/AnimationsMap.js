/* eslint-disable require-jsdoc */
import {
  Animation,
  walkTopAnimation,
  walkDownAnimation,
  walkRightAnimation,
  walkLeftAnimation,
  standAnimation,
} from './Animation.js';
import {AnimationController} from './AnimatorController.js';
import {isObject} from '../utils/typeChecking.js';
import {
  ObjectInstanceError,
  AnimationInstanceError,
} from '../utils/customErrors.js';

export default class AnimationsMap {
  #animationKeys = [];
  constructor(animationMapping) {
    if (!isObject(animationMapping)) {
      throw new ObjectInstanceError('animationMapping', animationMapping);
    }
    for (const [key, animation] of Object.entries(animationMapping)) {
      if (!(animation instanceof Animation)) {
        throw new AnimationInstanceError('animation');
      }
      this[key] = new AnimationController(animation);
      this.#animationKeys.push(key);
    }
  }
  get animationKeys() {
    return this.#animationKeys;
  }
}

export const playerAnimationsMap = new AnimationsMap({
  walkDown: walkDownAnimation,
  walkTop: walkTopAnimation,
  walkLeft: walkLeftAnimation,
  walkRight: walkRightAnimation,
  stand: standAnimation,
});
