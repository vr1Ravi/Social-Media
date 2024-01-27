import mongoose from "mongoose";

const randomPostSchema = new mongoose.Schema({
  caption: String,
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

  image: {
    public_id: String,
    url: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});
export const RandomPost = mongoose.model("RandomPost", randomPostSchema);
