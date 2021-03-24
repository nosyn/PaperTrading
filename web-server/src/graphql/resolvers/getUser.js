// // Validation
// const yup = require("yup");

// // User
// const User = require("../../database/models/User");

// // Private keys
// const keys = require("../../../.env/keys");

// //
// const jwt = require("jsonwebtoken");
// const { generateToken } = require("../../utils/cryptoHelpers");

// Helpers
// const { getSecretTokenFromCookie } = require("./utils/cookieHelpers");

module.exports = async (_parent, _args, context, _info) => {
  // TODO: VALIDATE CONTEXT
  // // console.log(context);
  // const cookie = getSecretTokenFromCookie(context);
  // console.log("Cookieeeeeeeeee: ", cookie);
  // Find email from the database
  // const user = await User.findOne({ email });

  // // If there isn't a matching user with email, throw error
  // if (!user) {
  //   throw new UserInputError("Email or Password is incorrect!!!");
  // }

  // // If an email is found but the password is incorrect, throw error
  // const isMatch = await bcrypt.compare(password, user.password);

  // if (!isMatch) {
  //   throw new UserInputError("Email or Password is incorrect!!!");
  // }

  // Create a payload for user info
  // const payload = { name: user.name, email: user.email };
  const payload = { name: "Son Nguyen", email: "biem97@gmail.com" };

  // // Successfully login, sign the payload with secret key and create a JWT token
  // const jwtToken = await jwt.sign(
  //   { _id: user._id, ...payload },
  //   keys.secretOrKey,
  //   {
  //     expiresIn: 86400, // 1 day in seconds
  //   }
  // );

  // // create secretToken to be saved in cookie
  // const secretToken = generateToken(48);

  // // add secretToken as cookie
  // context.reqResponse.cookie("secretToken", secretToken, {
  //   httpOnly: true,
  //   maxAge: 86400,
  // });

  // Return a signed payload
  // return { ...payload, jwtToken };
  return payload;
  // return null;
};
