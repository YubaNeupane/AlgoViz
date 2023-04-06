import { MouseEventHandler, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import "./main.css";
import Menu from "./components/Menu";
import AlgoFactory from "./Algorithms/AlgoFractory";
import { Path, Position } from "./Algorithms/AlgoTypes";
import { clearAllTimeout, makeGrid } from "./utils";

const factory: AlgoFactory = new AlgoFactory();

const timeoutIds: number[] = [];

const colorLoopUp: Map<number, string> = new Map<number, string>();

colorLoopUp.set(0, "white");
colorLoopUp.set(1, "yellow");
colorLoopUp.set(-1, "green");

function App() {
  const [grid, setGrid] = useState<Array<Array<Path>>>(makeGrid());
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleClick = (item: Path) => {
    const c = [...grid];
    const value = c[item.position.x][item.position.y].value;
    c[item.position.x][item.position.y].value = value == 1 ? 0 : 1;
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

        grid[previousNode.position.x][previousNode.position.y].value = -1;
        grid[pos.x][pos.y].value = path[i].value;
        setGrid([...grid]);
      }, i * 5);

      timeoutIds.push(timeout);
    }
    setIsRunning(true);
  };

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setShowMenu((showMenu) => !showMenu);
          break;
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
      {showMenu && (
        <div className="sticky">
          <Menu />
        </div>
      )}

      <div style={{ position: "relative", top: 0, left: 0 }}>
        {grid?.map((row, i) => (
          <div style={{ display: "flex", gap: 3 }} key={i}>
            {row.map((item, j) => (
              <div
                className={`box`}
                style={{ background: colorLoopUp.get(item.value) }}
                onClick={(e) => handleClick(item)}
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
