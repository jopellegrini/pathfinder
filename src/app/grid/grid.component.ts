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

  private gridWidth: number = 45;
  private gridHeight: number = 30;
  private grid: Cell[][] = [];

  private startX: number = 4;
  private startY: number = 4;
  private start: number = 0;

  private endX: number = 25;
  private endY: number = 10;
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

  findPath(algorithm: Algorithm): void {
    alert("Finding path with " + algorithm);
  }

  BFS(): Cell[] {
    let result: Cell[] = [];
    let visited: boolean[] = new Array(this.gridWidth * this.gridHeight).fill(
      false
    );
    //let queue: Cell[] = [this.];

    return result;
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
   * @param {Cell} cell - The cell whose neighbours must be found
   * @param {boolean} diagonal - Whether the result must contain diagonal cells
   * @return {Cell[]} An array containing neighbours cells
   */
  getCellNeighbours(cell: Cell, diagonal: boolean): Cell[] {
    let result: Cell[] = [];

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

    if (cell.x > 0) result.push(this.grid[cell.y][cell.x - 1]); // Left cell

    if (cell.x < this.gridWidth - 2) result.push(this.grid[cell.y][cell.x + 1]); // Right cell

    return result;
  }

  onMouseDown(cell: Cell): void {
    this.isClicking = true;

    if (cell.isWall) this.isBuilding = false;
    else this.isBuilding = true;

    cell.isWall = !cell.isWall;
  }

  onMouseUp(): void {
    this.isClicking = false;
  }

  onMouseOverCell(cell: Cell): void {
    if (!this.isClicking) return;

    if (this.isBuilding) cell.isWall = true;
    else cell.isWall = false;
  }

  getTrackBy(index: any, cell: Cell) {
    return cell.id;
  }
}
