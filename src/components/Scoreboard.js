import axios from "axios";
import { React, useEffect, useState } from "react";

const randomNames = ["Favour", "Kelly", "Joshua", "Charis", "Bella", "Manuel"];

const Scoreboard = ({ score }) => {
  const [gameStates, setGameStates] = useState(null);
  const [username, setUsername] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    const data = Object.keys(response.data.data).map(
      (item) => response.data.data[item]
    );
    setGameStates(data);
  };

  const saveScore = async () => {
    const data = { username, score };

    axios
      .post("http://localhost:8000/addScore", data)
      .then((res) => console.log(res.data))
      .then(fetchData)
      .catch((err) => console.log(err));

    window.location.reload(false);
  };

  useEffect(() => {
    fetchData();
    setUsername(randomNames[Math.floor(Math.random() * randomNames.length)]);
  }, []);

  const descendingGameStates = gameStates?.sort((a, b) => b.score - a.score);

  return (
    <div className="score-board">
      <h2>
        {username}: {score}
      </h2>
      <h2>High Scores:</h2>
      {descendingGameStates?.map((gameState, index) => (
        <div key={index}>
          <h3>
            {gameState.username}: {gameState.score}
          </h3>
        </div>
      ))}
      <button onClick={saveScore}>Save Score</button>
    </div>
  );
};

export default Scoreboard;
