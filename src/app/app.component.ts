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

  clearWalls(): void {
    this.grid.clearWalls();
    this.grid.clearPath();
  }

  findPath(algorithm: Algorithm): void {
    this.grid.findPath(algorithm);
  }
}
