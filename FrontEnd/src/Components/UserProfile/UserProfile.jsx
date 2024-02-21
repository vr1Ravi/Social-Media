import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Post/Post";
import Modal from "../Modals/EditModal/EditModal";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import CloseIcon from "@mui/icons-material/Close";
import { logOutUser, updateProfile } from "../../Actions/userAction";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
} from "../../Slices/userSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfilePost from "../Post/ProfilePost";

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
  const navigate = useNavigate();
  const date = new Date(userJoinedDate);
  const options = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  const handleLogoutClick = async () => {
    const message = await logOutUser();
    alert(message);
    navigate("/");
  };

  return (
    <div className=" w-full md:w-4/5">
      <header className="relative h-11 mt-4">
        <h1 className="text-center text-green-600 text-3xl border border-b-2 border-t-0 w-full font-bold">
          Profile
        </h1>
        <Link to={`/${userName}/settings`}>
          <SettingsIcon className="absolute right-1 top-1  text-4xl text-gray-500" />
        </Link>
      </header>
      <div className=" relative flex flex-col items-center mt-4 justify-around h-1/3 md:h-1/3 md:flex-row">
        <div>
          <img
            className="rounded-full border-green-600  border-4"
            src={userAvatar}
            alt="userProfilePic"
          />
        </div>
        <div className="mt-3 h-20 flex flex-col justify-between font-mono ">
          <p className="font-semibold">{userName}</p>
          <p>{userBio}</p>
          <i>Joined {formattedDate}</i>
        </div>
        <div className="flex justify-between mt-6">
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full mr-4">
            <Link to="/profile/following">
              {followers.length} <span> Followers</span>
            </Link>
          </div>
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full">
            <Link to="/profile/following">
              {followings.length} <span>Following</span>
            </Link>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 w-1/5 md:w-1/12 p-2 bg-pink-600 text-white rounded-md font-semibold font-mono"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
      {/* User Posts */}
      <h1 className="text-center text-green-600 text-3xl border border-b-2 border-t-0 w-full font-bold">
        Posts
      </h1>
      <div
        className="grid grid-cols-2 md:grid-cols-3  gap-2 overflow-y-auto p-2 "
        style={{ height: "calc(100vh - 50vh)" }}
      >
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
        <ProfilePost />
      </div>
    </div>
  );
};

export default UserProfile;
