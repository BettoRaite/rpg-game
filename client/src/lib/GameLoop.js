import {InvalidFunctionTypeError} from './utils/customErrors.js';
/**
 * Class representing a loop that runs
 * approximately 60 times(frames) per seconds. (updates/draws regardless of
 * monitor mhz)
 */
export class GameLoop {
/**
   * Creates a game loop with an updater and a renderer functions.
   * @param {Function} updater - An update function, such as that,
   * which updates the player position.
   * @param {Function} renderer - A render function, such as that,
   * which draws a player on the canvas.
   * @throws {InvalidFunctionTypeError} - Throws error
   * if `updater` or `renderer` is not a function.
   */
  constructor(updater, renderer) {
    if (typeof updater !== 'function') {
      throw new InvalidFunctionTypeError('updater');
    } else if (typeof renderer !== 'function' ) {
      throw new InvalidFunctionTypeError('renderer');
    }
    this._lastFrameTime = 0;
    this._accumulatedTime = 0;
    this._timeStep = 1000/60;
    this._updater = updater;
    this._renderer = renderer;
    this._rafId = null;
    this._isRunning = false;
  }
  /**
   * Main loop function, that calls updater and renderer functions.
   * @param {Number} timestamp - The current timestamp.
   * @return {void}
   */
  _mainLoop = (timestamp) => {
    if (!this._isRunning) return;
    const deltaTime = timestamp - this._lastFrameTime;

    this._lastFrameTime = timestamp;
    this._accumulatedTime += deltaTime;
    while (this._accumulatedTime >= this._timeStep) {
      this._updater(deltaTime);
      this._accumulatedTime -= this._timeStep;
    }

    this._renderer();
    this._rafId = requestAnimationFrame(this._mainLoop);
  };
  /**
   * Starts the game loop.
   * @return {void}
   */
  start() {
    if (!this._isRunning) {
      this._isRunning = true;
      this._rafId = requestAnimationFrame(this._mainLoop);
    }
  }
  /**
   * Stops the game loop.
   * @return {void}
   */
  stop() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
    }
    this._isRunning = false;
  }
}
