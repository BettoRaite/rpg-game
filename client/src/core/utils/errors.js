import { EXPECTED_TYPES } from "../constants.js";
import { getDataType } from "./type-checking.js";
// [-]: Needs testing
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
		const message = `\nParameter: "${paramName}"\nWas expected to be of type: ${expectedType}\nReceived instead: [${typeOfActualValue}]\nWith value: "${actualValue}"\n`;
		super(message);
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
 * to be a string, but turned out to be otherwise.
 */
export class StringTypeError extends InvalidTypeError {
	/**
	 * Creates a new StringTypeError instance.
	 * @param {String} paramName - The name of the parameter
	 * that was expected to be a string.
	 * @param {*} actualValue - The actual value that was not a string.
	 */
	constructor(paramName, actualValue) {
		super(paramName, EXPECTED_TYPES.string, actualValue);
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
		super(paramName, EXPECTED_TYPES.integer, actualValue);
		this.name = this.constructor.name;
	}
}
/**
 * Represents an error that occurs when a value was expected
 * to be a positive integer, but turned out to be otherwise.
 */
export class PositiveIntegerError extends InvalidTypeError {
	/**
	 * Creates a new PositiveIntegerError instance.
	 * @param {String} paramName - The name of the parameter
	 * that was expected to be a positive integer.
	 * @param {*} actualValue - The actual value that was not a positive integer.
	 */
	constructor(paramName, actualValue) {
		super(paramName, EXPECTED_TYPES.positiveInteger, actualValue);
		this.name = this.constructor.name;
	}
}
/**
 * Represents an error that occurs when a parameter was expected
 * to be an instance of Vector2 class, but turned out
 * to be otherwise.
 */
export class Vector2InstanceError extends InvalidTypeError {
	/**
	 * Creates an instance of Vector2InstanceError.
	 * @param {String} paramName - Name of the parameter that was
	 * expected to be an instance of Vector2 class.
	 * @param {*} actualValue - The actual value that was not a Vector2 instance.
	 */
	constructor(paramName, actualValue) {
		super(paramName, EXPECTED_TYPES.vector2, actualValue);
		this.name = this.constructor.name;
	}
}
/**
 * Represents an error that occurs when a parameter was expected
 * to be an instance of GameObject class, but turned out
 * to be otherwise.
 */
export class GameObjectInstanceError extends InvalidTypeError {
	/**
	 * Creates an instance of GameObjectInstanceError.
	 * @param {String} paramName - Name of the parameter that was
	 * expected to be an instance of GameObject class.
	 * @param {*} actualValue - The actual value that was not a GameObject instance.
	 */
	constructor(paramName, actualValue) {
		super(paramName, EXPECTED_TYPES.gameObject, actualValue);
		this.name = this.constructor.name;
	}
}
/**
 * Represents an error that happens when a parameter was expected
 * to be an instance of Animation class, but turned out
 * to be otherwise.
 */
export class AnimationInstanceError extends InvalidTypeError {
	/**
	 * Creates an instance of AnimationInstanceError.
	 * @param {String} paramName - Name of the parameter that's
	 * expected to be an intance of animation class.
	 */
	constructor(paramName) {
		const message = `Parameter "${paramName}" was expected to be an instance of class Animation`;
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
		const message = `Parameter "${paramName}" was expected to be a function instead.`;
		super(message);
		this.name = this.constructor.name;
	}
}
/**
 * Represents an error that occurs when a value was expected to be a number,
 * but turned out to be otherwise.
 * @class
 */
export class InvalidNumberError extends InvalidTypeError {
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
/**
 * Represents an error that occurs when a value was expected
 * to be an instance of class AnimationsMap,
 * but turned out to be otherwise.
 */
export class AnimationsMapInstanceError extends InvalidTypeError {
	/**
	 * Creates a new AnimationsMapInstanceError instance.
	 * @param {String} paramName - The name of the parameter
	 * that was expected to be an instance of class AnimationsMap.
	 * @param {*} actualValue - The actual value that was not an instance
	 * of class AnimationsMap.
	 */
	constructor(paramName, actualValue) {
		super(paramName, EXPECTED_TYPES.animationsMap, actualValue);
		this.name = this.constructor.name;
	}
}
