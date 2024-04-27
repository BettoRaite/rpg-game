import { DIRECTION } from "./constants.js";

/**
 * Represents an input device.
 */
class Input {
	/**
	 * An array to store the active directions based on keys currently pressed.
	 * @type {Array}
	 */
	#directions = [];
	/**
	 * Create an Input instance.
	 * Sets up event listeners for keypress and keyup to handle keyboard input.
	 */
	constructor() {
		document.addEventListener("keypress", this.#keyPressHandler);
		document.addEventListener("keyup", this.#keyReleaseHandler);
	}

	/**
	 * Handles keypress events and updates the directions array.
	 * @param {KeyboardEvent} e - The keyboard event.
	 */
	#keyPressHandler = (e) => {
		const dir = DIRECTION[e.code];
		if (dir && !this.#directions.includes(dir)) {
			this.#directions.push(dir);
		}
	};

	/**
	 * Handles keyup events and removes the direction from the directions array.
	 * @param {KeyboardEvent} e - The keyboard event.
	 */
	#keyReleaseHandler = (e) => {
		const dir = DIRECTION[e.code];
		if (this.#directions.includes(dir)) {
			this.#directions.splice(this.#directions.indexOf(dir), 1);
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
		return this.#directions[0] ?? DIRECTION.default;
	}
}

export default Input;
