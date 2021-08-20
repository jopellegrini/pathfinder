import { Cell } from "../cell/Cell";
import { GridComponent } from "../grid/grid.component";
import { AlgorithmUtils } from "./algorithms-utils";
import { Utils } from "../utils/utils";

export class Dijkstra {
  dist: number[] = [];

  Dijkstra(grid: GridComponent): Cell[] {
    this.dist = new Array(grid.getGridWidth() * grid.getGridHeight()).fill(
      Infinity
    );

    let visited: boolean[] = new Array(
      grid.getGridWidth() * grid.getGridHeight()
    ).fill(false);

    let father: number[] = new Array(
      grid.getGridWidth() * grid.getGridHeight()
    ).fill(-1);

    this.dist[grid.getStart()] = 0;

    for (let i = 0; i < this.dist.length; i++) {
      let closest = this.minDist(visited);

      visited[closest] = true;

      let currentCell: Cell = Utils.idToCoords(
        closest,
        grid.getGridWidth(),
        grid.getGrid()
      );

      if (grid.showsExplored() && !currentCell.isStart && !currentCell.isEnd) {
        grid.addExploredCell(currentCell);
      }

      let neighbours: Cell[] = grid.getCellNeighbours(
        currentCell,
        grid.allowsDiagonal()
      );

      for (let neighbour of neighbours) {
        if (
          !visited[neighbour.id] &&
          this.dist[neighbour.id] > this.dist[closest] + 1
        ) {
          this.dist[neighbour.id] = this.dist[closest] + 1;
          father[neighbour.id] = closest;
        }
      }
    }

    return AlgorithmUtils.backtrackPath(father, grid);
  }

  minDist(visited: boolean[]): number {
    let min = Infinity;
    let minIndex = 0;

    for (let i = 0; i < this.dist.length; i++) {
      if (this.dist[i] < min && !visited[i]) {
        min = this.dist[i];
        minIndex = i;
      }
    }
    return minIndex;
  }
}
