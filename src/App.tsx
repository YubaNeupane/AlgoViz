/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./App.css";
import "./main.css";
import AlgoFactory from "./Algorithms/AlgoFractory";
import { Path, Position } from "./Algorithms/AlgoTypes";
import { clearAllTimeout, makeGrid } from "./utils";
import colorLoopUp from "./utils/constants/ColorLookUp";
import {
  BoardState,
  PlacementDropdownValues,
} from "./utils/constants/DropdownValues";

const factory: AlgoFactory = new AlgoFactory();

const timeoutIds: number[] = [];

function App() {
  const [grid, setGrid] = useState<Array<Array<Path>>>(makeGrid());

  const [currentPlacementState, setCurrentPlacementState] =
    useState<BoardState | null>(BoardState.Start);

  const [startPosition, setStartPosition] = useState<Position | null>(null);
  const [endPosition, setEndpoistion] = useState<Position | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const isPostionEqual = (
    position: Position,
    compare: Position | null
  ): boolean => {
    if (compare === null) return false;
    return position.x === compare.x && position.y === compare.y;
  };

  const handleClick = (controlKeyPressed: boolean, item: Path) => {
    const c = [...grid];
    // const value = c[item.position.x][item.position.y].value;

    if (currentPlacementState === BoardState.Start) {
      if (startPosition) {
        c[startPosition.x][startPosition.y].value = BoardState.Empty;
        c[item.position.x][item.position.y].value = BoardState.Start;
        setStartPosition(item.position);
      } else {
        c[item.position.x][item.position.y].value = BoardState.Start;
        setStartPosition(item.position);
      }
    } else if (currentPlacementState === BoardState.End) {
      if (endPosition) {
        c[endPosition.x][endPosition.y].value = BoardState.Empty;
        c[item.position.x][item.position.y].value = BoardState.End;
        setEndpoistion(item.position);
      } else {
        c[item.position.x][item.position.y].value = BoardState.End;
        setEndpoistion(item.position);
      }
    } else if (currentPlacementState === BoardState.Obstacle) {
      if (
        !isPostionEqual(item.position, startPosition) &&
        !isPostionEqual(item.position, endPosition)
      ) {
        c[item.position.x][item.position.y].value = BoardState.Obstacle;
      }
    }

    setGrid(c);
  };

  const showAnimation = (path?: Path[]) => {
    clearAllTimeout(timeoutIds);

    if (isRunning) {
      setIsRunning((prev) => !prev);
      return;
    }

    if (path == undefined) return;

    for (let i = 1; i < path.length; i++) {
      const previousNode = path[i - 1];
      const timeout = setTimeout(() => {
        const pos = path[i].position;

        grid[previousNode.position.x][previousNode.position.y].value =
          BoardState.LookedAt;

        grid[pos.x][pos.y].value = path[i].value;
        setGrid([...grid]);
      }, i * 100);

      timeoutIds.push(timeout);
    }
    setIsRunning(true);
  };

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          showAnimation(factory.getAlgorithm("random")?.solve(grid));
          break;
        case "r":
        case "R":
          clearAllTimeout(timeoutIds);
          setGrid([...makeGrid()]);
          setIsRunning((prev) => !prev);

          break;
      }
    };

    window.addEventListener("keyup", handleKeyPressed);
    return function cleanup() {
      window.removeEventListener("keyup", handleKeyPressed);
    };
  }, [grid, isRunning]);

  return (
    <div>
      <div
        style={{
          marginBottom: 10,
          flexDirection: "row",
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 300 }}>
          <Dropdown
            options={PlacementDropdownValues}
            value={"Start"}
            onChange={({ label }) => {
              switch (label) {
                case "Obstacle":
                  setCurrentPlacementState(BoardState.Obstacle);
                  break;
                case "Start":
                  setCurrentPlacementState(BoardState.Start);
                  break;
                case "End":
                  setCurrentPlacementState(BoardState.End);
                  break;
                default:
                  setCurrentPlacementState(BoardState.Empty);
              }
            }}
            placeholder="Select placement"
          />
        </div>
        <div style={{ width: 300 }}>
          <Dropdown options={["sad"]} placeholder="Select an Algorithm" />
        </div>
      </div>

      <div style={{ position: "relative", top: 0, left: 0 }}>
        {grid?.map((row, i) => (
          <div style={{ display: "flex", gap: 3 }} key={i}>
            {row.map((item, j) => (
              <div
                className={`box`}
                style={{ background: colorLoopUp.get(item.value) }}
                onClick={(e) => handleClick(e.ctrlKey, item)}
                key={`${i},${j}`}
              >
                <span style={{ color: "black" }}>{`${item.value}`}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
