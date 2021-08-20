import { Cell } from "../cell/Cell";
import { GridComponent } from "../grid/grid.component";
import { Utils } from "../utils/utils";

export class AlgorithmUtils {
  /**
   * @param {number[]} father - An array of integers linking cells with their fathers
   * @return {Cell[]} An array containing path cells
   */
  static backtrackPath(father: number[], grid: GridComponent): Cell[] {
    let path: Cell[] = [];
    let currentCell = grid.getEnd();
    while (currentCell != grid.getStart() && father[currentCell] != -1) {
      currentCell = father[currentCell];

      path.push(
        Utils.getCellFromId(currentCell, grid.getGridWidth(), grid.getGrid())
      );
    }
    return path.reverse();
  }
}
