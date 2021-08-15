import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GridComponent } from "./grid.component";

import { Cell } from "../cell/Cell";

describe("GridComponent", () => {
  let grid: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    grid = fixture.componentInstance;
    fixture.detectChanges();

    grid.initGrid();
  });

  it("should create", () => {
    expect(grid).toBeTruthy();
  });

  it("matches objects with the expect key/value pairs", function () {
    expect(grid).toEqual(
      jasmine.objectContaining({
        gridWidth: 45,
      })
    );
  });

  it("gives correct neighbours for first cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(grid.getGrid()[0][0], true);

    expect(neighbours.some((e) => e.id == 45)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1)).toBeTruthy();
  });

  it("gives correct neighbours for top right cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[0][44],
      true
    );

    expect(neighbours.some((e) => e.id == 89)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 43)).toBeTruthy();
  });

  it("gives correct neighbours for bottom left cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][0],
      true
    );

    expect(neighbours.some((e) => e.id == 1260)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1306)).toBeTruthy();
  });

  it("gives correct neighbours for bottom right cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][44],
      true
    );

    expect(neighbours.some((e) => e.id == 1304)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1348)).toBeTruthy();
  });

  it("gives correct neighbours for random middle cell", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[10][7],
      true
    );

    expect(neighbours.some((e) => e.id == 412)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 502)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 456)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 458)).toBeTruthy();
  });
});
