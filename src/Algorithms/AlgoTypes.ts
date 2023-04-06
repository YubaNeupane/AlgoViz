export interface Path {
  position: Position;
  value: number;
}

export interface Position {
  x: number;
  y: number;
}

interface IAlgorithm {
  solve(): Array<Path>;
}

export default IAlgorithm;
