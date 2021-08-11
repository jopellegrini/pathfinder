import { Component, OnInit } from "@angular/core";
import { Cell } from "../cell/Cell";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"],
})
export class GridComponent implements OnInit {
  constructor() {}

  gridWidth: number = 45;
  gridHeight: number = 30;
  grid: Cell[][] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.gridHeight; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < this.gridWidth; j++) {
        let cell: Cell = {
          id: this.gridWidth * i + j,
          x: j,
          y: i,
        };
        row.push(cell);
      }
      this.grid.push(row);
    }
  }
}
