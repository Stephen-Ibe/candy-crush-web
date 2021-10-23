import { useState, useEffect } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

function App() {
  const [currColorArrangement, setCurrColorArrangement] = useState([]);

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }

    setCurrColorArrangement(randomColorArrangement);
  };

  const checkForThreeColumn = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currColorArrangement[i];

      if (
        columnOfThree.every(
          (square) => currColorArrangement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => (currColorArrangement[square] = ""));
      }
    }
  };

  const checkForFourColumn = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currColorArrangement[i];

      if (
        columnOfFour.every(
          (square) => currColorArrangement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach((square) => (currColorArrangement[square] = ""));
      }
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForFourColumn();
      checkForThreeColumn();
      setCurrColorArrangement([...currColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkForFourColumn, checkForThreeColumn, currColorArrangement]);

  console.log(currColorArrangement);

  return (
    <div className="app">
      <div className="game__board">
        {currColorArrangement.length !== 0 &&
          currColorArrangement.map((candyColor, i) => (
            <img
              key={i}
              style={{ backgroundColor: candyColor }}
              // alt={candyColor}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
