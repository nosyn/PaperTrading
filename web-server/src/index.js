// Initial express app server and PORT
const express = require("express");
const app = express();

// Middleware
const cors = require("cors");
const helmet = require("helmet");

// Apollo Server
const apolloServer = require("./graphql");

// mongoose
const mongoose = require("mongoose");

// Configs
const { serverConfigs } = require("./configs");

// MongoDB Atlas Database connect
mongoose
  .connect(serverConfigs.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(serverConfigs.PORT, () => {
  console.log(`Server is starting up`);
  console.log(`Listening on port ${serverConfigs.PORT}`);
});
