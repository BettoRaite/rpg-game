/* eslint-disable require-jsdoc */

export class GameLoop {
  /**
   *
   * @param {Function} update
   * @param {Function} render
   */
  constructor(update, render) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000/60;
    this.update = update;
    this.render = render;
    this.rafId = null;
    this.isRunning = false;
  }
  mainLoop = (timestamp) => {
    if (!this.isRunning) return;
    const deltaTime = timestamp - this.lastFrameTime;

    this.lastFrameTime = timestamp;
    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(timestamp);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop);
  };
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}
