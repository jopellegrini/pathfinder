import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AStar } from "./astar";

describe("Algorithms", () => {
  let astar: AStar;

  beforeEach(() => {
    astar = new AStar();
  });

  it("should give correct distance heuristics", () => {
    expect(astar.getHeuristic(376, 286, 45)).toEqual(2);
    expect(astar.getHeuristic(0, 135, 45)).toEqual(3);
    expect(astar.getHeuristic(55, 419, 45)).toEqual(12);
    expect(astar.getHeuristic(1029, 634, 45)).toEqual(43);
    expect(astar.getHeuristic(1305, 1085, 45)).toEqual(10);
  });
});
