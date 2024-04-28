import { v4 as uuidv4 } from "uuid";
// [-]: Write docs.
// [-]: Write tests.

export const EVENT_KEYS = {
	player_move: uuidv4(),
	pick_up: uuidv4(),
	player_pickable_overlap: uuidv4(),
};

export class Events {
	#callbacks = [];
	#nextId = 0;

	static eventKeys = {
		player_move: uuidv4(),
		pick_up: uuidv4(),
		player_item_overlap: uuidv4(),
	};

	emit(eventName, ...values) {
		for (const cb of this.#callbacks) {
			if (cb.eventName === eventName) {
				cb.callback(...values);
			}
		}
	}
	on(eventName, caller, callback) {
		this.#callbacks.push({
			id: this.#nextId,
			eventName,
			caller,
			callback,
		});
		this.#nextId += 1;
	}
	off(id) {
		this.#callbacks = this.#callbacks.filter((cb) => {
			return cb.id !== id;
		});
	}
	unsubscribe(caller) {
		this.#callbacks = this.#callbacks.filter((cb) => {
			return cb.caller !== caller;
		});
	}
}
export const events = new Events();
