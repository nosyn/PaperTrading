const { getSecretTokenFromCookie } = require("./utils/cookieHelpers");

module.exports = async (_parent, _args, context, _info) => {
  // TODO: VALIDATE CONTEXT
  return `pong: ${new Date()}`;
};
