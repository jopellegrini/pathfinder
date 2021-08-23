import { Cell } from "../cell/Cell";
import { GridComponent } from "../grid/grid.component";
import { AlgorithmUtils } from "./algorithms-utils";
import { Utils } from "../utils/utils";

export class AStar {
  dist: number[] = [];

  AStar(grid: GridComponent): Cell[] {
    this.dist = new Array(grid.getGridWidth() * grid.getGridHeight()).fill(
      Infinity
    );

    let visited: boolean[] = new Array(
      grid.getGridWidth() * grid.getGridHeight()
    ).fill(false);

    let father: number[] = new Array(
      grid.getGridWidth() * grid.getGridHeight()
    ).fill(-1);

    this.dist[grid.getStart()] =
      0 +
      this.getHeuristic(grid.getStart(), grid.getEnd(), grid.getGridWidth());

    for (let i = 0; i < this.dist.length; i++) {
      let closest = this.minDist(visited, grid.getGridWidth());

      visited[closest] = true;

      let currentCell: Cell = Utils.getCellFromId(
        closest,
        grid.getGridWidth(),
        grid.getGrid()
      );

      if (
        grid.showsExplored() &&
        !currentCell.isStart &&
        !currentCell.isEnd &&
        !currentCell.isWall
      ) {
        grid.addExploredCell(currentCell);
      }

      let neighbours = grid.getCellNeighboursDetailed(
        currentCell,
        grid.allowsDiagonal()
      );

      for (let n of neighbours) {
        let [neighbour, isNeighbourDiagonal] = n;

        let cost: number = 1;

        if (grid.allowsDiagonal()) {
          if (isNeighbourDiagonal) cost = 1.1;
        }

        if (
          !visited[neighbour.id] &&
          this.dist[neighbour.id] >
            this.dist[closest] +
              cost +
              this.getHeuristic(neighbour.id, closest, grid.getGridWidth())
        ) {
          this.dist[neighbour.id] =
            this.dist[closest] +
            cost +
            this.getHeuristic(neighbour.id, closest, grid.getGridWidth());
          father[neighbour.id] = closest;
        }
      }
    }

    return AlgorithmUtils.backtrackPath(father, grid);
  }

  minDist(visited: boolean[], gridWidth: number): number {
    let min = Infinity;
    let minIndex = 0;

    for (let i = 0; i < this.dist.length; i++) {
      if (
        this.dist[i] + this.getHeuristic(i, minIndex, gridWidth) < min &&
        !visited[i]
      ) {
        min = this.dist[i] + this.getHeuristic(i, minIndex, gridWidth);
        minIndex = i;
      }
    }
    return minIndex;
  }

  getHeuristic(
    currentCell: number,
    endCell: number,
    gridWidth: number
  ): number {
    let horizontal = Math.abs(
      Math.floor(currentCell / gridWidth) - Math.floor(endCell / gridWidth)
    );
    let vertical = Math.abs((currentCell % gridWidth) - (endCell % gridWidth));

    return horizontal + vertical;
  }
}
