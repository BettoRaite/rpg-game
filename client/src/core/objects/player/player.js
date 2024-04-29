import AnimationsManager from "../../animation/animations-manager.js";
import Sprite from "../../components/sprite.js";
import { DIRECTION } from "../../constants.js";
import { EVENT_KEYS } from "../../events/events.js";
import { events } from "../../events/events.js";
/* eslint-disable require-jsdoc */
import GameObject from "../../game-object.js";
import { calcNewDestPos } from "../../helpers/destination-position.js";
import { moveTowards } from "../../helpers/move-towards.js";
import { PositiveNumberError } from "../../utils/errors.js";
import Vector2 from "../../vector2.js";
class Player extends GameObject {
	#spiteComponent = null;
	#destPos;
	#lastPos;
	#itemPickUpTime = 0;
	#itemPickupShell = new GameObject();
	constructor(position, ...components) {
		super(position);

		this.#destPos = this.position.duplicate();
		this.#lastPos = this.position.duplicate();

		for (const component of components) {
			if (
				component.animationsManager instanceof AnimationsManager &&
				this.spiteComponent === null
			) {
				this.#spiteComponent = component;
			}
			this.addChild(component);
		}

		events.on(EVENT_KEYS.player_pickable_overlap, this, (sprite) => {
			this.#onItemPickUp(sprite);
			this.#itemPickUpTime = 1000;
		});
	}
	get itemPickUpTime() {
		return this.#itemPickUpTime;
	}
	set itemPickUpTime(itemPickUpTime) {
		if (!Number.isFinite(itemPickUpTime) || itemPickUpTime < 0) {
			throw new PositiveNumberError("itemPickUpTime", itemPickUpTime);
		}
		this.#itemPickUpTime = itemPickUpTime;
	}
	get spiteComponent() {
		return this.#spiteComponent;
	}
	step(deltaTime, root) {
		if (this.spiteComponent === null) {
			return;
		}
		if (this.itemPickUpTime > 0) {
			this.#emitMoveEvent();
			this.#runPickUpState(deltaTime);
			return;
		}
		const { input } = root;
		const direction = input.direction();
		const distance = moveTowards(this.position, this.#destPos, 1);

		if (direction !== DIRECTION.default && distance < 1) {
			this.#destPos = calcNewDestPos(direction, this.position);
		}

		switch (direction) {
			case DIRECTION.top:
				this.spiteComponent.play("walkTop");
				break;
			case DIRECTION.down:
				this.spiteComponent.play("walkDown");
				break;
			case DIRECTION.right:
				this.spiteComponent.play("walkRight");
				break;
			case DIRECTION.left:
				this.spiteComponent.play("walkLeft");
				break;

			case DIRECTION.default:
				if (distance === 0) {
					this.spiteComponent.play("stand");
				}
		}
		this.spiteComponent.step(deltaTime);
		this.#emitMoveEvent();
	}
	#runPickUpState(deltaTime) {
		moveTowards(this.position, this.#destPos, 1);
		const timeLeft = this.itemPickUpTime - deltaTime;
		if (timeLeft <= 0) {
			this.itemPickUpTime = 0;
			this.removeChild(this.#itemPickupShell);
			this.#itemPickupShell = null;

			return;
		}
		this.itemPickUpTime = timeLeft;
		this.spiteComponent.play("pickUp");
	}
	#onItemPickUp(sprite) {
		this.#itemPickupShell = new GameObject();
		this.#itemPickupShell.addChild(sprite);
		sprite.position.x = 0;
		sprite.position.y = 4;

		this.addChild(this.#itemPickupShell);
	}
	#emitMoveEvent() {
		if (this.#lastPos.isEqualTo(this.position)) {
			return;
		}

		const deltaPos = this.#lastPos.substractFrom(this.position);
		this.position.cloneTo(this.#lastPos);
		events.emit(EVENT_KEYS.player_move, this.position, deltaPos);
	}
}
export default Player;
