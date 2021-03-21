// https://github.com/mikenicholson/passport-jwt
// TODO: FIND A SOLUTION FOR AUTHENTICATION WITH JWT AND SECRET TOKEN
// TODO: SEND REQUEST WITH AUTHORIZATION HEADER FROM CLIENT
// ? HOW TO SEPARATE SECRET TOKEN WITH JWT TOKEN IN AUTHORIZATION HEADER

const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
// Secrets
const keys = require("../../.env/keys");
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");

const jwtOptions = {
  issuer: "Son Nguyen",
  secretOrKey: keys.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

// ! CURRENT FRONT END DON'T HAVE `AUTHORIZATION` HEADER SO THIS FUNCTION WON'T BE CALLED
const verifyCallback = async (_req, payload, done) => {
  try {
    // BAH - This is what is actually getting stored in the context as the currentUser
    const user = await User.findById(payload._id);
    return user ? done(null, user) : done(null, null);
  } catch (err) {
    return done(err);
  }
};

const jwtStrategy = new Strategy(jwtOptions, verifyCallback);

// Have to define the strategy before initialize
passport.use(jwtStrategy);
passport.initialize();

// returns a function(err,user,info)
// doing it this way to aid unit testing
const getAuthenticationCallback = (req, res, next) => (err, user) => {
  // if (!!req.cookies && !!req.cookies.secretToken) {
  //   req.secretToken = req.cookies.secretToken;
  // }
  next();
};

const middleware = (req, res, next) => {
  const passportMiddleware = passport.authenticate(
    "jwt",
    { session: false },
    getAuthenticationCallback(req, res, next) // returns a function(err,user,info)
  );

  passportMiddleware(req, res, next);
};

module.exports = {
  middleware,
  getAuthenticationCallback,
  verifyCallback,
};
