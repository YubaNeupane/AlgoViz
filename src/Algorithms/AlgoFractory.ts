import IAlgorithm from "./AlgoTypes";
import { BFS } from "./Algorithm";

export default class AlgoFactory {
  getAlgorithm(name: string): IAlgorithm | null {
    switch (name) {
      case "BFS":
        return new BFS();
      default:
        return null;
    }
    return new BFS();
  }
}
