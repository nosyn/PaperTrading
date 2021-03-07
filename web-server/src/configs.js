const keys = require("../../.env/keys");

const serverConfigs = Object.freeze({
  PORT: process.env.PORT || 5000,
  MONGO_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI
      : keys.MONGO_URI,
});

module.exports = { serverConfigs };
