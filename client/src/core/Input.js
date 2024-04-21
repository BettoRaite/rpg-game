import {DIRECTION} from './constants';

/**
 * Class representing an input device.
 * @class
 */
export default class Input {
  /**
   * Create an Input instance.
   * Sets up event listeners for keypress and keyup to handle keyboard input.
   */
  constructor() {
    /**
     * An array to store the active directions based on keys currently pressed.
     * @type {Array}
     */
    this._directions = [];

    document.addEventListener('keypress', this.#keyPressHandler);
    document.addEventListener('keyup', this.#keyReleaseHandler);
  }

  /**
   * Handles keypress events and updates the directions array.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  #keyPressHandler = (e) => {
    const dir = DIRECTION[e.code];
    if (dir && !this._directions.includes(dir)) {
      this._directions.push(dir);
    }
  };

  /**
   * Handles keyup events and removes the direction from the directions array.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  #keyReleaseHandler = (e) => {
    const dir = DIRECTION[e.code];
    if (this._directions.includes(dir)) {
      this._directions.splice(this._directions.indexOf(dir), 1);
    }
  };

  /**
   * @return {string} - Returns the current direction based
   * on the first key pressed that's still pressed. If no
   * key is currently pressed returns default direction.
   * @example
   * // If key is [KeyW]
   * input.direction(); // "TOP"
   * // If key is [KeyD]
   * input.direction(); // "RIGHT"
   */
  direction() {
    return this._directions[0] ?? DIRECTION.default;
  }
}
