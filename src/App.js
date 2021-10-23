import { useState, useEffect } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

function App() {
  const [currColorArrangement, setCurrColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }

    setCurrColorArrangement(randomColorArrangement);
  };

  const checkForFourRow = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currColorArrangement[i];
      const notValid = [
        5,
        ,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
        62,
        63,
        64,
      ];

      if (notValid.includes(i)) continue;
      if (rowOfFour.every((s) => currColorArrangement[s] === decidedColor)) {
        rowOfFour.forEach((s) => (currColorArrangement[s] = ""));
        return true;
      }
    }
  };

  // Check for a Column of Four
  const checkForFourColumn = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currColorArrangement[i];

      if (columnOfFour.every((s) => currColorArrangement[s] === decidedColor)) {
        columnOfFour.forEach((s) => (currColorArrangement[s] = ""));
        return true;
      }
    }
  };

  const checkForThreeColumn = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currColorArrangement[i];

      if (
        columnOfThree.every((s) => currColorArrangement[s] === decidedColor)
      ) {
        columnOfThree.forEach((s) => (currColorArrangement[s] = ""));
        return true;
      }
    }
  };

  const checkForThreeRow = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (rowOfThree.every((s) => currColorArrangement[s] === decidedColor)) {
        rowOfThree.forEach((s) => (currColorArrangement[s] = ""));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currColorArrangement[i] === "") {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currColorArrangement[i] = candyColors[randomNumber];
      }

      if (currColorArrangement[i + width] === "") {
        currColorArrangement[i + width] = currColorArrangement[i];
        currColorArrangement[i] = "";
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.style.backgroundColor;
    currColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.style.backgroundColor;

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isColumnOfFour = checkForFourColumn();
    const isRowOfFour = checkForFourRow();
    const isColumnOfThree = checkForThreeColumn();
    const isRowOfThree = checkForThreeRow();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isRowOfThree || isRowOfFour || isColumnOfFour || isColumnOfThree)
    ) {
      setSquareBeingReplaced(null);
      setSquareBeingDragged(null);
    } else {
      currColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.style.backgroundColor;
      currColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.style.backgroundColor;
      setCurrColorArrangement([...currColorArrangement]);
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForFourColumn();
      checkForFourRow();
      checkForThreeColumn();
      checkForThreeRow();
      moveIntoSquareBelow();
      setCurrColorArrangement([...currColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForFourColumn,
    checkForFourRow,
    checkForThreeColumn,
    checkForThreeRow,
    checkForFourRow,
    currColorArrangement,
  ]);

  return (
    <div className="app">
      <div className="game__board">
        {currColorArrangement.length !== 0 &&
          currColorArrangement.map((candyColor, i) => (
            <img
              key={i}
              style={{ backgroundColor: candyColor }}
              alt={candyColor}
              data-id={i}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
