// let jwt = null;

// ! Currently we use this strategy because every time we refresh the page -> the web app restarts -> jwt = null again -> can't validate context
// ! For now, we will save the JWT into the localStorage

const jwtManager = {
  setJWT: (newJWT) => localStorage.setItem("jwtToken", newJWT),
  getJWT: () => localStorage.getItem("jwtToken"),
};

export default jwtManager;
