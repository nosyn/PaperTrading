const serverConfigs = Object.freeze({
  PORT: process.env.PORT || 5000,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://biem97:8uf3aBFLyW3YNzb4@papertrading.8wat4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
});

module.exports = { serverConfigs };
