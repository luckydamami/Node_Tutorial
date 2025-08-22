const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const personRouter = require("./routes/personRoutes");
const menueRouter = require("./routes/menueRoutes");
const Person = require("./models/person");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

app.use(
  new localStrategy(async (user, pswd, done) => {
    //authentication logic here
    try {
      const user = Person.findOne({ username: user });
      if (!user) return done(null, false, { message: "Incorrect username" });
      const isPasswordMatch = user.password === pswd ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {}
  })
);

app.get("/", (req, res) => {
  res.send("Hello Everyone! welcome to my restaurent.");
});

app.use("/person", personRouter);
app.use("/menue", menueRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  error
    ? console.log("Oops! Something went wrong!")
    : console.log(`listening on port http://localhost:${PORT}`);
});
