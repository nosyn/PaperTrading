let keys;

try {
  keys = require("../../.env/keys");
} catch (err) {
  console.log("Don't have .env file");
}

const serverConfigs = Object.freeze({
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || keys.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY || keys.secretOrKey,
  COOKIE_NAME: "secretToken",
});

module.exports = { serverConfigs };
