const express = require("express");
const bodyParser = require("body-parser");

const dbConnection = require("./db2");
const personRouter = require("./routes/personRoutes");
const menueRouter = require("./routes/menueRoutes");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Everyone! welcome to my restaurent.");
});

app.use("/person", personRouter);
app.use("/menue", menueRouter);

app.listen(3000, (error) => {
  error
    ? console.log("Oops! Something went wrong!")
    : console.log("listening on port http://localhost:3000");
});
