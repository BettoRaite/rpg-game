import {IntegerError} from './utils/errors';
// FIXME: NO INPUT CHECKING FOR X,Y ASSIGMENT
/**
 * Class representing a single point.
 * @class
 */
class Vector2 {
  /**
   * Creates a point with the given [x, y] - axis.
   * @param {Number} x - Point x-axis.
   * @param {Number} y - Point y-axis.
   * @throws {IntegerError} - If either `x` or `y` not an integer.
   */
  constructor(x = 0, y =0) {
    if (!Number.isInteger(x)) {
      throw new IntegerError('x', x);
    } else if (!Number.isInteger(y)) {
      throw new IntegerError('y', y);
    }
    this.x = x;
    this.y = y;
  }
  /**
   * Clones point [x, y]-axis to another point [x, y]-axis.
   * @param {Vector2} position - Point to which clone current point [x, y]-axis.
   * @throws {TypeError} - If `position` is not an instance of class Vector2.
   * @example
   * const point1 = new Vector2(20, 20);
   * const point2 = new Vector2(30, 30);
   * point1.cloneTo(point2);
   * console.log(point2.x, point2.y); // 20, 20
   */
  cloneTo(position) {
    if (!(position instanceof Vector2)) {
      throw new TypeError(
          'Expected position to be an instance of class Vector2');
    }
    position.x = this.x;
    position.y = this.y;
  }
  /**
   * Duplicate the current Vector2.
   * @return {Vector2} - Returns a new, duplicate instance
   * of the current Vector2.
  */
  duplicate() {
    return new Vector2(this.x, this.y);
  }
}

export default Vector2;
