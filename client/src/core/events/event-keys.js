import { v4 as uuidv4 } from 'uuid';

// [-]: Generate unique event ids.

export const EVENT_KEYS = {
	player_move: uuidv4(),
	pick_up: uuidv4(),
	player_item_overlap: uuidv4(),
};
