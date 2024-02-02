import mongoose from "mongoose";

// Schema of Post
const postSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
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
    isBot: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      user: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        image: {
          public_id: String,
          url: String,
        },
        name: String,
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
