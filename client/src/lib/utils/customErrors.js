import {getDataType} from './typeChecking.js';
import {DATA_TYPES} from '../constants.js';
/** Generates a `TypeError` from a description template and throws it.
 * @param {string} variableName - An actual name of the variable.
 * @param {string} expectedType - An expected data type of the variable.
 * @param {any} value The actual value of the variable.
 * @return {void}
 * @throws {TypeError} Throws a generated `TypeError`
 * from a description template.
 */
export const throwTypeErrorFromTemplate =
(variableName, expectedType, value) => {
  const description = `\n
Variable: ${variableName}
Was expected to be: ${expectedType}
Error value type: [${getDataType(value)}] 
Error value: ${JSON.stringify(value)}`;

  throw new TypeError(description);
};
export const throwErrorOnNonNumber = (variableName, value)=>{
  if (!Number.isFinite(value)) {
    throwTypeErrorFromTemplate(
        `${variableName}`,
        DATA_TYPES.number,
        value,
    );
  }
};
/**
 * Class representing an error that happens when
 * value is not an instance of animation class.
 * @class
 */
export class AnimationInstanceError extends Error {
  /**
   *
   * @param {String} variableName - Variable name
   */
  constructor(variableName) {
    const message =
    `${variableName} was expected to be an instance of class Animation`;
    super(message);
    this.name = this.constructor.name;
  }
}
