import axios from "axios";
import { React, useEffect, useState } from "react";

const Scoreboard = ({ score }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    setData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="score-board">
      <h2>{score}</h2>
    </div>
  );
};

export default Scoreboard;
