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

    expect(neighbours[0].id).toEqual(45);
    expect(neighbours[1].id).toEqual(1);
  });

  it("gives correct neighbours for top right cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[0][44],
      true
    );

    expect(neighbours[0].id).toEqual(89);
    expect(neighbours[1].id).toEqual(43);
  });

  it("gives correct neighbours for bottom left cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][0],
      true
    );

    expect(neighbours[0].id).toEqual(1260);
    expect(neighbours[1].id).toEqual(1306);
  });

  it("gives correct neighbours for bottom right cell non diagonal", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[29][44],
      true
    );

    expect(neighbours[0].id).toEqual(1304);
    expect(neighbours[1].id).toEqual(1348);
  });

  it("gives correct neighbours for random middle cell", function () {
    let neighbours: Cell[] = grid.getCellNeighbours(
      grid.getGrid()[10][7],
      true
    );

    expect(neighbours[0].id).toEqual(412);
    expect(neighbours[1].id).toEqual(502);
    expect(neighbours[2].id).toEqual(456);
    expect(neighbours[3].id).toEqual(458);
  });
});
