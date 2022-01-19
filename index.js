require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8000;
const url = process.env.URL;

app.get("/", (req, res) => {
  res.json("Working...");
});

app.get("/scores", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.ASTRA_TOKEN,
    },
  };

  axios(`${url}?page-size=20`, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.post("/addScore", (req, res) => {
  const data = req.body;
  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token":
        "AstraCS:YrZsylCTRzhCGUagbBkXfJEK:6b4fce3cd12cef09dc202945fc4e75136462b9818dee0b558d2c8e19e63d71b9",
      "Content-Type": "application/json",
    },
    data,
  };

  axios(url, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.listen(PORT, (err) => {
  if (err) return console.log("Error Occured in starting the server");

  console.log(`Server running on PORT ${PORT}`);
});
