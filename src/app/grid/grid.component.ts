import { Component, OnInit, Input } from "@angular/core";
import { Cell } from "../cell/Cell";
import { Algorithm } from "../algorithms/algorithms-enum";
import { BFS } from "../algorithms/BFS";
import { Dijkstra } from "../algorithms/dijkstra";
import { AStar } from "../algorithms/astar";
import { Utils } from "../utils/utils";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"],
})
export class GridComponent implements OnInit {
  constructor() {}

  private gridWidth: number = 45;
  private gridHeight: number = 30;
  private grid: Cell[][] = [];

  private startX: number = 1;
  private startY: number = 1;
  private start: number = 0;

  private endX: number = 25;
  private endY: number = 10;
  private end: number = 0;

  private isClicking: boolean = false;
  private isBuilding: boolean = true;
  private allowDiagonal: boolean = false;
  private showExplored: boolean = false;
  private isMovingStart: boolean = false;
  private isMovingEnd: boolean = false;
  private closedTip: boolean = true;

  private animateDelay: number = 7;
  private animateExploredDelay: number = 2;

  private exploredCells: Cell[] = [];

  ngOnInit(): void {
    this.initGrid();
  }

  /**
   * Fills grid with cells
   */
  initGrid(): void {
    for (let i = 0; i < this.gridHeight; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < this.gridWidth; j++) {
        let cell: Cell = {
          id: this.gridWidth * i + j,
          x: j,
          y: i,
          isStart: false,
          isEnd: false,
          isWall: false,
          isPath: false,
          wasExplored: false,
        };
        row.push(cell);
      }
      this.grid.push(row);
    }

    this.grid[this.startY][this.startX].isStart = true;
    this.start = this.startY * this.gridWidth + this.startX;

    this.grid[this.endY][this.endX].isEnd = true;
    this.end = this.endY * this.gridWidth + this.endX;
  }

  getGrid(): Cell[][] {
    return this.grid;
  }

  getGridWidth(): number {
    return this.gridWidth;
  }

  getGridHeight(): number {
    return this.gridHeight;
  }

  setGridWidth(width: number): void {
    this.gridWidth = width;
  }

  setGridHeight(height: number): void {
    this.gridHeight = height;
  }

  getStartY(): number {
    return this.startY;
  }

  getStartX(): number {
    return this.startX;
  }

  getStart(): number {
    return this.start;
  }

  getEnd(): number {
    return this.end;
  }

  isTipClosed(): boolean {
    return this.closedTip;
  }

  allowsDiagonal(): boolean {
    return this.allowDiagonal;
  }

  showsExplored(): boolean {
    return this.showExplored;
  }

  addExploredCell(cell: Cell): void {
    this.exploredCells.push(cell);
  }

  /**
   * @param {Algorithm} algorithm - The algorithm to use for pathfinding
   * Finds and renders path between start and end cells
   */
  findPath(algorithm: Algorithm): void {
    this.clearPath(); // Remove existing path
    this.clearExplored(); // Remove existing explored cells

    // alert("Finding path with " + algorithm);
    if (algorithm == Algorithm.BFS) {
      let bfs: BFS = new BFS();
      let res = bfs.BFS(this);
      this.showPath(res, this.exploredCells);
    } else if (algorithm == Algorithm.Dijkstra) {
      let dijkstra: Dijkstra = new Dijkstra();
      let res = dijkstra.Dijkstra(this);
      this.showPath(res, this.exploredCells);
    } else if (algorithm == Algorithm.AStar) {
      let astar: AStar = new AStar();
      let res = astar.AStar(this);
      this.showPath(res, this.exploredCells);
    }
  }

  /**
   * @param {Cell[]} path - An array containing path cells
   * Marks all cells on the path as path cells
   */
  showPath(path: Cell[], explored: Cell[]): void {
    if (path.length == 0) alert("No path could be found");

    let exploredCount: number = 0;

    for (; exploredCount < explored.length; exploredCount++) {
      let currentCell: Cell = explored[exploredCount];
      setTimeout(function () {
        currentCell.wasExplored = true;
      }, exploredCount * this.animateExploredDelay);
    }

    let totalExploredTime = this.animateExploredDelay * exploredCount;

    for (let j = 0; j < path.length; j++) {
      setTimeout(function () {
        if (!path[j].isStart) path[j].isPath = true;
      }, totalExploredTime + j * this.animateDelay);
    }
  }

  /**
   * Removes all walls from grid
   */
  clearWalls(): void {
    this.grid.forEach((row) => row.forEach((cell) => (cell.isWall = false)));
  }

  /**
   * Removes path from grid
   */
  clearPath(): void {
    this.grid.forEach((row) => row.forEach((cell) => (cell.isPath = false)));
  }

  /**
   * Removes explored cells from grid
   */
  clearExplored(): void {
    this.exploredCells = [];
    this.grid.forEach((row) =>
      row.forEach((cell) => (cell.wasExplored = false))
    );
  }

  /**
   * Sets allowDiagonal property
   */
  switchDiag(allowDiagonal: boolean): void {
    this.allowDiagonal = allowDiagonal;
  }

  /**
   * Sets allowDiagonal property
   */
  switchShowExplored(showExplored: boolean): void {
    this.showExplored = showExplored;
  }

  /**
   * Close tip popup
   */
  closeTipPopup(): void {
    this.closedTip = true;
  }

  /**
   * Randomly places walls on the grid
   */
  generateRandomMaze(): void {
    this.clearPath();
    this.clearWalls();
    this.clearExplored();

    this.grid.forEach((row) =>
      row.forEach(function (cell) {
        if (cell.isStart || cell.isEnd) return;

        if (Utils.getRandomInt(0, 5) == 4) {
          cell.isWall = true;
        }
      })
    );
  }

  /**
   * Begin moving start cell
   */
  moveStart(): void {
    this.closedTip = false;
    this.isMovingStart = true;
    this.clearPath();
    this.clearWalls();
    this.clearExplored();
  }

  /**
   * Begin moving end cell
   */
  moveEnd(): void {
    this.closedTip = false;
    this.isMovingEnd = true;
    this.clearPath();
    this.clearWalls();
    this.clearExplored();
  }

  /**
   * @param {Cell} cell - The cell whose neighbours must be found
   * @param {boolean} diagonal - Whether the result must contain diagonal cells
   * @return {Cell[]} An array containing neighbours cells
   */
  getCellNeighbours(cell: Cell, diagonal: boolean): Cell[] {
    let result: Cell[] = [];

    if (cell.x > 0 && !this.grid[cell.y][cell.x - 1].isWall)
      result.push(this.grid[cell.y][cell.x - 1]); // Left cell

    if (cell.x < this.gridWidth - 1 && !this.grid[cell.y][cell.x + 1].isWall)
      result.push(this.grid[cell.y][cell.x + 1]); // Right cell

    if (cell.y > 0 && !this.grid[cell.y - 1][cell.x].isWall) {
      result.push(this.grid[cell.y - 1][cell.x]); // Top cell

      if (diagonal) {
        if (cell.x > 0 && !this.grid[cell.y - 1][cell.x - 1].isWall)
          result.push(this.grid[cell.y - 1][cell.x - 1]); // Top left

        if (
          cell.x < this.gridWidth - 1 &&
          !this.grid[cell.y - 1][cell.x + 1].isWall
        )
          result.push(this.grid[cell.y - 1][cell.x + 1]); // Top right
      }
    }

    if (cell.y < this.gridHeight - 1 && !this.grid[cell.y + 1][cell.x].isWall) {
      result.push(this.grid[cell.y + 1][cell.x]); // Bottom cell

      if (diagonal) {
        if (cell.x > 0 && !this.grid[cell.y + 1][cell.x - 1].isWall)
          result.push(this.grid[cell.y + 1][cell.x - 1]); // Bottom left

        if (
          cell.x < this.gridWidth - 1 &&
          !this.grid[cell.y + 1][cell.x + 1].isWall
        )
          result.push(this.grid[cell.y + 1][cell.x + 1]); // Bottom right
      }
    }

    return result;
  }

  /**
   * @param {Cell} cell - The cell whose neighbours must be found
   * @param {boolean} diagonal - Whether the result must contain diagonal cells
   * @return {Cell[]} An array of tuples containing neighbours cells and whether they are diagonal
   */
  getCellNeighboursDetailed(cell: Cell, diagonal: boolean): [Cell, boolean][] {
    let result: [Cell, boolean][] = [];

    if (cell.x > 0 && !this.grid[cell.y][cell.x - 1].isWall)
      result.push([this.grid[cell.y][cell.x - 1], false]); // Left cell

    if (cell.x < this.gridWidth - 1 && !this.grid[cell.y][cell.x + 1].isWall)
      result.push([this.grid[cell.y][cell.x + 1], false]); // Right cell

    if (cell.y > 0 && !this.grid[cell.y - 1][cell.x].isWall) {
      result.push([this.grid[cell.y - 1][cell.x], false]); // Top cell

      if (diagonal) {
        if (cell.x > 0 && !this.grid[cell.y - 1][cell.x - 1].isWall)
          result.push([this.grid[cell.y - 1][cell.x - 1], true]); // Top left

        if (
          cell.x < this.gridWidth - 1 &&
          !this.grid[cell.y - 1][cell.x + 1].isWall
        )
          result.push([this.grid[cell.y - 1][cell.x + 1], true]); // Top right
      }
    }

    if (cell.y < this.gridHeight - 1 && !this.grid[cell.y + 1][cell.x].isWall) {
      result.push([this.grid[cell.y + 1][cell.x], false]); // Bottom cell

      if (diagonal) {
        if (cell.x > 0 && !this.grid[cell.y + 1][cell.x - 1].isWall)
          result.push([this.grid[cell.y + 1][cell.x - 1], true]); // Bottom left

        if (
          cell.x < this.gridWidth - 1 &&
          !this.grid[cell.y + 1][cell.x + 1].isWall
        )
          result.push([this.grid[cell.y + 1][cell.x + 1], true]); // Bottom right
      }
    }

    return result;
  }

  onMouseDown(cell: Cell): void {
    this.isClicking = true;

    if (this.isMovingStart) {
      this.setStart(cell);
      this.closedTip = true;
      this.isMovingStart = false;
    } else if (this.isMovingEnd) {
      this.setEnd(cell);
      this.closedTip = true;
      this.isMovingEnd = false;
    }

    if (cell.isWall) this.isBuilding = false;
    else {
      this.isBuilding = true;
      this.clearPath();
      this.clearExplored();
    }

    if (!cell.isStart && !cell.isEnd) cell.isWall = !cell.isWall;
  }

  onMouseUp(): void {
    this.isClicking = false;
  }

  onMouseOverCell(cell: Cell): void {
    if (this.isMovingStart) this.setStart(cell);
    else if (this.isMovingEnd) this.setEnd(cell);

    if (!this.isClicking || cell.isStart || cell.isEnd) return;

    if (this.isBuilding) cell.isWall = true;
    else cell.isWall = false;
  }

  getTrackBy(index: any, cell: Cell) {
    return cell.id;
  }

  /**
   * Set grid start cell
   */
  setStart(newStart: Cell): void {
    newStart.isStart = true;
    this.grid[this.startY][this.startX].isStart = false;
    Utils.getCellFromId(newStart.id, this.gridWidth, this.grid).isStart = true;
    this.start = newStart.id;
    this.startX = newStart.x;
    this.startY = newStart.y;
  }

  /**
   * Set grid end cell
   */
  setEnd(newEnd: Cell): void {
    newEnd.isEnd = true;
    this.grid[this.endY][this.endX].isEnd = false;
    Utils.getCellFromId(newEnd.id, this.gridWidth, this.grid).isEnd = true;
    this.end = newEnd.id;
    this.endX = newEnd.x;
    this.endY = newEnd.y;
  }
}
