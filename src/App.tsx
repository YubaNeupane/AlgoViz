import { MouseEventHandler, useEffect, useState } from "react";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./App.css";
import "./main.css";
import Menu from "./components/Menu";
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
    useState<BoardState | null>(null);

  const [startPosition, setStartPosition] = useState<Position | null>(null);
  const [endPosition, setEndpoistion] = useState<Position | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleClick = (controlKeyPressed: boolean, item: Path) => {
    const c = [...grid];
    const value = c[item.position.x][item.position.y].value;

    if (controlKeyPressed) {
      c[item.position.x][item.position.y].value = 2;
      setStartPosition(item.position);
    } else {
      c[item.position.x][item.position.y].value = BoardState.Obstacle;
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
          const paths: Path[] = factory.getAlgorithm("random")?.solve(grid);
          showAnimation(paths);
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
            onChange={({ value }) => console.log(value)}
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
