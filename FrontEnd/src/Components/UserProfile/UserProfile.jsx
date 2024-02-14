import { useState } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import Modal from "../Modals/EditModal/EditModal";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfile } from "../../Actions/userAction";
import SettingsIcon from '@mui/icons-material/Settings';
import {
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
} from "../../Slices/userSlice";
import axios from "axios";
import {  useSelector } from "react-redux";

const UserProfile = ({
  userName,
  userAvatar,
  userEmail,
  userBio,
  userJoinedDate,
  userFollowers,
  userFollowing,
  userPosts, 
  userId,
  isAuthenticated,
}) => {
  const followers = useSelector((state) => state.user.followers);
  const followings = useSelector((state) => state.user.followings);

  const date = new Date(userJoinedDate);
  const options = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleString("en-US", options);
 
  return (
    <div className=" w-full md:w-4/5 md:h-4/5">
      {/* User Information */}
      <header className="relative h-11 mt-4">
        <h1 className="text-center text-green-600 text-3xl border border-b-2 border-t-0 w-full font-bold">Profile</h1>
      <Link to={`/${userName}/settings`}><SettingsIcon  className="absolute right-1 top-1  text-4xl text-gray-500"/></Link>  
      </header>
      <div className="flex flex-col items-center mt-4 justify-around h-3/4">
        <div className="userUpperPart">
          <img className="rounded-full border-green-600  border-4" src={userAvatar} alt="userProfilePic" />
        </div>
        <div className="mt-3 h-20 flex flex-col justify-between font-mono ">
          <p className="font-semibold">{userName}</p>
          <p>{userBio}</p>
          <i>Joined {formattedDate}</i>
        </div>
        <div className="w-1/2 flex justify-between mt-6">
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full">
            <Link
              to="/profile/following"
            >
              {followers.length}{" "}
              <span> Followers</span>
            </Link>
          </div>
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full">
            <Link
              to="/profile/following"
            >
              {followings.length}{" "}
              <span >Following</span>
            </Link>
          </div>
        </div>
      </div>
      {/* User Posts */}
      <div className="userPosts">
        {userPosts.map((post) => (
          <Post
            postId={post?._id}
            caption={post?.caption}
            postImage={post?.image?.url}
            likes={post?.likes}
            comments={post?.comments}
            ownerImage={userAvatar}
            ownerName={userName}
            key={post?._id}
            ownerId={userId}
            isProfile={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
