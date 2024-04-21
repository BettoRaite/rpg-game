import {expect} from 'chai';
import {Animation} from '../src/lib/animation/animation.js';
import {
  ArrayInstanceError,
  PositiveIntegerError,
} from '../src/lib/utils/errors.js';
import {EXPECTED_TYPES} from '../src/lib/constants.js';

describe('Animation', () => {
  describe('constructor', () => {
    it(`should throw ArrayInstanceError 
    if frameIndices is not an array`, () => {
      const errorMessage = (paramName) => `\n` +
        `Parameter: "${paramName}"\n` +
        `Was expected to be of type: ${EXPECTED_TYPES.array}\n`;

      expect(() => new Animation('not an array'))
          .to.throw(ArrayInstanceError, errorMessage('frameIndices'));

      expect(() => new Animation(undefined))
          .to.throw(ArrayInstanceError, errorMessage('frameIndices'));

      expect(() => new Animation({}))
          .to.throw(ArrayInstanceError, errorMessage('frameIndices'));
    });

    it(`should throw TypeError 
    if first frame duration is not a positive integer more than 0`, () => {
      const errorMessage = `First frame duration 
      must be a positive integer more than 0.`;

      expect(() => new Animation([1, 9], 0))
          .to.throw(TypeError, errorMessage);
      expect(() => new Animation([1, 9], -1))
          .to.throw(TypeError, errorMessage);
      expect(() => new Animation([1, 9], null))
          .to.throw(TypeError, errorMessage);
      expect(() => new Animation([1, 9], '123'))
          .to.throw(TypeError, errorMessage);
      expect(() => new Animation([1, 9], Infinity))
          .to.throw(TypeError, errorMessage);
      expect(() => new Animation([1, 9], undefined))
          .to.throw(TypeError, errorMessage);
    });

    it(`should throw PositiveIntegerError
    if any element of frameIndices array not a positive integer`, () => {
      const errorMessage = (paramName) => `\n` +
        `Parameter: "${paramName}"\n` +
        `Was expected to be of type: ${EXPECTED_TYPES.positiveInteger}\n`;

      expect(() => new Animation([100, -1], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 1',
              ));
      expect(() => new Animation([100, 4, 5, 6, 7, -5], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 5',
              ));

      expect(() => new Animation([100, null], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 1',
              ));
      expect(() => new Animation([100, 400, 500, '500'], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 3',
              ));
      expect(() => new Animation([0.4], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 0',
              ));
      expect(() => new Animation([1, 0.4], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 1',
              ));
      expect(() => new Animation([1, 0, 1, 2.1], 100))
          .to.throw(
              PositiveIntegerError,
              errorMessage('frame with index: 3',
              ));
    });
  });
});
