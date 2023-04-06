export interface Path {
  position: Position;
  value: number;
}

export interface Position {
  x: number;
  y: number;
}

interface IAlgorithm {
  solve(path: Array<Array<Path>>): Path[];
}

export default IAlgorithm;
