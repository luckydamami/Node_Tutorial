const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const personRouter = require("./routes/personRoutes");
const menueRouter = require("./routes/menueRoutes");

const passport = require("./auth");

//for .env file configuration
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Everyone! welcome to my restaurent.");
});

app.use(passport.initialize());
app.use(
  "/person",
  passport.authenticate("local", { session: false }),
  personRouter
);
app.use("/menue", menueRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  error
    ? console.log("Oops! Something went wrong!")
    : console.log(`listening on port http://localhost:${PORT}`);
});
