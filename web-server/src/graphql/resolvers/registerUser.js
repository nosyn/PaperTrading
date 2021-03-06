const { UserInputError } = require("apollo-server-express");
const yup = require("yup");
const User = require("../../models/User");

const argsSchema = yup
  .object()
  .shape({
    input: yup
      .object()
      .shape({
        name: yup.string().required("Missing name"),
        email: yup.string().email().required("Missing user email"),
        password: yup.string().required("Missing password"),
      })
      .required()
      .default(null)
      .nullable(),
  })
  .required("User Info is missing")
  .default(null)
  .nullable();

module.exports = async (_parent, args, _context, _info) => {
  const { name, email, password } = args.input;
  const userInfo = new User({
    name,
    email,
    password,
  });

  try {
    // Validate -> pass
    await argsSchema.validate(args);
  } catch (error) {
    throw new UserInputError(`Invalid Argument: ${error}`);
  }

  await User.findOne({ email }).then((user) => {
    if (user) {
      throw new UserInputError("Email already exists");
    }
    // Nothing wrong -> save to database
    userInfo.save();
  });

  return {
    name,
    email,
    password,
  };
};
