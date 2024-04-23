import { AnimationInstanceError } from "../utils/errors.js";
import { Animation } from "./animation.js";
/**
 * Controls the playback of an animation.
 */
export class AnimationController {
	#animation;
	#timer = 0;
	/**
	 * Creates a new AnimationController instance.
	 * @param {Animation} animation - An instance of the Animation
	 * class to control.
	 * @throws {AnimationInstanceError} If the provided animation is
	 * not an instance of the Animation class.
	 */
	constructor(animation) {
		if (!(animation instanceof Animation)) {
			throw new AnimationInstanceError("animation");
		}
		this.#animation = animation;
	}

	/**
	 * Retrieves the current frame index of the
	 * animation based on the internal clock.
	 * @return {Number} - The current frame index.
	 */
	get frame() {
		for (const frame of this.#animation.frames) {
			if (this.#timer <= frame.frameTimeEnd) {
				return frame.frameIndex;
			}
		}
		return this.#animation.frames.at(-1);
	}
	/**
	 * Updates the internal clock or resets it if it exceeds
	 * or equals to the total animation duration.
	 * @param {Number} deltaTime - The time elapsed between
	 * the last frame and the current frame.
	 * @throws {TypeError} - If the provided deltaTime
	 * is not a positive number.
	 */
	step(deltaTime) {
		if (!Number.isFinite(deltaTime) || deltaTime < 0) {
			throw new TypeError("deltaTime must be a positive number.");
		}
		this.#timer += deltaTime;
		if (this.#timer >= this.#animation.animationDurationMs) {
			this.#timer = 0;
		}
	}
}
