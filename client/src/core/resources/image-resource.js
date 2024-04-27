import { StringTypeError } from "../utils/errors.js";
// FIXME: Add testing
/**
  Loads image from specified path.
 */
class ImageResource {
	#image;
	#hasLoaded;

	/**
	 * Creates a new instance of ImageResource class.
	 *
	 * @param {string} imagePath - Path to the image file.
	 * @throws {StringTypeError} - If `imagePath` is not a string.
	 */
	constructor(imagePath) {
		if (typeof imagePath !== "string") {
			throw new StringTypeError("imagePath", imagePath);
		}

		const image = new Image();
		image.src = imagePath;
		this.imageName = imagePath.split("/").at(-1);
		this.#image = image;
		this.#hasLoaded = false;

		image.onload = () => {
			this.#hasLoaded = true;
		};
	}

	/**
	 * Getter for the underlying Image object.
	 *
	 * @return {Image} - The internal Image object used to represent the image.
	 */
	get image() {
		return this.#image;
	}

	/**
	 * Getter for the loaded state of the image.
	 *
	 * @return {boolean} - True if the image has
	 * finished loading, False otherwise.
	 */
	get hasLoaded() {
		return this.#hasLoaded;
	}
}

export default ImageResource;
