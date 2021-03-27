// https://github.com/mikenicholson/passport-jwt
// TODO: FIND A SOLUTION FOR AUTHENTICATION WITH JWT AND SECRET TOKEN
// TODO: SEND REQUEST WITH AUTHORIZATION HEADER FROM CLIENT
// ? HOW TO SEPARATE SECRET TOKEN WITH JWT TOKEN IN AUTHORIZATION HEADER

// Passport
const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");

// Server configs
const { JWT_ISSUER, SECRET_KEY } = require("../configs/serverConfigs");
const User = require("../database/models/User");

const jwtOptions = {
  issuer: JWT_ISSUER,
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

// ! CURRENT FRONT END DON'T HAVE `AUTHORIZATION` HEADER SO THIS FUNCTION WON'T BE CALLED
const verifyCallback = async (_req, payload, done) => {
  // verify the JWT is sent with the valid jwtOptions -> payload -> user -> getAuthenticationCallback
  try {
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

const getAuthenticationCallback = (req, res, next) => (_err, user) => {
  // set the currentUser
  if (user) {
    req.currentUser = user;
  }
  if (!!req.cookies && !!req.cookies.secretToken) {
    req.secretToken = req.cookies.secretToken;
  }
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
