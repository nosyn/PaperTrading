const { getSecretTokenFromCookie } = require("./utils/cookieHelpers");

module.exports = async (_parent, _args, context, _info) => {
  // TODO: VALIDATE CONTEXT
  // console.log("I'm final: ", context.reqResponse.req);
  // console.log(context);
  // const cookie = await getSecretTokenFromCookie(context);
  return `pong: ${new Date()}`;
};
