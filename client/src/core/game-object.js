import { events } from "./events/events.js";
import {
	GameObjectInstanceError,
	Vector2InstanceError,
} from "./utils/errors.js";
import { NumberTypeError } from "./utils/errors.js";
import Vector2 from "./vector2.js";
// FIXME: needs testing.
/**
 * GameObject class is an abstraction layer that provides
 * useful functionality for game entity like attaching children
 * running draw/step on them.
 */
class GameObject {
	#children = [];
	#position;
	#parent = null;
	/**
	 * Creates a new instance of GameObject class
	 * @param {Vector2} position - Represents a starting position of an entity,
	 * should be an instance of Vector2, by default if not then, a new instance
	 * of Vector2 is constructed with the default position of [0,0].
	 */
	constructor(position) {
		this.#position = position instanceof Vector2 ? position : new Vector2();
	}
	/**
	 * A getter for the position of a game object.
	 * @returns {Vector2} - Position of a game object.
	 */
	get position() {
		return this.#position;
	}
	/**
	 * A setter for the position of a game object.
	 * @param {Vector2} position - Must be an instance of Vector2.
	 * @returns {Vector2} - Position of the a game object.
	 * @throws {Vector2InstanceError} - If `position` is not an instance of Vector2.
	 */
	set position(position) {
		if (!(position instanceof Vector2)) {
			throw new Vector2InstanceError("position", position);
		}
		this.#position = position;
	}
	get parent() {
		return this.#parent;
	}
	set parent(parent) {
		if (!(parent instanceof GameObject)) {
			throw new GameObjectInstanceError("parent", parent);
		}
		this.#parent = parent;
	}
	get children() {
		return this.#children;
	}
	set children(children) {
		for (const child of children) {
			if (child instanceof GameObject) {
				continue;
			}
			throw new GameObjectInstanceError("children", children);
		}
		this.#children = children;
	}
	/**
	 * Calls drawImage method on the object itself and all its children
	 * in an up-to-bottom order.
	 * @param {Context} ctx - A canvas context of which to draw the object.
	 * @param {Number} x - A new change in x-axis.
	 * @param {Number} y - A new change in y-axis.
	 * @throws {NumberTypeError} - If `x` or `y` not a number.
	 */
	draw(ctx, x, y) {
		if (!Number.isFinite(x)) {
			throw new NumberTypeError("x", x);
		}
		if (!Number.isFinite(y)) {
			throw new NumberTypeError("y", y);
		}
		if (!(ctx instanceof CanvasRenderingContext2D)) {
			throw new TypeError(
				`ctx was expected to be an instance of CanvasRenderingContext2D\nReceived instead: ${ctx}`,
			);
		}
		const xPos = this.position.x + x;
		const yPos = this.position.y + y;
		this.drawImage(ctx, xPos, yPos);

		for (const child of this.children) {
			child.draw(ctx, xPos, yPos);
		}
	}
	/**
	 * Placeholder method for drawing the image of the object.
	 * To be implemented by subclasses.
	 */
	drawImage() {
		return;
	}
	/**
	 * Executes the step function for the object and all its children.
	 * @param {Number} deltaTime - Time elapsed since the last frame.
	 * @param {GameObject} root - Root object of the scene.
	 */
	stepEntry(deltaTime, root) {
		if (!(Number.isFinite(deltaTime) && deltaTime > 0)) {
			throw new NumberTypeError("deltaTime", deltaTime);
		}
		if (!(root instanceof GameObject)) {
			throw new GameObjectInstanceError("root", root);
		}

		for (const child of this.children) {
			child.stepEntry(deltaTime, root);
		}
		this.step(deltaTime, root);
	}
	/**
	 * Placeholder method for performing object-specific step logic.
	 * To be implemented by subclasses.
	 * @param {Number} deltaTime - Time elapsed since the last frame.
	 * @param {GameObject} root - Root object of the scene.
	 */
	step() {
		return;
	}
	detach() {
		for (const child of this.children) {
			child.detach();
		}
		if (this.parent === null) {
			return;
		}
		this.parent.removeChild(this);
		events.unsubscribe(this);
	}
	hasChild(gameObject) {
		return this.children.includes(gameObject);
	}
	/**
	 * Adds a child object to the current object.
	 * @param {GameObject} gameObject - The child object to add.
	 * @throws {GameObjectInstanceError} - If gameObject is not an instance of GameObject.
	 */
	addChild(gameObject) {
		if (!(gameObject instanceof GameObject)) {
			throw new GameObjectInstanceError("gameObject", gameObject);
		}
		gameObject.parent = this;
		this.children.push(gameObject);
	}
	/**
	 * Removes a child object from the current object.
	 * @param {GameObject} gameObject - The child object to remove.
	 * @throws {GameObjectInstanceError} - If gameObject is not an instance of GameObject.
	 */
	removeChild(gameObject) {
		if (!(gameObject instanceof GameObject)) {
			throw new GameObjectInstanceError("gameObject", gameObject);
		}

		this.children = this.children.filter((child) => {
			return child !== gameObject;
		});
	}
}

export default GameObject;
