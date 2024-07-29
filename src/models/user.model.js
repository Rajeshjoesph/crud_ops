const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    mobileNo: {
      type: Number,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", registerSchema);

module.exports = user;
