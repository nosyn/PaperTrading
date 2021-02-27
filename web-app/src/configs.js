// CREATE MULTIPLE CONSTANTS AND EXPORT THEM FOR DIFFERENT PURPOSE OF CONFIGS

export const apolloClientConfigs = {
  uri: process.env.REACT_APP_APOLLO_URI || "http://localhost:1997/api/graphql",
};
