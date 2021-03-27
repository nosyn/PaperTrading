const {
  JWT_EXPIRES_DURATION,
  JWT_ISSUER,
  SECRET_KEY,
} = require("../../configs/serverConfigs");

// JWT
const jwt = require("jsonwebtoken");

// * sign the jwt with payload and duration time
const signJWT = (payload, jwtDurationArg) => {
  // Throw if there isn't a payload
  if (!payload) {
    throw new Error("Invalid argument: Payload is required!");
  }

  return jwt.sign(payload, SECRET_KEY, {
    issuer: JWT_ISSUER,
    expiresIn: jwtDurationArg || JWT_EXPIRES_DURATION,
  });
};

// * verify the jwt
const verifyJWT = (jwtToken, options) => {
  if (!token) {
    throw new Error("Invalid argument: JWT token is required!");
  }
  return jwt.verify(jwtToken, options);
};

// * refresh the jwt with secretToken
// !TODO add refreshMyJWT method
// !TODO: Add hash and add secretToken to the MongoDB when user is login -> call mongoDB and compare
const refreshMyJWT = async ({ secretToken }) => {
  if (!secretToken) {
    throw new Error("Invalid Argument: secretToken is required");
  }
};

module.exports = { signJWT, verifyJWT, refreshMyJWT };
