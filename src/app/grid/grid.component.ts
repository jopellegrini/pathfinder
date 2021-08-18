import { Component, OnInit, Input } from "@angular/core";
import { Cell } from "../cell/Cell";
import { Algorithm } from "../algorithms/AlgorithmsEnum";
import { BFS } from "../algorithms/BFS";
import { Utils } from "../utils/utils";

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
  private allowDiagonal: boolean = false;

  private animateDelay: number = 7;

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

  getStartY(): number {
    return this.startY;
  }

  getStartX(): number {
    return this.startX;
  }

  getStart(): number {
    return this.start;
  }

  getEnd(): number {
    return this.end;
  }

  /**
   * @param {Algorithm} algorithm - The algorithm to use for pathfinding
   * Finds and renders path between start and end cells
   */
  findPath(algorithm: Algorithm): void {
    this.clearPath(); // Remove existing path

    // alert("Finding path with " + algorithm);
    if (algorithm == Algorithm.BFS) {
      let res = BFS.BFS(this, this.allowDiagonal);
      this.showPath(res);
    }
  }

  /**
   * @param {Cell[]} path - An array containing path cells
   * Marks all cells on the path as path cells
   */
  showPath(path: Cell[]): void {
    if (path.length == 0) alert("No path could be found");

    for (let i = 0; i < path.length; i++) {
      setTimeout(function () {
        if (!path[i].isStart) path[i].isPath = true;
      }, i * this.animateDelay);
    }
  }

  /**
   * Removes all walls from grid
   */
  clearWalls(): void {
    this.grid.forEach((row) => row.forEach((cell) => (cell.isWall = false)));
  }

  /**
   * Removes path from grid
   */
  clearPath(): void {
    this.grid.forEach((row) => row.forEach((cell) => (cell.isPath = false)));
  }

  /**
   * Sets allowDiagonal property
   */
  switchDiag(allowDiagonal: boolean): void {
    this.allowDiagonal = allowDiagonal;
  }

  /**
   * Randomly places walls on the grid
   */
  generateRandomMaze(): void {
    this.clearPath();
    this.clearWalls();

    this.grid.forEach((row) =>
      row.forEach(function (cell) {
        if (cell.isStart || cell.isEnd) return;

        if (Utils.getRandomInt(0, 5) == 4) {
          cell.isWall = true;
        }
      })
    );
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
    this.isClicking = true;

    if (cell.isWall) this.isBuilding = false;
    else {
      this.isBuilding = true;
      this.clearPath();
    }

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
