// mongoose
const mongoose = require("mongoose");

// Configs
const { serverConfigs } = require("../configs/serverConfigs");

const mongoAtlas = async () => {
  await mongoose
    .connect(serverConfigs.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) =>
      console.error(`Can't connect to the MongoDB Atlas: ${err}`)
    );
};

module.exports = mongoAtlas;
