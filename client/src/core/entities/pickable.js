import { EVENT_KEYS } from "../events/event-keys.js";
import { events } from "../events/events.js";
import GameObject from "../game-object.js";
import { Vector2InstanceError } from "../utils/errors.js";
import Vector2 from "../vector2.js";

class Pickable extends GameObject {
	#pickUpDistance;
	constructor(position,  ...components) {
		if (!(position instanceof Vector2)) {
			throw new Vector2InstanceError("position", position);
		}
		super(position);
		this.pickUpDistance = 12;
		for (const component of components) {
			this.addChild(component);
		}
		
		events.on(EVENT_KEYS.player_move, this, (position) => {
			if (this.position.isEqualTo(position, this.pickUpDistance)) {
				this.detach();
				events.emit(EVENT_KEYS.player_item_overlap, this);
			}
		});
	}
	get pickUpDistance() {
		return this.#pickUpDistance;
	}
	set pickUpDistance(pickUpDistance) {
		if(!Number.isFinite(pickUpDistance) || pickUpDistance < 0) {
			throw new TypeError(`pickUpDistance was expected to be a positive, finite number, received instead ${pickUpDistance}`)
		}
		this.#pickUpDistance = pickUpDistance;
	}
}
export default Pickable;
