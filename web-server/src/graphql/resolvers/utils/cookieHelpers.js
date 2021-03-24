const serverConfigs = require("../../../configs/serverConfigs");

// Cookie is a string
// Split string on ;
// split each new value on =
// only return the serverConfig.COOKIE_NAME value
// decodeURIComponent (may be encoded)
const extractTokenFromCookie = (cookie) => {
  // console.log("cookieeeee: ", cookie);
  if (!cookie) return null;
  // console.log("cookie: ", cookie);
  return cookie.split(":").reduce((acc, cookieKeyValue) => {
    const parts = cookieKeyValue.split("=");
    return parts[0] === serverConfigs.COOKIE_NAME
      ? decodeURIComponent(parts[1])
      : acc;
  }, "");
};

const getCookie = (context) => {
  console.log(Object.keys(context.reqResponse.req.cookies));
  console.log(context.reqResponse.req);
  // Will error out if the context did not receive a cookie
  try {
    const {
      reqResponse: {
        req: {
          cookies: { cookie },
        },
      },
    } = context;

    return cookie;
  } catch (error) {
    return null;
  }
};

const getSecretTokenFromCookie = (context) => {
  if (!context) return null;
  console.log("I'm hereeee");
  const cookie = getCookie(context);
  console.log(cookie);
  return extractTokenFromCookie(cookie);
};

module.exports = {
  getSecretTokenFromCookie,
  getCookie,
  extractTokenFromCookie,
};
