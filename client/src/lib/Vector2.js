import {throwTypeErrorFromTemplate} from './utils/customErrors.js';
import {DATA_TYPES} from './constants.js';
/**
 * Class representing a single point.
 * @class
 */
export default class Vector2 {
  /**
   * Creates a point with the given [x, y] - axis
   * @param {Number} x - Point x-axis
   * @param {Number} y - Point y-axis
   */
  constructor(x = 0, y =0) {
    if (!Number.isFinite(x)) {
      throwTypeErrorFromTemplate('x', DATA_TYPES.number, x);
    } else if (!Number.isFinite(y)) {
      throwTypeErrorFromTemplate('y', DATA_TYPES.number, y);
    }
    this.x = x;
    this.y = y;
  }
  /**
   * Clones point [x, y] to another point [x, y].
   * @param {Vector2} position - Point to which clone current point x, y.
   * @example
   * const point1 = new Vector2(20, 20);
   * const point2 = new Vector2(30, 30);
   * point1.clone(point2);
   * console.log(point2.x, point2.y); // 20, 20
   */
  cloneTo(position) {
    if (!(position instanceof Vector2)) {
      throwTypeErrorFromTemplate('position', 'Vector2', position);
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
