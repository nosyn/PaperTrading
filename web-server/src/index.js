// Initial express app server and PORT
const express = require("express");
const app = express();

// Middleware
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./middlewares/passportJWT")(passport);

// Apollo Server
const apolloServer = require("./graphql");

// mongoose
const mongoose = require("mongoose");

// Configs
const { serverConfigs } = require("./configs/serverConfigs");

// Apply middleware for express
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

apolloServer.applyMiddleware({ app, cors: true });

app.get("/test", (_req, res, next) => {
  res.status(200).send("Hello");
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "web-app", "build", "index.html"));
  });
}

app.listen(serverConfigs.PORT, async () => {
  // MongoDB Atlas Database connect
  await mongoose
    .connect(serverConfigs.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) =>
      console.error(`Can't connect to the MongoDB Atlas: ${err}`)
    );

  console.log(`Server is starting up`);
  console.log(`Listening on port ${serverConfigs.PORT}`);
});
