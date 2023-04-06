import IAlgorithm, { Path } from "./AlgoTypes";

export class BFS implements IAlgorithm {
  solve(path: Array<Array<Path>>): Path[] {
    throw new Error("Method not implemented.");
  }
}

export class Random implements IAlgorithm {
  solve(path: Array<Array<Path>>): Path[] {
    const temp: Path[] = [];

    for (let i = 0; i < path.length; i++) {
      for (let j = 0; j < path[i].length; j++) {
        // temp.push({
        //   value: 1,
        //   position: {
        //     x: Math.floor(Math.random() * path.length),
        //     y: Math.floor(Math.random() * path[i].length),
        //   },
        // });

        temp.push({
          value: path[i][j].value == 1 ? 0 : 1,
          position: {
            x: i,
            y: j,
          },
        });
      }
    }
    return temp;
  }
}
