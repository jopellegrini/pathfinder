import { Component, OnInit } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { Algorithm } from "../algorithms/AlgorithmsEnum";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @Output() clickedOnClearEvent = new EventEmitter<string>();
  @Output() runEvent = new EventEmitter<Algorithm>();

  private algorithm: Algorithm = Algorithm.BFS;

  ngOnInit(): void {}

  emitClearWalls() {
    this.clickedOnClearEvent.emit();
  }

  emitRun() {
    this.runEvent.emit(this.algorithm);
  }

  changeAlgo(algo: string) {
    switch (algo) {
      case "BFS":
        this.algorithm = Algorithm.BFS;
        break;
      case "DFS":
        this.algorithm = Algorithm.DFS;
        break;
      case "Dijkstra":
        this.algorithm = Algorithm.Dijkstra;
        break;
      case "A*":
        this.algorithm = Algorithm.AStar;
        break;
      default:
        this.algorithm = Algorithm.BFS;
    }
  }
}
