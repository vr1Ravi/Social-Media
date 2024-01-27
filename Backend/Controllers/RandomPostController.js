import { cloudinary } from "../app.js";
import { RandomPost } from "../Models/RandomPosts.js";
export const createRandomPosts = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!caption) {
      return res.status(400).json({
        success: false,
        message: "Enter valid caption",
      });
    }
    const post = req.file.path;
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Enter valid post",
      });
    }
    const postData = await cloudinary.uploader.upload(post);
    const postId = postData.public_id;
    const postUrl = postData.url;

    await RandomPost.create({
      caption,
      image: { public_id: postId, url: postUrl },
    });
    return res.status(201).json({
      success: true,
      message: "Random Post created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
