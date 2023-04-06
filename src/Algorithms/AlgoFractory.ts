import IAlgorithm from "./AlgoTypes";
import { BFS, Random } from "./Algorithm";

export default class AlgoFactory {
  getAlgorithm(name: string): IAlgorithm {
    switch (name) {
      case "BFS":
        return new BFS();
      case "random":
        return new Random();
      default:
        return new Random();
    }
  }
}
