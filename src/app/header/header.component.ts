import { Component, OnInit } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  @Output() clickedOnClearEvent = new EventEmitter<string>();
  @Output() runEvent = new EventEmitter<string>();

  ngOnInit(): void {}

  emitClearWalls() {
    this.clickedOnClearEvent.emit();
  }

  emitRun() {
    this.runEvent.emit();
  }
}
