// DANGEROUS, LOOOK AT THE ERROR HANDLING!!!!
import {DIRECTION, GRID_CELL} from '../constants.js';
import Vector2 from '../Vector2.js';
/**
 * Calculates new destination position based on the
 * current entity position and the given direction.
 * @param {String} direction - Direction to which entity
 * should be moved by 16 pixels.
 * @param {Vector2} entityPos - Current position of the entity.
 * @return {Vector2} - New destination of the entity or entity position
 * if direction is default.
 * @example
 * const entityPos = new Vector2(20, 20);
 * const destPos = calcNewDestPos('TOP', entityPos);
 * console.log(destPos.x, destPos.y); // 20, 4 because canvas's 'y' is
 * // at 0 at the top of the monitor and at the bottom 'y' = monitorHeight.
 */
export const calcNewDestPos = (direction, entityPos) => {
  if (typeof direction !== 'string') {
  } else if (!(entityPos instanceof Vector2)) {
  }
  direction = direction.toUpperCase();
  switch (direction) {
    case DIRECTION.default:
      return entityPos;
    case DIRECTION.top:
      return new Vector2(
          entityPos.x,
          entityPos.y - GRID_CELL.size,
      );
    case DIRECTION.down:
      return new Vector2(
          entityPos.x,
          entityPos.y + GRID_CELL.size,
      );

    case DIRECTION.left:
      return new Vector2(
          entityPos.x - GRID_CELL.size,
          entityPos.y,
      );
    case DIRECTION.right:
      return new Vector2(
          entityPos.x + GRID_CELL.size,
          entityPos.y,
      );
    default:
      const validDirections = [...new Set(Object.values(DIRECTION))];
      throw new SyntaxError(`Invalid direction, expected: ${validDirections}`);
  }
};

