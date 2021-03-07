// https://github.com/mikenicholson/passport-jwt
const { ExtractJwt, Strategy } = require("passport-jwt");

// Secrets
const keys = require("../../.env/keys");

const User = require("../models/User");
// const mongoose = require("mongoose");
// const User = mongoose.model("users");

const jwtOptions = {
  secretOrKey: keys.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

console.log(
  "ExtractJwt.fromAuthHeaderAsBearerToken(): ",
  ExtractJwt.fromAuthHeaderAsBearerToken()
);

module.exports = (passport) => {
  passport.use(
    new Strategy(jwtOptions, async (jwt_payload, done) => {
      const { err, user } = await User.findById(jwt_payload.id);

      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
