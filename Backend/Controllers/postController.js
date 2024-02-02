import { Post } from "../Models/PostModel.js";
import { User } from "../Models/UserModel.js";
import { cloudinary } from "../app.js";
// createPost Controller
export const createPost = async (req, res) => {
  try {
    const caption = req.body.caption;
    const image = req.file.path;

    const user = await User.findById(req.user._id);
    const uploadedImage = await cloudinary.uploader.upload(image);

    const imageId = uploadedImage.public_id;
    const imageUrl = uploadedImage.url;

    const newPostData = {
      caption: caption,
      image: {
        public_id: imageId,
        url: imageUrl,
      },
      owner: {
        _id: user._id,
        image: {
          public_id: user.avatar.public_id,
          url: user.avatar.url,
        },
        name: user.name,
      },
    };

    // creating new Post
    const post = await Post.create(newPostData);

    // pushing the new post into posts array of particular user
    user.posts.unshift(post._id);

    // The below code is used to save changes made to a user document in the database.
    await user.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Like and Unlike Controller
export const likeAndUnlikePost = async (req, res) => {
  try {
    // quering post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.satus(404).json({
        success: false,
        message: "No post Found",
      });
    }
    // checking if post is liked or not already exists or not

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      // adding into likes array
      post.likes.push(req.user._id);

      // saving changes
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deleting Post controller
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post._id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    const user = req.user;

    // Checking a post is of authenticated user or not
    if (!user.posts.includes(post._id)) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    // Deleting user post
    const index = user.posts.indexOf(post._id);
    user.posts.splice(index, 1);

    // saving changes
    await user.save();

    // Deleting a post from Post Model
    await post.deleteOne({ _id: post._id });

    return res.status(200).json({
      success: true,
      message: "Post deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GetPostOfFollowing Controller
export const getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // finding all posts of owners whom authenticated user follows
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Caption Controller
export const updateCaption = async (req, res) => {
  try {
    const { newCaption } = req.body;

    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);

    //Checcking if post exists or not
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    // Checking if caption is provided or not
    if (!newCaption) {
      return res.status(404).json({
        success: false,
        message: "Please provide caption",
      });
    }
    // Checking if post to be update is of authenticated user or not
    if (post.owner.toString() !== user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    // updating caption
    post.caption = newCaption;
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Caption updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Comment Controller
export const commentOnPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const user = req.user;
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post Found",
      });
    }
    let userCommentExists = false;
    let index = 0;
    const commentsArr = post.comments;

    for (let i = 0; i < commentsArr.length; i++) {
      const comment = commentsArr[i];
      if (comment.user._id.toString() === user._id.toString()) {
        userCommentExists = true;
        index = i;
        break;
      }
    }
    if (userCommentExists) {
      post.comments[index].comment = comment;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment updated successfully",
      });
    } else {
      post.comments.push({
        user: {
          _id: user._id,
          image: {
            public_id: user.avatar.public_id,
            url: user.avatar.url,
          },
          name: user.name,
        },
        comment: comment,
        userName: user.name,
        userAvatar: user.avatar,
      });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment added successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Comment Controller

export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    const commentArr = post.comments;

    if (post.owner.toString() === req.user._id.toString()) {
      const { commentId } = req.body;
      if (!commentId) {
        return res.status(400).json({
          success: false,
          message: "Comment Id is required",
        });
      }

      for (let i = 0; i < commentArr.length; i++) {
        const comment = commentArr[i];
        if (comment._id.toString() === commentId.toString()) {
          commentArr.splice(i, 1);
          await post.save();
          break;
        }
      }

      return res.status(200).json({
        success: true,
        message: "Comment has deleted",
      });
    } else {
      for (let i = 0; i < commentArr.length; i++) {
        const comment = commentArr[i];
        if (comment.user.toString() === req.user._id.toString()) {
          commentArr.splice(i, 1);
          await post.save();
          break;
        }
      }
      return res.status(200).json({
        success: true,
        message: "Your comment deleted",
      });
    }
  } catch (error) {}
};

// Get Random Posts
export const getRandomPost = async (req, res) => {
  try {
    const randomPosts = await Post.find({ "owner.isBot": true });
    return res.status(200).json({
      success: true,
      randomPosts,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
