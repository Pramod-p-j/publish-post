const mongoose = require("mongoose");

const postModel = mongoose.Schema(
  {
    postTitle: { type: String, required: true },
    description: { type: String, required: true },
    addedBy: { type: String },
  },
  {
    timestamps: true,
  },
  {
    collection: "postsdata",
  }
);

module.exports = mongoose.model("postModel", postModel);
