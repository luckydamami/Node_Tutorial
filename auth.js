//for Authentication and authorization logic
const Person = require("./models/person");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy(async (USERNAME, password, done) => {
    try {
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect username!" });
      //const isMatchPassword = user.password === pwd ? true : false;
      const isMatchPassword = user.comparePassword(password);
      if (isMatchPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid password!" });
      }
    } catch (error) {
      return done(null, error);
    }
  })
);

module.exports = passport;

/*const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} to request make ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);*/
