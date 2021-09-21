const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

const PORT = process.env.PORT || 4005;

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);
  events.push(event);
  res.sendStatus(201);
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
