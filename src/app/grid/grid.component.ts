import { Component, OnInit } from "@angular/core";
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

  isClicking: boolean = false;
  isBuilding: boolean = true;

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

  getCellNeighbours(cell: Cell, diagonal: boolean): Cell[] {
    let result: Cell[] = [];

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
