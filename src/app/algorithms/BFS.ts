import { Cell } from "../cell/Cell";
import { GridComponent } from "../grid/grid.component";
import { Utils } from "../utils/utils";

export class BFS {
  /**
   * @param {boolean} diagonal - Whether diagonal connexions between cells must be allowed
   * @return {Cell[]} An array containing path cells
   */
  static BFS(grid: GridComponent, diagonal: boolean): Cell[] {
    let result: Cell[] = [];
    let visited: boolean[] = new Array(
      grid.getGridWidth() * grid.getGridHeight()
    ).fill(false);

    let queue: Cell[] = [];

    let startCell: Cell = grid.getGrid()[grid.getStartY()][grid.getStartX()];

    queue.push(startCell);

    visited[grid.getStart()] = true;

    let father: number[] = new Array(
      grid.getGridWidth() * grid.getGridHeight()
    ).fill(-1);

    while (queue.length) {
      let currentCell: Cell | undefined = queue.pop();

      if (currentCell === undefined) break;

      if (currentCell.isWall) continue;

      let neighbours: Cell[] = grid.getCellNeighbours(currentCell, diagonal);

      for (let neighbour of neighbours) {
        if (!visited[neighbour.id]) {
          visited[neighbour.id] = true;

          father[neighbour.id] = currentCell.id;

          if (neighbour.id == grid.getEnd()) {
            return BFS.backtrackBFS(father, grid);
          }

          queue.unshift(neighbour);
        }
      }
    }

    return [];
  }

  /**
   * @param {number[]} father - An array of integers linking cells with their fathers
   * @return {Cell[]} An array containing path cells
   */
  static backtrackBFS(father: number[], grid: GridComponent): Cell[] {
    let path: Cell[] = [];
    let currentCell = grid.getEnd();
    while (currentCell != grid.getStart() && father[currentCell] != -1) {
      currentCell = father[currentCell];

      path.push(
        Utils.idToCoords(currentCell, grid.getGridWidth(), grid.getGrid())
      );
    }
    return path;
  }
}
