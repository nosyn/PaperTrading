// Bcrypt
const bcrypt = require("bcryptjs");

// Errors
const { UserInputError } = require("apollo-server-errors");

// Validation
const yup = require("yup");

// User
const User = require("../../database/models/User");

// Private keys
const keys = require("../../../.env/keys");

//
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/cryptoHelpers");

const argsSchema = yup
  .object()
  .shape({
    input: yup
      .object()
      .shape({
        email: yup
          .string()
          .email("Must be a valid email")
          .required("Missing user email"),
        password: yup.string().required("Missing password"),
      })
      .required()
      .default(null)
      .nullable(),
  })
  .required("User Login Info is missing")
  .default(null)
  .nullable();

module.exports = async (_parent, args, context, _info) => {
  // Arguments validation
  try {
    await argsSchema.validate(args);
  } catch (error) {
    throw new UserInputError(`Invalid Argument: ${error}`);
  }

  // Pass validation
  const { email, password } = args.input;

  // Find email from the database
  const user = await User.findOne({ email });

  // If there isn't a matching user with email, throw error
  if (!user) {
    throw new UserInputError("Email or Password is incorrect!!!");
  }

  // If an email is found but the password is incorrect, throw error
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UserInputError("Email or Password is incorrect!!!");
  }

  // Create a payload for user info
  const payload = { name: user.name, email: user.email };

  // Successfully login, sign the payload with secret key and create a JWT token
  const jwtToken = await jwt.sign(
    { _id: user._id, ...payload },
    keys.secretOrKey,
    {
      expiresIn: 86400, // 1 day in seconds
    }
  );

  // create secretToken to be saved in cookie
  const secretToken = generateToken(48);

  // add secretToken as cookie
  context.reqResponse.cookie("secretToken", secretToken, {
    httpOnly: true,
    maxAge: 86400,
  });

  // Return a signed payload
  return { ...payload, jwtToken };
};
