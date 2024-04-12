import {EXPECTED_TYPES} from '../constants.js';
import {getDataType} from './typeChecking.js';
/**
 * Represents a parent error for all other errors,
 * such as object instance error, invalid number error, and so on.
 */
class InvalidTypeError extends Error {
  /**
   * Creates a new InvalidTypeError instance.
   * @param {String} paramName - The name of the parameter
   * that was expected to be the `expectedType`.
   * @param {String} expectedType - The expected type of the parameter
   * (e.g., 'string', 'number').
   * @param {*} actualValue - The actual value that was not the `expectedType`.
   */
  constructor(paramName, expectedType, actualValue) {
    const typeOfActualValue = getDataType(actualValue);
    const message = `\n` +
    `Parameter: "${paramName}"\n` +
    `Was expected to be of type: ${expectedType}\n` +
    `Received instead: [${typeOfActualValue}]\n` +
    `With value: "${actualValue}"\n`;
    super(message);
    this.name = this.constructor.name;
  }
}
/**
 * Represents an error that occurs when a value was expected
 * to be an array, but turned out to be otherwise.
 */
export class ArrayInstanceError extends InvalidTypeError {
  /**
   * Creates a new ArrayInstanceError instance.
   * @param {String} paramName - The name of the parameter
   * that was expected to be an array.
   * @param {*} actualValue - The actual value that was not an array.
   */
  constructor(paramName, actualValue) {
    super(paramName, EXPECTED_TYPES.array, actualValue);
    this.name = this.constructor.name;
  }
}
/**
 * Represents an error that occurs when a value was expected
 * to be an instance of constructor Object, but turned out to be otherwise.
 */
export class ObjectInstanceError extends InvalidTypeError {
  /**
   * Creates a new ObjectInstanceError instance.
   * @param {String} paramName - The name of the parameter
   * that was expected to be an object.
   * @param {*} actualValue - The actual value that was not an object.
   */
  constructor(paramName, actualValue) {
    super(paramName, EXPECTED_TYPES.object, actualValue);
    this.name = this.constructor.name;
  }
}
/**
 * Represents an error that occurs when a value was expected
 * to be a number, but turned out to be otherwise.
 */
export class NumberTypeError extends InvalidTypeError {
  /**
   * Creates a new NumberTypeError instance.
   * @param {String} paramName - The name of the parameter
   * that was expected to be a number.
   * @param {*} actualValue - The actual value that was not a number.
   */
  constructor(paramName, actualValue) {
    super(paramName, EXPECTED_TYPES.number, actualValue);
    this.name = this.constructor.name;
  }
}
/**
 * Represents an error that occurs when a value was expected
 * to be an integer, but turned out to be otherwise.
 */
export class IntegerError extends InvalidTypeError {
  /**
   * Creates a new IntegerError instance.
   * @param {String} paramName - The name of the parameter
   * that was expected to be an integer.
   * @param {*} actualValue - The actual value that was not an integer.
   */
  constructor(paramName, actualValue) {
    super(paramName, 'Integer', actualValue);
    this.name = this.constructor.name;
  }
}


/**
 * Represents an error that happens when a parameter was expected
 * to be an instance of animation class, but turned out
 * to be otherwise.
 */
export class AnimationInstanceError extends Error {
  /**
   * Creates an instance of AnimationInstanceError.
   * @param {String} paramName - Name of the parameter that's
   * expected to be an intance of animation class.
   */
  constructor(paramName) {
    const message =
`Parameter "${paramName}" was expected to be an instance of class Animation`;
    super(message);
    this.name = this.constructor.name;
  }
}
/**
 * Represents an error that happens when a parameter was expected
 * to be a function or method, but turned out
 * to be otherwise.
 */
export class InvalidFunctionTypeError extends Error {
  /**
   * Creates an instance of InvalidFunctionTypeError.
   * @param {String} paramName - Name of the parameter that's
   * expected to be a function.
   */
  constructor(paramName) {
    const message =
    `Parameter "${paramName}" was expected to be a function instead.`;
    super(message);
    this.name = this.constructor.name;
  }
}
/**
 * Represents an error that occurs when a value was expected to be a number,
 * but turned out to be otherwise.
 * @class
 */
export class InvalidNumberError extends Error {
  /**
   * Creates a new InvalidNumberError instance.
   * @param {String} paramName - The name of the parameter
   * that was expected to be a number.
   * @param {*} actualValue - The actual value that was not a number.
   */
  constructor(paramName, actualValue) {
    // eslint-disable-next-line max-len
    const message = `Parameter "${paramName}" was expected to be a number, but received "${actualValue}".`;
    super(message);
    this.name = this.constructor.name;
  }
}
