// Error
const { UserInputError, ApolloError } = require("apollo-server");

// Helpers
const contextSchema = require("./utils/contextSchema");

// Services
const { getSecretTokenFromCookie } = require("./utils/cookieHelpers");
const { signJWT } = require("../../services/authentication/jwtService");

module.exports = async (_parent, _args, context, _info) => {
  // VALIDATE CONTEXT
  try {
    await contextSchema.validate(context);
  } catch (error) {
    throw new UserInputError("Must Authenticate");
  }

  // Grab the secret token from the cookie/context to allow user to refresh the page
  const secretToken = getSecretTokenFromCookie(context);
  if (!secretToken) {
    throw new UserInputError("Unable to retrieve `secretToken`");
  }

  const currentUser = context.currentUser;
  const payload = {
    _id: currentUser._id,
    name: currentUser.name,
    email: currentUser.email,
  };
  const jwtToken = signJWT(payload, 86400);
  return { jwtToken };
};
