/* eslint-disable require-jsdoc */
import AnimationsMap from './AnimationsMap.js';
import {AnimationsMapInstanceError} from '../utils/errors.js';
// [-]: Add JSdoc

export class AnimationsManager {
  #animations = {};
  #animationKeys = [];
  #activeKey = '';
  constructor(animationsMap) {
    if (!(animationsMap instanceof AnimationsMap)) {
      throw new AnimationsMapInstanceError('animationsMap', animationsMap);
    }
    this.#animations = animationsMap;
    this.#animationKeys = animationsMap.animationKeys;
    this.#activeKey = this.#animationKeys[0];
  }
  step(deltaTime) {
    this.#animations[this.#activeKey].step(deltaTime);
  }
  play(animationKey) {
    if (!this.#animationKeys.includes(animationKey)) {
      const avaliableKeys = this.#animationKeys.join(' | ');
      throw new SyntaxError(
          `Invalid animation key. Avaliable keys are: ${avaliableKeys}`);
    } else if (this.#activeKey === animationKey) {
      return;
    }
    this.#activeKey = animationKey;
  }
  get frame() {
    return this.#animations[this.#activeKey].frame;
  }
}
