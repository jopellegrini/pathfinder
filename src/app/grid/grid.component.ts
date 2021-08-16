import { Component, OnInit, Input } from "@angular/core";
import { Cell } from "../cell/Cell";

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

  private isClicking: boolean = false;
  private isBuilding: boolean = true;

  ngOnInit(): void {
    this.initGrid();
  }

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

    this.grid[4][4].isStart = true;
    this.grid[10][25].isEnd = true;
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

  clearWalls(): void {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        this.grid[i][j].isWall = false;
      }
    }
  }

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
