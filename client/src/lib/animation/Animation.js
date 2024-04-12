/* eslint-disable require-jsdoc */
import {frameSequenceFromPattern} from '../helpers/frame.js';
import {ArrayInstanceError, IntegerError} from '../utils/customErrors.js';
// [x]: Check if frameNumbers is an array
// [-]: Check if each element of the frameNumbers array is a number.
// [-]: Check if first number in frameDurations is a number.

export class Animation {
  #animationDurationMs = 0;
  constructor(frameNumbers, ...frameDurationsMs) {
    if (!Array.isArray(frameNumbers)) {
      throw new ArrayInstanceError('frameNumbers', frameNumbers);
    }
    const defaultFrameDurationMs = frameDurationsMs[0];
    if (!Number.isFinite(defaultFrameDurationMs) ||
    !Number.isInteger(defaultFrameDurationMs)) {
      throw new IntegerError('first frame duration', defaultFrameDurationMs);
    }
    this.#animationDurationMs = 0;
    this.frames = frameNumbers.map((frameNumber, index)=>{
      // const displayTime = frameDurationsMs[index];
      let frameTime = frameDurationsMs[index];
      if (!Number.isInteger(frameTime)) {
        frameTime = defaultFrameDurationMs;
      }
      const displayTime = this.#animationDurationMs + frameTime;
      this.#animationDurationMs += frameTime;

      return {
        displayTime,
        frameNumber,
      };
    });
    console.log(this.#animationDurationMs);
  }
  get animationDurationMs() {
    return this.#animationDurationMs;
  }
}

export const walkDownAnimation = new Animation(
    frameSequenceFromPattern(0),
    100,
);
export const walkTopAnimation = new Animation(
    frameSequenceFromPattern(6),
    100,
);
export const walkRightAnimation = new Animation(
    frameSequenceFromPattern(3),
    100,
);
export const walkLeftAnimation = new Animation(
    frameSequenceFromPattern(9),
    100,
);
export const standAnimation = new Animation(
    [1, 12],
    10000, 1000,
);
