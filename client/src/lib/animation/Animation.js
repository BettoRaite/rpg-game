/* eslint-disable require-jsdoc */
import {frameSequenceFromPattern} from '../helpers/frame.js';
import {
  ArrayInstanceError,
  IntegerError,
  NumberTypeError,
} from '../utils/customErrors.js';

// [+]: Check if frameNumbers is an array
// [+]: Check if first frame duration is an integer.
// [+]: Check if each element of the frameNumbers array is a number.

export class Animation {
  #animationDurationMs = 0;
  #frames = [];

  constructor(frameIndices, ...frameDurationsMs) {
    if (!Array.isArray(frameIndices)) {
      throw new ArrayInstanceError('frameIndices', frameIndices);
    }
    const defaultDurationMs = frameDurationsMs[0];
    if (!Number.isInteger(defaultDurationMs)) {
      throw new IntegerError('first frame duration', defaultDurationMs);
    }

    this.#frames = frameIndices.map((frameIndex, index) => {
      let frameTime = frameDurationsMs[index];
      if (!Number.isInteger(frameTime)) {
        frameTime = Math.abs(defaultDurationMs);
      }
      if (!Number.isFinite(frameIndex)) {
        throw new NumberTypeError(
            `frame with index: ${index}`, frameIndex);
      }
      const displayTime = this.#animationDurationMs + Math.abs(frameTime);
      this.#animationDurationMs += Math.abs(frameTime);

      return {
        displayTime,
        frameIndex: Math.abs(frameIndex),
      };
    });
  }

  get animationDurationMs() {
    // Returns the total duration of the animation in milliseconds.
    return this.#animationDurationMs;
  }

  get frames() {
    // Returns an array of frames with their display times.
    return this.#frames;
  }
}
const animationDurationMs = 130;
export const walkDownAnimation = new Animation(
    frameSequenceFromPattern(0),
    animationDurationMs,
);
export const walkTopAnimation = new Animation(
    frameSequenceFromPattern(6),
    animationDurationMs,
);
export const walkRightAnimation = new Animation(
    frameSequenceFromPattern(3),
    animationDurationMs,
);
export const walkLeftAnimation = new Animation(
    frameSequenceFromPattern(9),
    animationDurationMs,
);
export const standAnimation = new Animation(
    [1, 12],
    10000, 1000,
);
