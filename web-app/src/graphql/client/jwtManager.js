let jwt = null;

const jwtManager = {
  setJWT: (newJWT) => (jwt = newJWT),
  getJWT: () => jwt,
};

export default jwtManager;
