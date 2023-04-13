import { BoardState } from "./DropdownValues";

const colorLoopUp: Map<BoardState, string> = new Map<BoardState, string>();

colorLoopUp.set(BoardState.Empty, "white");
colorLoopUp.set(BoardState.End, "green");
colorLoopUp.set(BoardState.Start, "blue");
colorLoopUp.set(BoardState.Looking, "yellow");
colorLoopUp.set(BoardState.LookedAt, "brown");
colorLoopUp.set(BoardState.Obstacle, "black");

export default colorLoopUp;
