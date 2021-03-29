// Initial express app server and PORT
const express = require("express");

const app = express();

// Chalk
const chalk = require("chalk");

const { log } = console;

// Middleware
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const passportJWT = require("./middlewares/passportJWT");

// Apollo Server
const apolloServer = require("./graphql");

// MongoDB Atlas
const mongoAtlas = require("./database");

// Configs
const serverConfigs = require("./configs/serverConfigs");

// Apply middleware for express
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(cookieParser());
app.use("/graphql", passportJWT.middleware);

apolloServer.applyMiddleware({ app, cors: true });

app.listen(serverConfigs.PORT, () => {
  // Connect to MongoDB Atlas Database
  mongoAtlas();

  log(chalk.blue("Server is starting up"));
  log(chalk.green(`Listening on port ${serverConfigs.PORT}`));
});
