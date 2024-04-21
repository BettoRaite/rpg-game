/* eslint-disable require-jsdoc */
// [-]: Add error handling
// [-]: Write JSdoc

import Vector2 from '../vector2.js';
import {AnimationsManager} from '../animation/animations-manager.js';
import GameObject from '../game-object.js';
import ImageResource from '../image-resource.js';
import {ObjectInstanceError} from '../utils/errors.js';
import {isObject} from '../utils/type-checking.js';
/**
 * Creates frames based on image.
 */
export default class Sprite extends GameObject {
  #frame = 0;
  #animationsManager = null;
  #imageResource;
  #hFrames;
  #vFrames;
  #frameSize;
  #frameMap;
  #scale;

  constructor(spriteConfig, position) {
    super({position});

    if (!isObject(spriteConfig)) {
      throw new ObjectInstanceError('spriteConfig', spriteConfig);
    }

    const {
      imageResource,
      frameSize,
      hFrames,
      vFrames,
      frame,
      scale,
      animationsManager,
    } = spriteConfig;


    if (!(imageResource instanceof ImageResource)) {
      throw new TypeError('Expected an instance of class ImageResource');
    }

    this.#imageResource = imageResource;
    this.#hFrames = Number.isInteger(hFrames) && hFrames > 0 ? hFrames : 1;
    this.#vFrames = Number.isInteger(vFrames) && vFrames > 0 ? vFrames : 1;
    // eslint-disable-next-line max-len
    this.#frameSize = frameSize instanceof Vector2 ? frameSize : new Vector2(16, 16);

    this.#frame = Number.isInteger(frame) && frame > 0 ? frame : 0;
    this.#frameMap = new Map();
    this.#scale = scale ?? 1;

    if (animationsManager instanceof AnimationsManager) {
      this.#animationsManager = animationsManager;
    }
    this.#buildFrameMap();
  }
  set scale(scale) {
    if (!(Number.isFinite(scale) && scale >= 0)) {
      // eslint-disable-next-line max-len
      throw new TypeError(`Scale was expected to be a positive number, instead received: ${scale}`);
    }
    this.#scale = scale;
  }
  #buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.#vFrames; ++v) {
      for (let h = 0; h < this.#hFrames; ++h) {
        this.#frameMap.set(frameCount, new Vector2(
            h * this.#frameSize.x,
            v * this.#frameSize.x,
        ));
        ++frameCount;
      }
    }
  }
  get animationsManager() {
    if (this.#animationsManager === null) {
      return;
    }
    return this.#animationsManager;
  }
  play(animationKey) {
    this.#animationsManager.play(animationKey);
  }
  step(deltaTime) {
    if (this.#animationsManager === null) {
      return;
    }
    this.#animationsManager.step(deltaTime);
    this.#frame = this.#animationsManager.frame;
  }
  drawImage(ctx, x, y) {
    if (!this.#imageResource.hasLoaded) {
      return;
    }

    let frameStartX = 0;
    let frameStartY = 0;

    const frame = this.#frameMap.get(this.#frame);

    if (frame) {
      frameStartX = frame.x;
      frameStartY = frame.y;
    }

    const frameSizeX = this.#frameSize.x;
    const frameSizeY = this.#frameSize.y;
    ctx.drawImage(
        this.#imageResource.image,
        frameStartX,
        frameStartY,
        frameSizeX,
        frameSizeY,
        x,
        y,
        frameSizeX * this.#scale,
        frameSizeY * this.#scale,
    );
  }
}
