//for Authentication and authorization logic
const Person = require("./models/person");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy(async function (USERNAME, password, done) {
    try {
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Invalid username!" });
      //const isMatchPassword = user.password === pwd ? true : false;
      const isMatchPassword = await user.comparePassword(password);
      if (isMatchPassword) return done(null, user);
      else return done(null, false, { message: "Invalid Password!" });
    } catch (error) {
      return done(error);
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
