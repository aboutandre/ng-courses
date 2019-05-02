// server.js
const express = require('express');
const app = express();
const port = 3000;
// Our courses which will be queried by their index
const courses = [
  {
    "id": 1,
    "code": "adv-maths",
    "name": "Advanced Mathematics",
    "created": "2018-08-14T12:09:45",
  },
  {
    "id": 2,
    "code": "cs1",
    "name": "Computer Science I",
    "created": "2018-06-12T18:34:16",
  },
]

// Allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/courses", (req, res) => {
  return res.json(courses);
});

app.get("/user/:id", (req, res) => {
  // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
  const idx = req.params.id - 1;

  if (!courses[idx]) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(courses[idx]);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
