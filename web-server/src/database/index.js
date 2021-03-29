// mongoose
const mongoose = require("mongoose");

// Chalk
const chalk = require("chalk");

const {log} = console;
const logError = console.error;

// Configs
const serverConfigs = require("../configs/serverConfigs");

const mongoAtlas = async () => {
  await mongoose
    .connect(serverConfigs.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => log(chalk.green("MongoDB successfully connected")))
    .catch((err) =>
      logError(chalk.red(`Can't connect to the MongoDB Atlas: ${err}`))
    );
};

module.exports = mongoAtlas;
