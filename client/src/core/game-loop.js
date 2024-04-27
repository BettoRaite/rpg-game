import { InvalidFunctionTypeError } from "./utils/errors.js";
/**
 * Class representing a loop that runs
 * approximately 60 times(frames) per seconds. (updates/draws regardless of
 * monitor mhz)
 */
export class GameLoop {
	#lastFrameTime = 0;
	#accumulatedTime = 0;
	#timeStep = 1000 / 60;
	#updater;
	#renderer;
	#rafId = null;
	#isRunning = false;

	/**
	 * Creates a new instance of GameLoop with an updater and a renderer functions.
	 * @param {Function} updater - An update function, such as that,
	 * which updates the player position.
	 * @param {Function} renderer - A render function, such as that,
	 * which draws a player on the canvas.
	 * @throws {InvalidFunctionTypeError} - Throws error
	 * if `updater` or `renderer` is not a function.
	 */
	constructor(updater, renderer) {
		if (typeof updater !== "function") {
			throw new InvalidFunctionTypeError("updater");
		}
		if (typeof renderer !== "function") {
			throw new InvalidFunctionTypeError("renderer");
		}
		this.#updater = updater;
		this.#renderer = renderer;
	}
	/**
	 * Main loop function, that calls updater and renderer functions.
	 * @param {Number} timestamp - The current timestamp.
	 * @return {void}
	 */
	#mainLoop = (timestamp) => {
		if (!this.#isRunning) return;
		const deltaTime = timestamp - this.#lastFrameTime;

		this.#lastFrameTime = timestamp;
		this.#accumulatedTime += deltaTime;
		let isDrawTime = false;
		while (this.#accumulatedTime >= this.#timeStep) {
			isDrawTime = true;
			this.#updater(deltaTime);
			this.#accumulatedTime -= this.#timeStep;
		}
		if (isDrawTime) {
			this.#renderer();
		}
		this.#rafId = requestAnimationFrame(this.#mainLoop);
	};
	/**
	 * Starts the game loop.
	 * @return {void}
	 */
	start() {
		if (!this.#isRunning) {
			this.#isRunning = true;
			this.#rafId = requestAnimationFrame(this.#mainLoop);
		}
	}
	/**
	 * Stops the game loop.
	 * @return {void}
	 */
	stop() {
		if (this.#rafId) {
			cancelAnimationFrame(this.#rafId);
		}
		this.#isRunning = false;
	}
}
