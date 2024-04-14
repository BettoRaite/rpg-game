// FIXME: Add throw statements
import {GRID_CELL} from '../constants';
/**
 * Calculates total grid length based on the number of grid cells.
 * @param {Number} cells - Number of cells.
 * @return {Number} - Returns total length.
 * @example
 * const totalGridLength = gridCells(3);
 * console.log(totalGridLength); // 48
 */
export const gridCells = (cells) => {
  if (!Number.isFinite(cells)) {
  }

  return cells * GRID_CELL.size;
};

