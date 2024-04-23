export class Events {
	#callbacks = [];
	#nextId = 0;
	emit(eventName, value) {
		for (const cb of this.#callbacks) {
			if (cb.eventName === eventName) {
				cb.callback(value);
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
