import mongoose from "mongoose";
import bcrypt from "bcrypt"; // TO hash User Password
import jwt from "jsonwebtoken"; // To store User credentials in Cookie
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  bio: {
    type: String,
    required: [true, "Please enter a Bio"],
  },
  joinedDate: {
    type: Date,
    default: Date.now(),
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email Already Exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isBot: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken:
    String /* these two are optional as we are not saying explicitly required or something that's why these two
  won't shows in database initially */,
  resetPasswordExpire: Date,
});

// Each documnet in Moongose has a --v key (represents version of that doc), here pre is a middleware if we want
// mongoose to increment that --v key (which basically represents the newer version of that doc) then we use it.
// If i directly save this doc using save() method the --v key won't gets incremented.
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      10
    ); /*bcrypt is used to hash password only. Here 10 represents salt round which is min value required to hash the
    password this is exponential in nature if we use 11 it requires twice as much as work as salt 10, if we use 12 the it takes
    four times as much as work as salt 10. */
  }
});

// Defining match Password for schema
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Defining generateToken for  Schema
userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

// Defining resetPassword Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto
    .randomBytes(20)
    .toString(
      "hex"
    ); /* crypto is used to generate a unique token which we pass to hash function
  generates same resetPassword token again and again for same input token */
  this.resetPasswordToken = crypto // more Hashed
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
