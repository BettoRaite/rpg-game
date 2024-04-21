import Vector2 from '../src/lib/Vector2.js';
import {IntegerError} from '../src/lib/utils/Errors.js';
import {EXPECTED_TYPES} from '../src/lib/constants.js';

describe('Vector2', () => {
  describe('constructor', () => {
    it(`should throw IntegerError if any of the two passed values not an integer`, () => {
      const errorMessageX = `Parameter: "x"\nWas expected to be of type: ${EXPECTED_TYPES.integer}\n`;
      const errorMessageY = `Parameter: "y"\nWas expected to be of type: ${EXPECTED_TYPES.integer}\n`;

      expect(() => new Vector2('not an object.')).toThrow(IntegerError);
      expect(() => new Vector2('0')).toThrow(IntegerError);
      expect(() => new Vector2(null)).toThrow(IntegerError);
      expect(() => new Vector2(0, 'asd')).toThrow(IntegerError);
      expect(() => new Vector2(0, '1000')).toThrow(IntegerError);
      expect(() => new Vector2(0, null)).toThrow(IntegerError);

      // Check error message content
      expect(() => new Vector2('not an object.')).toThrow(errorMessageX);
      expect(() => new Vector2(0, 'asd')).toThrow(errorMessageY);
    });

    it(`should construct Vector2 instance with valid [x, y] inputs`, () => {
      const point = new Vector2(-1, 0);
      expect(point).toBeInstanceOf(Vector2);
    });
  });

  describe('cloneTo', () => {
    it(`should clone [x, y] values of point1 to point2 if point2 is Vector2 instance`, () => {
      const point1 = new Vector2(0, 0);
      const point2 = new Vector2(10, 10);
      point1.cloneTo(point2);
      expect(`${point2.x}${point2.y}`).toEqual(`${point1.x}${point1.y}`);
    });

    it(`should throw TypeError if passed in value is not a Vector2 instance`, () => {
      const errorMessage = 'Expected position to be an instance of class Vector2';
      const point1 = new Vector2(0, 0);

      expect(() => point1.cloneTo([])).toThrow(TypeError);
      expect(() => point1.cloneTo([])).toThrow(errorMessage);
    });
  });
});
