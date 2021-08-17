import { Cell } from "../cell/Cell";

export class Utils {
  static idToCoords(cellId: number, gridWidth: number, grid: Cell[][]): Cell {
    return grid[Math.floor(cellId / gridWidth)][cellId % gridWidth];
  }
}
