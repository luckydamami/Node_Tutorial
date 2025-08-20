const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Node js!");
});

app.post("/user", (req, res) => {
  res.send("Data is comming thru post method");
});

app.get("/user", (req, res) => {
  res.send("<h1>User : Lucky</h1>");
});

app.get("/user/:userId", (req, res) => {
  res.send(`userID : ${req.params.userId}`);
});

app.listen("3000", (err) => {
  !err
    ? console.log(`server on http://localhost:${3000}`)
    : console.log("Internal server error : ", err);
});
