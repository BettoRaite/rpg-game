// [-]: Logic check
/**
 * Loader for game assets.
 */
export class Resource {
  /**
   * Loads visual assets into the game,
   * which can later be added to the canvas.
   * @param {Object} assets - An object representing name of an asset
   * and it's path, like {sky: '/sprites/sky.png'},
   * load a sky asset from the specified path.
   * @throws {Error} - Throws Error if asset can't be loaded from
   * the specified path after 3 seconds.
   * @throws {TypeError} - Throws TypeError if `assets` is not an object.
   * @example
   */
  constructor(assets = {}) {
    // Paths to our image files.
    this.toLoad = {
      sky: '/sprites/sky.png',
      ground: '/sprites/ground.png',
      hero: '/sprites/hero-sheet.png',
      // eslint-disable-next-line max-len
      ...assets,
    };
    this.images = {};
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      const path = this.toLoad[key];
      img.src = path;

      this.images[key] = {
        fileName: key,
        image: img,
        loadProcess: new Promise((resolve, reject)=>{
          const LOAD_TIME_LIMIT = 10;
          setTimeout(()=>{
            reject(new Error(`Failed to load asset.
            File name: ${key}
            File path: ${path}`));
          }, 1000 * LOAD_TIME_LIMIT);
          img.onload = () =>{
            resolve(`${key} was loaded successfully!`);
          };
        }),
      };
    });
  }
}

const assets = {
  shadow: 'sprites/shadow.png',
};
export const resources = new Resource(assets);
