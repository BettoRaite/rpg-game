import {
	AnimationInstanceError,
	ObjectInstanceError,
} from "../utils/errors.js";
import { isObject } from "../utils/type-checking.js";
import { AnimationController } from "./animation-controller.js";
import {
	Animation,
	pickUpItem,
	standAnimation,
	walkDownAnimation,
	walkLeftAnimation,
	walkRightAnimation,
	walkTopAnimation,
} from "./animation.js";

/**
 * Represents a mapping between a key and
 * an instance of Animation class wrapped in an
 * instance of AnimationController class.
 */
class AnimationsMap {
	#animationKeys = [];
	/**
	 * Creates a new instance of AnimationsMap class
	 * @param {Object} animationsMapping - An object representing a mapping
	 * between a unique key instance of Animation class.
	 * @throws {ObjectInstanceError} - If `animationMapping` is not an object.
	 */
	constructor(animationsMapping) {
		if (!isObject(animationsMapping)) {
			throw new ObjectInstanceError("animationsMapping", animationsMapping);
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
export default AnimationsMap;
