// CREATE MULTIPLE CONSTANTS AND EXPORT THEM FOR DIFFERENT PURPOSE OF CONFIGS

const apolloClientConfigs = Object.freeze({
  uri: process.env.REACT_APP_APOLLO_URI || "http://localhost:1997/api/graphql",
});

export default apolloClientConfigs;
