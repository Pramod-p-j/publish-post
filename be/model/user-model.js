const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  },
  {
    collection: "usersdata",
  }
);

module.exports = mongoose.model("userModel", userModel);
