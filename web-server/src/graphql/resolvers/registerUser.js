const { UserInputError } = require("apollo-server-express"); // Error throw
const yup = require("yup"); // Schema Validation
const User = require("../../database/models/User"); // User Schema
const bcrypt = require("bcryptjs");

const argsSchema = yup
  .object()
  .shape({
    input: yup
      .object()
      .shape({
        name: yup.string().required("Missing name"),
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
  .required("User Register Info is missing")
  .default(null)
  .nullable();

module.exports = async (_parent, args, _context, _info) => {
  // Arguments validation
  try {
    // Validate -> pass
    await argsSchema.validate(args);
  } catch (error) {
    throw new UserInputError(`Invalid Argument: ${error}`);
  }

  // Pass validation
  const { name, email, password } = args.input;

  // Find if there is an exist email from database
  const user = await User.findOne({ email });

  // Throw if there is an exist email
  if (user) {
    throw new Error("Email already exists");
  }

  // Nothing wrong -> hash the password -> save to database
  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(password, salt, (_err, hash) => {
      // Store hash in your password DB.
      const userInfo = new User({
        name,
        email,
        password: hash,
        date: Date.now(),
      });
      userInfo
        .save()
        .then((user) => console.log(`User: ${user.email} is registered!!!`))
        .catch((error) => {
          throw new Error(error);
        });
    });
  });

  return {
    name,
    email,
    message: "Successfully registered! Welcome to Paper Trading <3",
  };
};
