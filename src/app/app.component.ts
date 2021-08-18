import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "./grid/grid.component";
import { Algorithm } from "./algorithms/AlgorithmsEnum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "pathfinder";

  @ViewChild(GridComponent) grid!: GridComponent;

  findPath(algorithm: Algorithm): void {
    this.grid.findPath(algorithm);
  }

  clearWalls(): void {
    this.grid.clearWalls();
    this.grid.clearPath();
    this.grid.clearExplored();
  }

  generateRandomMaze(): void {
    this.grid.generateRandomMaze();
  }

  switchDiag(allowDiagonal: boolean): void {
    this.grid.switchDiag(allowDiagonal);
  }

  switchShowExplored(showExplored: boolean): void {
    this.grid.switchShowExplored(showExplored);
  }
}
