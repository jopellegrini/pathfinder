import { Component, OnInit, Input } from "@angular/core";
import { Cell } from "../cell/Cell";
import { Algorithm } from "../algorithms/AlgorithmsEnum";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"],
})
export class GridComponent implements OnInit {
  constructor() {}

  private gridWidth: number = 45; //45
  private gridHeight: number = 30; //30
  private grid: Cell[][] = [];

  private startX: number = 1;
  private startY: number = 1;
  private start: number = 0;

  private endX: number = 25; //25
  private endY: number = 10; //10
  private end: number = 0;

  private isClicking: boolean = false;
  private isBuilding: boolean = true;

  ngOnInit(): void {
    this.initGrid();
  }

  /**
   * Fills grid with cells
   */
  initGrid(): void {
    for (let i = 0; i < this.gridHeight; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < this.gridWidth; j++) {
        let cell: Cell = {
          id: this.gridWidth * i + j,
          x: j,
          y: i,
          isStart: false,
          isEnd: false,
          isWall: false,
          isPath: false,
        };
        row.push(cell);
      }
      this.grid.push(row);
    }

    this.grid[this.startY][this.startX].isStart = true;
    this.start = this.startY * this.gridWidth + this.startX;

    this.grid[this.endY][this.endX].isEnd = true;
    this.end = this.endY * this.gridWidth + this.endX;
  }

  getGrid(): Cell[][] {
    return this.grid;
  }

  getGridWidth(): number {
    return this.gridWidth;
  }

  getGridHeight(): number {
    return this.gridHeight;
  }

  /**
   * @param {Algorithm} algorithm - The algorithm to use for pathfinding
   * Finds and renders path between start and end cells
   */
  findPath(algorithm: Algorithm): void {
    //this.grid.forEach((row) => row.forEach((cell) => (cell.isPath = false))); // Remove existing path
    this.clearPath();

    // alert("Finding path with " + algorithm);
    if (algorithm == Algorithm.BFS) {
      let res = this.BFS(false);
      this.showPath(res);
    }
  }

  /**
   * @param {boolean} diagonal - Whether diagonal connexions between cells must be allowed
   * @return {Cell[]} An array containing path cells
   */
  BFS(diagonal: boolean): Cell[] {
    let result: Cell[] = [];
    let visited: boolean[] = new Array(this.gridWidth * this.gridHeight).fill(
      false
    );

    let queue: Cell[] = [];

    let startCell: Cell = this.grid[this.startY][this.startX];

    queue.push(startCell);

    visited[this.start] = true;

    let father: number[] = new Array(this.gridWidth * this.gridHeight).fill(-1);

    while (queue.length) {
      let currentCell: Cell | undefined = queue.pop();

      if (currentCell === undefined) break;

      if (currentCell.isWall) continue;

      let neighbours: Cell[] = this.getCellNeighbours(currentCell, diagonal);

      for (let neighbour of neighbours) {
        if (!visited[neighbour.id]) {
          visited[neighbour.id] = true;

          father[neighbour.id] = currentCell.id;

          if (neighbour.id == this.end) {
            return this.backtrackBFS(father);
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
  backtrackBFS(father: number[]): Cell[] {
    let path: Cell[] = [];
    let currentCell = this.end;
    while (currentCell != this.start && father[currentCell] != -1) {
      currentCell = father[currentCell];

      path.push(
        this.grid[Math.ceil(currentCell / this.gridWidth) - 1][
          currentCell % this.gridWidth
        ]
      );
    }
    return path;
  }

  /**
   * @param {Cell[]} path - An array containing path cells
   * Marks all cells on the path as path cells
   */
  showPath(path: Cell[]): void {
    for (let cell of path) {
      if (!cell.isStart) cell.isPath = true;
    }
  }

  /**
   * Removes all walls from grid
   */
  clearWalls(): void {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        this.grid[i][j].isWall = false;
      }
    }
  }

  /**
   * Removes path from grid
   */
  clearPath(): void {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        this.grid[i][j].isPath = false;
      }
    }
  }

  /**
   * @param {Cell} cell - The cell whose neighbours must be found
   * @param {boolean} diagonal - Whether the result must contain diagonal cells
   * @return {Cell[]} An array containing neighbours cells
   */
  getCellNeighbours(cell: Cell, diagonal: boolean): Cell[] {
    let result: Cell[] = [];

    if (cell.x > 0) result.push(this.grid[cell.y][cell.x - 1]); // Left cell

    if (cell.x < this.gridWidth - 1) result.push(this.grid[cell.y][cell.x + 1]); // Right cell

    if (cell.y > 0) {
      result.push(this.grid[cell.y - 1][cell.x]); // Top cell

      if (diagonal) {
        if (cell.x > 0) result.push(this.grid[cell.y - 1][cell.x - 1]); // Top left
        if (cell.x < this.gridWidth - 2)
          result.push(this.grid[cell.y - 1][cell.x + 1]); // Top right
      }
    }

    if (cell.y < this.gridHeight - 1) {
      result.push(this.grid[cell.y + 1][cell.x]); // Bottom cell

      if (diagonal) {
        if (cell.x > 0) result.push(this.grid[cell.y + 1][cell.x - 1]); // Bottom left
        if (cell.x < this.gridWidth - 2)
          result.push(this.grid[cell.y + 1][cell.x + 1]); // Bottom right
      }
    }

    return result;
  }

  onMouseDown(cell: Cell): void {
    console.log(cell.id);

    this.isClicking = true;

    if (cell.isWall) this.isBuilding = false;
    else this.isBuilding = true;

    if (!cell.isStart && !cell.isEnd) cell.isWall = !cell.isWall;
  }

  onMouseUp(): void {
    this.isClicking = false;
  }

  onMouseOverCell(cell: Cell): void {
    if (!this.isClicking || cell.isStart || cell.isEnd) return;

    if (this.isBuilding) cell.isWall = true;
    else cell.isWall = false;
  }

  getTrackBy(index: any, cell: Cell) {
    return cell.id;
  }
}
