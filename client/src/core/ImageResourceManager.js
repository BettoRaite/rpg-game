/* eslint-disable require-jsdoc */
import {ObjectInstanceError} from './utils/errors.js';
import {isObject} from './utils/typeChecking.js';
import ImageResource from './ImageResource.js';
/**
 * Loads and prepares image assets.
 */
class ImageResourceManager {
  #resources = {};
  #resourceKeys = [];
  /**
   * Creates an ImageResourceManager instance.
   * @param {Object} resourceMap - An object representing
   * image keys and their paths, like {sky: '/sprites/sky.png'}.
   * @throws {ObjectInstanceError} - Throws error
   * if `resourceMap` is not an object.
   */
  constructor(resourceMap) {
    if (!isObject(resourceMap)) {
      throw new ObjectInstanceError('resourceMap', resourceMap);
    }

    this.#resourceKeys = Object.keys(resourceMap);

    for (const resKey of this.#resourceKeys) {
      const resourcePath = resourceMap[resKey];
      this.#resources[resKey] = new ImageResource(resourcePath);
    }
  }

  /**
   * @return {Object} - Returns an object that maps between
   * resource key and resource(loaded image).
   */
  get resources() {
    return this.#resources;
  }

  /**
   * Returns an array of resource keys.
   * @return {Array} - An array of resource keys.
   */
  get resourceKeys() {
    return this.#resourceKeys;
  }
}

export default ImageResourceManager;
