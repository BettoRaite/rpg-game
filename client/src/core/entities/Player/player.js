import { AnimationsManager } from "../../animation/animations-manager.js";
import { DIRECTION } from "../../constants.js";
import { EVENT_KEYS } from "../../constants.js";
import { events } from "../../events/events.js";
/* eslint-disable require-jsdoc */
import GameObject from "../../game-object.js";
import { calcNewDestPos } from "../../helpers/destination-position.js";
import { moveTowards } from "../../helpers/move-towards.js";
import Vector2 from "../../vector2.js";
class Player extends GameObject {
	#spiteComponent = null;
	#destPos;
	#lastPos;
	constructor(position, ...components) {
		super(position);

		this.#destPos = this.position.duplicate();
		this.#lastPos = this.position.duplicate();

		for (const component of components) {
			if (
				component.animationsManager instanceof AnimationsManager &&
				this.#spiteComponent === null
			) {
				this.#spiteComponent = component;
			}
			this.addChild(component);
		}
	}
	get spiteComponent() {
		return this.#spiteComponent;
	}
	step(deltaTime, root) {
		const { input } = root;
		const direction = input.direction();
		const distance = moveTowards(this.position, this.#destPos, 1);
		if (direction !== DIRECTION.default && distance < 1) {
			this.#destPos = calcNewDestPos(direction, this.position);
		}
		switch (direction) {
			case DIRECTION.top:
				this.#spiteComponent.play("walkTop");
				break;
			case DIRECTION.down:
				this.#spiteComponent.play("walkDown");
				break;
			case DIRECTION.right:
				this.#spiteComponent.play("walkRight");
				break;
			case DIRECTION.left:
				this.#spiteComponent.play("walkLeft");
				break;

			case DIRECTION.default:
				if (distance === 0) {
					this.#spiteComponent.play("stand");
				}
		}
		this.#spiteComponent.step(deltaTime);
		this.#emitMoveEvent();
	}
	#emitMoveEvent() {
		if (this.#lastPos.isEqual(this.position)) {
			return;
		}

		const deltaPoint = this.#lastPos.substractFrom(this.position);
		this.position.cloneTo(this.#lastPos);
		events.emit(EVENT_KEYS.player_move, deltaPoint);
	}
}
export default Player;
