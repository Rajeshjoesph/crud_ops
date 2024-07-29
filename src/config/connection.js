const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Mongo DataBase Successfully connected..");
    })
    .catch((err) => {
      console.log(`Connection Error:${err}`);
    });
};

module.exports = connection;
