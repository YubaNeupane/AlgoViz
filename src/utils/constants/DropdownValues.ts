import { ReactDropdownProps } from "react-dropdown";

export enum BoardState {
  Empty = -1,
  Start = 1,
  Obstacle = 2,
  End = 3,
  Looking = 4,
  LookedAt = 5,
}

export interface DropDownValue {
  value: BoardState;
  label: string;
}

export const PlacementDropdownValues: DropDownValue[] = [
  {
    value: BoardState.Start,
    label: "Start",
  },
  {
    value: BoardState.Obstacle,
    label: "Obstacle",
  },
  {
    value: BoardState.End,
    label: "End",
  },
];
