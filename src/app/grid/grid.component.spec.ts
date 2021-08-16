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
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[0][0],
      false
    );

    expect(neighbours.some((e) => e.id == 45)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1)).toBeTruthy();
  });

  it("gives correct neighbours for top right cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[0][44],
      false
    );

    expect(neighbours.some((e) => e.id == 89)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 43)).toBeTruthy();
  });

  it("gives correct neighbours for bottom left cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][0],
      false
    );

    expect(neighbours.some((e) => e.id == 1260)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1306)).toBeTruthy();
  });

  it("gives correct neighbours for bottom right cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][44],
      false
    );

    expect(neighbours.some((e) => e.id == 1304)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1348)).toBeTruthy();
  });

  it("gives correct neighbours for random middle cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[10][7],
      false
    );

    expect(neighbours.some((e) => e.id == 412)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 502)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 456)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 458)).toBeTruthy();
  });

  it("gives correct neighbours for first cell diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(grid.getGrid()[0][0], true);

    expect(neighbours.some((e) => e.id == 45)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 46)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1)).toBeTruthy();
  });

  it("gives correct neighbours for top right cell diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[0][44],
      true
    );

    expect(neighbours.some((e) => e.id == 89)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 88)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 43)).toBeTruthy();
  });

  it("gives correct neighbours for bottom left cell diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][0],
      true
    );

    expect(neighbours.some((e) => e.id == 1260)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1261)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1306)).toBeTruthy();
  });

  it("gives correct neighbours for bottom right cell diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][44],
      true
    );

    expect(neighbours.some((e) => e.id == 1303)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1304)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 1348)).toBeTruthy();
  });

  it("gives correct neighbours for random middle cell diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[10][7],
      true
    );

    expect(neighbours.some((e) => e.id == 411)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 412)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 413)).toBeTruthy();

    expect(neighbours.some((e) => e.id == 456)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 458)).toBeTruthy();

    expect(neighbours.some((e) => e.id == 501)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 502)).toBeTruthy();
    expect(neighbours.some((e) => e.id == 503)).toBeTruthy();
  });

  it("correctly clears walls", function () {
    grid.getGrid()[10][7].isWall = true;
    grid.getGrid()[8][14].isWall = true;
    grid.getGrid()[2][11].isWall = true;
    grid.getGrid()[12][6].isWall = true;

    grid.clearWalls();

    expect(
      grid.getGrid().some((e) => e.some((elt) => elt.isWall == false) == false)
    ).toBeFalsy();
  });
});
