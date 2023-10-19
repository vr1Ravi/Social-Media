import mongoose from "mongoose";

// Schema of Post
const postSchema = new mongoose.Schema({
  caption: String,

  image: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId, // Data type of each owner will be generated automatically
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId, // Data type of each owner will be generated automatically
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, // Data type of each owner will be generated automatically
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);
