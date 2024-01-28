import { Post } from "../Models/PostModel.js";
import { User } from "../Models/UserModel.js";

import { sendEmail } from "../middlewares/sendEmail.js";
import crypto from "crypto";
import { cloudinary } from "../app.js";

// Register Controller
export const register = async (req, res) => {
  try {
    // Extracting user credentials from body
    const { name, email, password, bio } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Profile Pic Mandatory" });
    }

    // Checking their existence in database
    let user = await User.findOne({ email });

    // if found one simply return this
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already Exists" });
    }
    const userImg = req.file.path;
    const userImgData = await cloudinary.uploader.upload(userImg);
    const userImgUrl = userImgData.url;
    const userImgId = userImgData.public_id;
    // creating new user into database and storing user object in user variable
    user = await User.create({
      name,
      email,
      bio,
      password,
      avatar: { public_id: userImgId, url: userImgUrl },
    });

    // After creation sending response back to client side
    const token = await user.generateToken(); // genearateToken method  defined is userModel
    return res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "First time here, please Register first",
      });
    }

    const isMatch = await user.matchPassword(password); // matchPassword method is defined in userModel
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect",
      });
    }
    const token = await user.generateToken(); // genearateToken method  defined is userModel
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true /* by making htppOnly: true, cookie wiil not be available to client side 
            only to server side  This helps to prevent attacks that rely on stealing or manipulating cookies,
         such as cross-site scripting (XSS) attacks or session hijacking.*/,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// followOrUnfollowUser Controller
export const followOrUnfollowUser = async (req, res) => {
  try {
    // Getting user to follow from model
    const userToFollow = await User.findById(req.params.id);

    // Gettinf logged in user
    const logedInUser = await User.findById(req.user._id);

    // Checking if user to be followed exists or not
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }
    //  if logedin user is already following the userToFollow
    if (logedInUser.following.includes(userToFollow._id)) {
      const followigIndex = logedInUser.following.indexOf(userToFollow._id);
      logedInUser.following.splice(followigIndex, 1);
      await logedInUser.save();

      const followerIndex = userToFollow.followers.indexOf(logedInUser._id);
      userToFollow.followers.splice(followerIndex, 1);
      await userToFollow.save();
      return res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    }

    // if logedin user is not already following the userToFollow
    logedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(logedInUser._id);
    await logedInUser.save();
    await userToFollow.save();

    return res.status(200).json({
      success: true,
      message: "user followed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getProflie
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// updatePassword Controller
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;
    // console.log(oldPassword + "," + newPassword);
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide oldPassword and newpassword",
      });
    }
    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Please enter correct old password",
      });
    } else if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be greater 7",
      });
    } else if (newPassword === user.password) {
      return res.status(404).json({
        success: false,
        message: "Password cannot be same as current One",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Password successfully changed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// updateProfile Controller
export const updateProfile = async (req, res) => {
  try {
    const { userName, newEmail, newBio } = req.body;
    const user = await User.findById(req.user._id);
    if (req.file) {
      const userImg = req.file.path;
      if (userImg) {
        const userImgData = await cloudinary.uploader.upload(userImg);
        const userImgUrl = userImgData.url;
        const userImgId = userImgData.public_id;
        user.avatar.public_id = userImgId;
        user.avatar.url = userImgUrl;
      }
    }

    if (userName) user.name = userName;
    if (newEmail) user.email = newEmail;
    if (newBio) user.bio = newBio;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User Profile
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    await Post.deleteMany({
      _id: {
        $in: posts,
      },
    });
    const userId = user._id;
    const followersArray = user.followers;
    const followingArray = user.following;

    // deleting user
    await User.deleteOne({ _id: user._id });

    // Removing authenticated user id from other users following array
    for (let i = 0; i < followersArray.length; i++) {
      const person = await User.findById(followersArray[i]);
      const index = person.following.indexOf(userId);
      person.following.splice(index, 1);
      await person.save();
    }

    // Removing authenticated user id from other users followers array
    for (let i = 0; i < followingArray.length; i++) {
      const person = await User.findById(followingArray[i]);
      const index = person.followers.indexOf(userId);
      person.followers.splice(index, 1);
      await person.save();
    }

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(201).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get another user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("posts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("posts");
    users.reverse();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forget password
export const forgotPassword = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();

    // created reset Url link
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetPasswordToken}`;
    // created message to send on email
    const message = `Click below to reset password: \n ${resetUrl}`;
    try {
      // sending mail to user
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      return res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    if (!resetToken) {
      return res.status(404).json({
        success: fasle,
        message: "Wrong resetToken",
      });
    }
    const resetPasswordToken = crypto // more Hashed
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password restored successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Bots

export const getBots = async (req, res) => {
  try {
    const bots = await User.find({ isBot: true });

    return res.status(200).json({
      success: true,
      bots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
