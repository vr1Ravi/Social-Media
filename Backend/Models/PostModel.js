import mongoose from "mongoose";

// Schema of Post
const postSchema = new mongoose.Schema({
  caption: String,

  image: {
    public_id: String,
    url: String,
  },

  owner: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    image: {
      public_id: String,
      url: String,
    },
    name: String,
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
      id: String,
      user: {
        type: mongoose.Schema.Types.ObjectId, // Data type of each owner will be generated automatically
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      userName: String,
      userAvatar: {
        public_id: String,
        url: String,
      },
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);
