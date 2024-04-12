/* eslint-disable require-jsdoc */

import Vector2 from './Vector2.js';
/**
 * Creates frames based on image.
 */
export default class Sprite {
  /**
     * @param {Image} resource - An image that can be added to canvas.
     * @param {Vector2} frameSize - The frame size(x,y) in pixels.
     * @param {Number} hFrames - Number of horizontal frames.
     * @param {Number} vFrames - Number of vertical frames.
     * @param {Number} frame - Specifies frame to be used.
     * @param {Number} scale - Specifies how much a frame should be scaled
     * from the origional size.
     * @return {void}
     */
  constructor({
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    animator,
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animator = animator;
    this.buildFrameMap();
  }

  // eslint-disable-next-line require-jsdoc
  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; ++v) {
      for (let h = 0; h < this.hFrames; ++h) {
        this.frameMap.set(frameCount, new Vector2(
            h * this.frameSize.x,
            v * this.frameSize.x,
        ));
        ++frameCount;
      }
    }
  }
  step(deltaTime) {
    this.animator.step(deltaTime);
    this.frame = this.animator.frame;
  }
  // eslint-disable-next-line require-jsdoc
  async drawImage(ctx, x, y) {
    await this.resource.loadProcess;

    let frameStartX = 0;
    let frameStartY = 0;

    const frame = this.frameMap.get(this.frame);

    if (frame) {
      frameStartX = frame.x;
      frameStartY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;
    ctx.drawImage(
        this.resource.image,
        frameStartX,
        frameStartY,
        frameSizeX,
        frameSizeY,
        x,
        y,
        frameSizeX * this.scale,
        frameSizeY * this.scale,
    );
  }
}
