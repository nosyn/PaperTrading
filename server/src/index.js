// Initial express app server and PORT
const express = require("express");
const app = express();

// Middleware
const cors = require("cors");
const helmet = require("helmet");

// Apollo Server
const apolloServer = require("./graphql");

// Configs
const { serverConfig } = require("./configs");

// Apply middleware for express
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
apolloServer.applyMiddleware({ app });

app.get("/test", (_req, res, next) => {
  res.status(200).send("Hello");
});

app.listen(serverConfig.PORT, () => {
  console.log(`Server is starting up`);
  console.log(`Listening on port ${serverConfig.PORT}`);
});
