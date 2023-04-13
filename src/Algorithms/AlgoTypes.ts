import { BoardState } from "../utils/constants/DropdownValues";

export interface Path {
  position: Position;
  value: BoardState;
}

export interface Position {
  x: number;
  y: number;
}

interface IAlgorithm {
  solve(path: Array<Array<Path>>): Path[];
}

export default IAlgorithm;
