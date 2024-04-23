import { GRID_CELL } from "../constants.js";
import { NumberTypeError } from "../utils/errors.js";
/**
 * Calculates total grid length based on the number of grid cells.
 * @param {Number} cells - Number of cells.
 * @return {Number} - Total length.
 * @throws {NumberTypeError} - If `cells` is not a number.
 * @example
 * const totalGridLength = gridCells(3);
 * console.log(totalGridLength); // 48
 */
export const gridCells = (cells) => {
	if (!Number.isFinite(cells)) {
		throw new NumberTypeError("cells", cells);
	}

	return cells * GRID_CELL.size;
};
