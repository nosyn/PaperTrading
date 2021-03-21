const crypto = require("crypto");

const generateToken = (length) =>
  crypto.randomBytes(length || 32, (err, buffer) => {
    if (err) {
      console.log("Error inside cryptoGenerate: ", err);
    }
    return buffer.toString("hex");
  });

module.exports = { generateToken };
