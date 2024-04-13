import {expect} from 'chai';
import {Animation} from '../src/lib/animation/Animation.js';
import {
  ArrayInstanceError,
  IntegerError,
  NumberTypeError,
} from '../src/lib/utils/customErrors.js';
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

    it(`should throw IntegerError 
    if first frame duration is not an integer`, () => {
      const errorMessage = (paramName) => `\n` +
        `Parameter: "${paramName}"\n` +
        `Was expected to be of type: ${EXPECTED_TYPES.integer}\n`;

      expect(() => new Animation([1, 9], null))
          .to.throw(IntegerError, errorMessage('first frame duration'));
      expect(() => new Animation([1, 9], '123'))
          .to.throw(IntegerError, errorMessage('first frame duration'));
      expect(() => new Animation([1, 9], Infinity))
          .to.throw(IntegerError, errorMessage('first frame duration'));
      expect(() => new Animation([1, 9], undefined))
          .to.throw(IntegerError, errorMessage('first frame duration'));
    });

    it(`should throw NumberTypeError
    if any of the elements in frameNumbers array not a number`, () => {
      const errorMessage = (paramName) => `\n` +
        `Parameter: "${paramName}"\n` +
        `Was expected to be of type: ${EXPECTED_TYPES.number}\n`;

      expect(() => new Animation([100, null], 100))
          .to.throw(
              NumberTypeError,
              errorMessage('frame with index: 1',
              ));
      expect(() => new Animation([100, 400, 500, '500'], 100))
          .to.throw(
              NumberTypeError,
              errorMessage('frame with index: 3',
              ));
      expect(() => new Animation(['did you think it was a number?'], 100))
          .to.throw(
              NumberTypeError,
              errorMessage('frame with index: 0',
              ));
    });
  });
});
