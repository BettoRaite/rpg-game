import { NumberTypeError, Vector2InstanceError } from "./utils/errors.js";
// [+]: Finish JSDOC for method 'substract', 'isEqual'.
/**
 * Represents a 2D vector or point in a Cartesian coordinate system.
 */
class Vector2 {
	#x;
	#y;

	/**
	 * Creates an instance of Vector2.
	 * @param {number} x - The x-coordinate. Defaults to 0 if not specified.
	 * @param {number} y - The y-coordinate. Defaults to 0 if not specified.
	 * @throws {TypeError} - Throws if either `x` or `y` is not a finite number.
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Getter for the x-coordinate of this vector.
	 * @returns {number} The x-coordinate.
	 */
	get x() {
		return this.#x;
	}

	/**
	 * Setter for the x-coordinate of this vector.
	 * @param {number} x - The new x-coordinate.
	 * @throws {NumberTypeError} - Throws if `x` is not a finite number.
	 */
	set x(x) {
		if (!Number.isFinite(x)) {
			throw new NumberTypeError("x", x);
		}
		this.#x = x;
	}

	/**
	 * Getter for the y-coordinate of this vector.
	 * @returns {number} The y-coordinate.
	 */
	get y() {
		return this.#y;
	}

	/**
	 * Sets the y-coordinate of this vector.
	 * @param {number} y - The new y-coordinate.
	 * @throws {NumberTypeError} - Throws if `y` is not a finite number.
	 */
	set y(y) {
		if (!Number.isFinite(y)) {
			throw new NumberTypeError("y", y);
		}
		this.#y = y;
	}

	/**
	 * Clones the current vector's coordinates to another Vector2 instance.
	 * @param {Vector2} point - The Vector2 instance to clone coordinates to.
	 * @throws {TypeError} - Throws if `point` is not an instance of Vector2.
	 * @example
	 * const point1 = new Vector2(20, 20);
	 * const point2 = new Vector2(30, 30);
	 * point1.cloneTo(point2);
	 * console.log(point2.x, point2.y); // 20, 20
	 */
	cloneTo(point) {
		if (!(point instanceof Vector2)) {
			throw new Vector2InstanceError("point", point);
		}
		point.x = this.x;
		point.y = this.y;
	}

	/**
	 * Creates a new instance of Vector2 with the same x and y values as this one.
	 * @returns {Vector2} A new instance of Vector2 with duplicated coordinates.
	 */
	duplicate() {
		return new Vector2(this.x, this.y);
	}

	/**
	 * Computes the difference between `this` vector and another vector,
	 * or relative to another vector.
	 * @param {Vector2} point - The vector from which to substract `this` vector.
	 * @returns {Vector2} - A new vector representing the difference.
	 * @throws {Vector2InstanceError} - Throws if `point` is not an instance of Vector2.
	 */
	substractFrom(point) {
		if (!(point instanceof Vector2)) {
			throw new Vector2InstanceError("point", point);
		}
		const deltaX = point.x - this.x;
		const deltaY = point.y - this.y;
		return new Vector2(deltaX, deltaY);
	}

	/**
	 * Checks whether `this` vector is equal to another vector.
	 * @param {Vector2} point - The vector to compare with `this` one.
	 * @param {number} offset - The maximum, inclusive magnitude allowed for deltaX and deltaY .
	 * Defaults to 0.
	 * @returns {boolean} - True if the vectors are considered equal, false otherwise.
	 * @throws {TypeError} - Throws if `point` is not an instance of Vector2 or `TypeError` if `offset` is not a positive finite number.
	 */
	isEqualTo(point, offset = 0) {
		if (!(point instanceof Vector2)) {
			throw new Vector2InstanceError("point", point);
		}
		if (!Number.isFinite(offset) || offset < 0) {
			throw new TypeError(
				`offset was expected to be a positive, finite number, instead received ${offset}`,
			);
		}
		const deltaX = Math.abs(point.x - this.x);
		const deltaY = Math.abs(point.y - this.y);

		return deltaX <= offset && deltaY <= offset;
	}
}

export default Vector2;
