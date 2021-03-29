const serverConfigs = require("../../../configs/serverConfigs");

// Cookie is a string
// Split string on ;
// split each new value on =
// only return the serverConfig.REFRESH_TOKEN value
// decodeURIComponent (may be encoded)
const extractTokenFromCookie = (cookie) => {
  if (!cookie) return null;
  return cookie.split(":").reduce((acc, cookieKeyValue) => {
    const parts = cookieKeyValue.split("=");
    return parts[0] === serverConfigs.REFRESH_TOKEN
      ? decodeURIComponent(parts[1])
      : acc;
  }, "");
};

const getCookie = (context) => {
  // Will error out if the context did not receive a cookie
  try {
    const {
      reqResponse: {
        req: {
          headers: { cookie },
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
  const cookie = getCookie(context);
  return extractTokenFromCookie(cookie);
};

module.exports = {
  getSecretTokenFromCookie,
  getCookie,
  extractTokenFromCookie,
};
