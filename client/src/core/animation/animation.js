/* eslint-disable require-jsdoc */
import { frameIndicesFromPattern } from "../helpers/frame-indices-pattern.js";
import { ArrayInstanceError, PositiveIntegerError } from "../utils/errors.js";

/*
Represents an animation that contains total animation duration in
milliseconds along with frames. Frames have certain index and
time in milliseconds at which they end.
*/
export class Animation {
	#animationDurationMs = 0;
	#frames = [];
	/**
	 * Creates a new Animation instance.
	 *
	 * @param {Number[]} frameIndices - An array of frame indexes.
	 * @param  {...Number} frameDurationsMs - An array of frame durations. Can be
	 * just a positive integer that's more than 0, that is `frameDurationsMs[0]`.
	 * If no explicit duration is speficied for current frame or the frame
	 * duration is not a positive integer more than 0, then the default one
	 * will be used `frameDurationsMs[0]`.
	 * @throws {ArrayInstanceError} - If `frameIndices` is not an array.
	 * @throws {TypeError} - If `frameDurationsMs[0]` is not
	 * a positive integer more than 0.
	 * @throws {PositiveIntegerError} - If any element of `frameIndices`
	 * is not a positive integer.
	 */
	constructor(frameIndices, ...frameDurationsMs) {
		if (!Array.isArray(frameIndices)) {
			throw new ArrayInstanceError("frameIndices", frameIndices);
		}
		const defaultDurationMs = frameDurationsMs[0];

		if (!Number.isInteger(defaultDurationMs) || defaultDurationMs <= 0) {
			throw new TypeError(`First frame duration 
      must be a positive integer more than 0.`);
		}

		this.#frames = frameIndices.map((frameIndex, index) => {
			if (!Number.isInteger(frameIndex) || frameIndex < 0) {
				throw new PositiveIntegerError(
					`frame with index: ${index}`,
					frameIndex,
				);
			}
			const frameDurationMs = frameDurationsMs[index];

			if (Number.isInteger(frameDurationMs) && frameDurationMs > 0) {
				this.#animationDurationMs += frameDurationMs;
			} else {
				this.#animationDurationMs += defaultDurationMs;
			}
			return {
				frameTimeEnd: this.#animationDurationMs,
				frameIndex: Math.abs(frameIndex),
			};
		});
	}
	/**
	 *@return {Number} - Total animation duration in milliseconds.
	 */
	get animationDurationMs() {
		// Returns the total duration of the animation in milliseconds.
		return this.#animationDurationMs;
	}
	/**
   *@return {Array} - An array of frame objects, where each of them
    has frame display end time along with frame index.
   */
	get frames() {
		// Returns an array of frames with their display times.
		return this.#frames;
	}
}

const animationDurationMs = 130;
export const walkDownAnimation = new Animation(
	frameIndicesFromPattern(0),
	animationDurationMs,
);
export const walkTopAnimation = new Animation(
	frameIndicesFromPattern(6),
	animationDurationMs,
);
export const walkRightAnimation = new Animation(
	frameIndicesFromPattern(3),
	animationDurationMs,
);
export const walkLeftAnimation = new Animation(
	frameIndicesFromPattern(9),
	animationDurationMs,
);
export const standAnimation = new Animation([1, 12], 10000, 1000);
