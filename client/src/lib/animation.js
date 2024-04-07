import {frameSequenceFromPattern} from './helpers/frame.js';
import {throwErrorOnNonNumber} from './utils/customErrors.js';
/**
 * Class representing an animation.
 * @class
 */
export class Animation {
  /**
   * Creates animation from given frames and their duration/durations.
   * @param {Array.<number>} frames - An ordered array of frame numbers,
   * in which to play the frames.
   * @param  {Number} frameDurationsMS - Either a default frame duration
   * in milliseconds for all `frames` or an array of frame durations
   * in which to play a corresponding frames.
   * @throws {TypeError} - Throws type error if `frames` is not an array
   * if first frame duration is not a number, except for undefined.
   * if any of the elements in `frames` not a number, or `frameDurationsMS`
   */
  constructor(frames, ...frameDurationsMS) {
    if (!Array.isArray(frames)) {
      const description =
      `frames was expected to be an array instead got this: ${frames}`;
      throw new TypeError(description);
    }
    const defaultFrameDurationMS = frameDurationsMS[0] ?? 100;

    throwErrorOnNonNumber('first frame duration', defaultFrameDurationMS);

    this.defaultFrameDurationMS = defaultFrameDurationMS;
    this._animationDurationMS = 0;

    this._frames = frames.map((frameNumber, index)=>{
      const frameDuration =
      frameDurationsMS[index] ?? this.defaultFrameDurationMS;

      throwErrorOnNonNumber(
          `frameDuration with index: ${index}`, frameDuration);
      throwErrorOnNonNumber(
          `frameNumber with index: ${index}`, frameNumber);

      this._animationDurationMS += frameDuration;

      const frame = {
        displayTime: this._animationDurationMS,
        frameNumber,
      };
      return frame;
    });
  }
  /**
   * @return {Number} - Duration of the animation in milliseconds.
   */
  get animationDurationMS() {
    return this._animationDurationMS;
  }
  /**
   * @return {Array} - An array of frame objects containing
   * frame number and the number of milliseconds
   * up to which to display the frame.
   */
  get frames() {
    return this._frames;
  }
}


const animationDurationMS = 150;

export const walkRightAnimation = new Animation(
    frameSequenceFromPattern(3),
    animationDurationMS,
);
export const walkLeftAnimation = new Animation(
    frameSequenceFromPattern(9),
    animationDurationMS,
);
export const walkDownAnimation = new Animation(
    frameSequenceFromPattern(0),
    animationDurationMS,
);
export const walkTopAnimation = new Animation(
    frameSequenceFromPattern(6),
    animationDurationMS,
);
export const idleAnimation = new Animation( [1, 18], ...[5000, 1000]);

