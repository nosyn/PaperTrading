const crypto = require("crypto");

const generateToken = (length) =>
  crypto.randomBytes(length || 32).toString("hex");

module.exports = { generateToken };
