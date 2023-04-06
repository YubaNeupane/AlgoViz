import { Path, Position } from "../Algorithms/AlgoTypes";

export const makeGrid = (
  width: number = 100,
  height: number = 100
): Array<Array<Path>> => {
  const tempGrid: Array<Array<Path>> = [];

  for (let i = 0; i < height; i++) {
    const row: Array<Path> = [];
    for (let j = 0; j < width; j++) {
      const block: Path = { value: 0, position: { x: i, y: j } };
      row.push(block);
    }
    tempGrid.push(row);
  }
  return tempGrid;
};

export const clearAllTimeout = (timeouts: number[]): void => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
};
