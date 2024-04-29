import Sprite from "../../components/sprite.js";
import { events, EVENT_KEYS } from "../../events/events.js";
import GameObject from "../../game-object.js";

class Inventory extends GameObject {
	constructor(position, gap = 16) {
		super(position);

		events.on(EVENT_KEYS.player_pickable_overlap, this, (sprite) => {
			const lastChild = this.children.at(-1);
			if (lastChild instanceof GameObject) {
				const lastChildPos = lastChild.position.duplicate();
				lastChildPos.x += gap;
				sprite.position = lastChildPos;
			} else {
				sprite.position = this.position;
			}
			this.addChild(sprite);
		});
	}
}
export default Inventory;
