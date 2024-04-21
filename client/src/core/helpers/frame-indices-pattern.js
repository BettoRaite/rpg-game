import {PositiveIntegerError} from '../utils/errors.js';
/**
 * Creates a frame indices array in the pattern of [`rootFrameIndex`+1,
 * `rootFrameIndex`, `rootFrameIndex`+1, `rootFrameIndex`+2].
 * @param {Number} rootFrameIndex - The root frame index, that's
 * a positive integer.
 * @throws {PositiveIntegerError} - If `rootFrameIndex` is not a positive
 * integer.
 * @return {Array} - A sequence of frames.
 */
export const frameIndicesFromPattern = (rootFrameIndex) => {
  if (!Number.isInteger(rootFrameIndex) || rootFrameIndex < 0) {
    throw new PositiveIntegerError('rootFrameIndex', rootFrameIndex);
  }
  return [
    rootFrameIndex + 1,
    rootFrameIndex,
    rootFrameIndex + 1,
    rootFrameIndex + 2];
};
