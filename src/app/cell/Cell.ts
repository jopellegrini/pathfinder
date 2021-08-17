export interface Cell {
  id: number;
  x: number;
  y: number;

  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
}
