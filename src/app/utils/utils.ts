import { Cell } from "../cell/Cell";
import { GridComponent } from "../grid/grid.component";

export class Utils {
  /**
   * @param {number} cellId - The id of the cell that must be found
   * @param {number} gridWidth - The grid width
   * @param {Cell[][]} grid - The grid containing cells
   * @return {Cell} The cell matching the cellId
   */
  static idToCoords(cellId: number, gridWidth: number, grid: Cell[][]): Cell {
    return grid[Math.floor(cellId / gridWidth)][cellId % gridWidth];
  }

  /**
   * @param {number} min - The lower interval
   * @param {number} max - The higher interval
   * @return {number} The random number generated
   */
  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
