/**
 * Creates a sequence of frames in the pattern of [`rootFrame`+1,
 * `rootFrame`, `rootFrame`+1, `rootFrame`+2].
 * @param {Number} rootFrame - The root frame of the sequence.
 * @return {Array} - A sequence of frames.
 */
export const frameSequenceFromPattern = (rootFrame) => {
  if (!Number.isFinite(rootFrame)) {
    const description =
    // eslint-disable-next-line max-len
    `rootFrame was expected to be a finite number instead got this: ${rootFrame}`;
    throw new TypeError(description);
  }
  if (!Number.isInteger(rootFrame)) {
    const description =
    `rootFrame was expected to be an integer instead got this: ${rootFrame}`;
    throw new TypeError(description);
  }
  return [rootFrame + 1, rootFrame, rootFrame + 1, rootFrame + 2];
};
