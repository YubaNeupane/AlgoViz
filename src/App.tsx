import { MouseEventHandler, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import "./main.css";
import Menu from "./components/Menu";
import AlgoFactory from "./Algorithms/AlgoFractory";
import { Path, Position } from "./Algorithms/AlgoTypes";

const factory: AlgoFactory = new AlgoFactory();

function App() {
  const [grid, setGrid] = useState<Array<Array<Path>>>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClick = (item: Path, position: Position) => {
    const c = [...grid];
    const value = c[position.x][position.y].value;
    c[position.x][position.y].value = value == 1 ? 0 : 1;

    setGrid(c);
  };

  useEffect(() => {
    makeGrid(50, 50);

    const handleKeyPressed = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setShowMenu((showMenu) => !showMenu);
          console.log(showMenu);
          break;
      }
    };

    window.addEventListener("keyup", handleKeyPressed);

    return function cleanup() {
      window.removeEventListener("keyup", handleKeyPressed);
    };
  }, []);

  const makeGrid = (width: number, height: number) => {
    const tempGrid: Array<Array<Path>> = [];

    for (let i = 0; i < height; i++) {
      const row: Array<Path> = [];
      for (let j = 0; j < width; j++) {
        const block: Path = { value: 0, position: { x: i, y: j } };

        row.push(block);
      }
      tempGrid.push(row);
    }
    setGrid(tempGrid);
    // factory.getAlgorithm("BFS")?.solve();
  };

  return (
    <div>
      {showMenu ? (
        <div className="sticky">
          <Menu />
        </div>
      ) : (
        <></>
      )}

      <div style={{ position: "relative", top: 0, left: 0 }}>
        {grid?.map((row, i) => (
          <div style={{ display: "flex", gap: 3 }} key={i}>
            {row.map((item, j) => (
              <div
                className={`box ${item.value === 1 ? "active" : ""}`}
                onClick={(e) => handleClick(item, { x: i, y: j })}
                key={`${i},${j}`}
              >
                {/* <span style={{ color: "black" }}>{`(${j}, ${i}) `}</span> */}
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
