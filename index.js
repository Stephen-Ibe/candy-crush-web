const express = require("express");
const axios = require("axios");
const app = express();

const PORT = 8000;
const url =
  "https://299393f4-948f-4977-a9bd-204af9457c56-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/highscores/collections/scores?page-size=20";

app.get("/", (req, res) => {
  res.json("Working...");
});

app.get("/scores", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token":
        "AstraCS:YrZsylCTRzhCGUagbBkXfJEK:6b4fce3cd12cef09dc202945fc4e75136462b9818dee0b558d2c8e19e63d71b9",
    },
  };

  axios(url, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.listen(PORT, (err) => {
  if (err) return console.log("Error Occured in starting the server");

  console.log(`Server running on PORT ${PORT}`);
});
