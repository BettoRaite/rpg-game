import { DIRECTION, GRID_CELL } from "../constants.js";
import { StringTypeError, Vector2InstanceError } from "../utils/errors.js";

import Vector2 from "../vector2.js";
/**
 * Calculates the new destination position of an entity based on its current position and a given direction.
 *
 * This function assumes the entity moves on a grid-based system with cells of size {@link GRID_CELL.size}.
 *
 * @param {string} direction - The direction in which the entity should move.
 *   Valid directions are: `${DIRECTION.top}`, `${DIRECTION.down}`, `${DIRECTION.left}`, or `${DIRECTION.right}`.
 * @param {Vector2} entityPos - The current position of the entity.
 * @returns {Vector2} The new destination position of the entity. If `direction` is `${DIRECTION.default}`, the original `entityPos` is returned.
 *
 * @throws {Vector2InstanceError} - Thrown If `entityPos` is not a `Vector2` instance or `StringTypeError` if `direction` is not a string.
 * @throws {SyntaxError} - Thrown if an invalid `direction` is provided.
 *
 * @example
 * const entityPos = new Vector2(20, 20);
 * const destPos = calcNewDestPos('TOP', entityPos);
 * console.log(destPos.x, destPos.y); // Output: 20, 4 (assuming positive Y is up)
 */

export const calcNewDestPos = (direction, entityPos) => {
	if (typeof direction !== "string") {
		throw new StringTypeError("direction", direction);
	}
	if (!(entityPos instanceof Vector2)) {
		throw new Vector2InstanceError("entityPos", entityPos);
	}
	switch (direction) {
		case DIRECTION.default:
			return entityPos;
		case DIRECTION.top:
			return new Vector2(entityPos.x, entityPos.y - GRID_CELL.size);
		case DIRECTION.down:
			return new Vector2(entityPos.x, entityPos.y + GRID_CELL.size);

		case DIRECTION.left:
			return new Vector2(entityPos.x - GRID_CELL.size, entityPos.y);
		case DIRECTION.right:
			return new Vector2(entityPos.x + GRID_CELL.size, entityPos.y);
		default: {
			const validDirections = [...new Set(Object.values(DIRECTION))];
			throw new SyntaxError(`Invalid direction, expected: ${validDirections}`);
		}
	}
};
