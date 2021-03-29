// Error
const { UserInputError } = require("apollo-server");

// Helpers
const contextSchema = require("./utils/contextSchema");

// Services
const { getSecretTokenFromCookie } = require("./utils/cookieHelpers");
const serverConfigs = require("../../configs/serverConfigs");

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
    throw new UserInputError("Unable to retrieve token from request");
  }

  context.reqResponse.clearCookie(serverConfigs.REFRESH_TOKEN);

  const {currentUser} = context;
  const payload = {
    name: currentUser.name,
    email: currentUser.email,
  };

  console.log("payload: ", payload);
  return payload;
};
