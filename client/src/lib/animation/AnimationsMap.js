import {
  Animation,
  walkTopAnimation,
  walkDownAnimation,
  walkRightAnimation,
  walkLeftAnimation,
  standAnimation,
} from './Animation.js';
import {AnimationController} from './AnimationController.js';
import {isObject} from '../utils/typeChecking.js';
import {
  ObjectInstanceError,
  AnimationInstanceError,
} from '../utils/Errors.js';

/**
 * Represents a mapping between a key and
 * an instance of Animation class wrapped in an
 * instance of AnimationController class.
 */
export default class AnimationsMap {
  #animationKeys = [];
  /**
   * Creates a new instance of AnimationsMap class
   * @param {Object} animationsMapping - An object representing a mapping
   * between a unique key instance of Animation class.
   * @throws {ObjectInstanceError} - If `animationMapping` is not an object.
   */
  constructor(animationsMapping) {
    if (!isObject(animationsMapping)) {
      throw new ObjectInstanceError('animationsMapping', animationsMapping);
    }
    for (const [key, animation] of Object.entries(animationsMapping)) {
      if (!(animation instanceof Animation)) {
        throw new AnimationInstanceError(`animation with key: ${key}`);
      }
      this[key] = new AnimationController(animation);
      this.#animationKeys.push(key);
    }
  }
  /**
   * Retrieves an array containing all animation keys.
   * @return {String[]} - An array containing all animation keys.
   */
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
