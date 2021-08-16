import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "./grid/grid.component";

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
  }
}
