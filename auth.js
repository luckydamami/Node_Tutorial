const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const personModel = require("./models/person");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await personModel.findOne({ username });
      if (!user) return done(null, false, { message: "User Not Found" });
      //const isMatchPassword = user.password === password ? true : false;
      const isMatchPassword = user.comparePassword(password);

      if (isMatchPassword) return done(null, user);
      else return done(null, false, { message: "Incorrect User Password!" });
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
