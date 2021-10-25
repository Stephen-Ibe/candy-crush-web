import { useState, useEffect } from "react";
import BlueCandy from "./images/blue.png";
import GreenCandy from "./images/green.png";
import OrangeCandy from "./images/orange.png";
import PurpleCandy from "./images/purple.png";
import RedCandy from "./images/red.png";
import YellowCandy from "./images/yellow.png";
import blank from "./images/blank.png";

const width = 8;
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

function App() {
  const [currColorArrangement, setCurrColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  // Check for a Column of Four
  const checkForFourColumn = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currColorArrangement[i];
      const isBlank = currColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) => currColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForFourRow = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) => currColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForThreeColumn = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currColorArrangement[i];
      const isBlank = currColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) => currColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currColorArrangement[square] = blank)
        );
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
      const isBlank = currColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) => currColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((square) => (currColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currColorArrangement[i] = candyColors[randomNumber];
      }

      if (currColorArrangement[i + width] === blank) {
        currColorArrangement[i + width] = currColorArrangement[i];
        currColorArrangement[i] = blank;
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
      squareBeingDragged.getAttribute("src");
    currColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

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
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.style.backgroundColor;
      currColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.style.backgroundColor;
      setCurrColorArrangement([...currColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }

    setCurrColorArrangement(randomColorArrangement);
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
    moveIntoSquareBelow,
    currColorArrangement,
  ]);

  return (
    <div className="app">
      <div className="game__board">
        {currColorArrangement.length !== 0 &&
          currColorArrangement.map((candyColor, i) => (
            <img
              key={i}
              src={candyColor}
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
