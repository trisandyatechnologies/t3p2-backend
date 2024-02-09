const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3003;

const db = {
  posts: [],
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/countries", async (req, res) => {
  const countries = await fetch(
    `https://countriesnow.space/api/v0.1/countries`
  ).then((res) => res.json());
  res.json(countries);
});

app.get("/countries/:countryId/states", async (req, res) => {
  const states = await fetch(
    `https://countriesnow.space/api/v0.1/countries/states/q?country=${req.params.countryId}`
  ).then((res) => res.json());
  res.json(states);
});

app.get("/countries/:countryId/states/:stateId/cities", async (req, res) => {
  const cities = await fetch(
    `https://countriesnow.space/api/v0.1/countries/state/cities/q?country=${req.params.countryId}&state=${req.params.stateId}`
  ).then((res) => res.json());
  res.json(cities);
});

app.post("/instagram/posts", async (req, res) => {
  const newPost = req.body;
  newPost.id = Math.random() * 1000000;
  console.log(req.body);
  db.posts.push(newPost);
  res.json(newPost);
});

app.get("/instagram/posts", async (req, res) => {
  res.json(db.posts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
