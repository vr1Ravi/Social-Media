import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logOutUser } from "../../Actions/userAction";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProfilePost from "../Post/ProfilePost";
import { Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Errorpage from "../Error/Error";

const UserProfile = () => {
  let { user } = useSelector((state) => state.user);
  const { followers } = useSelector((state) => state.user);
  const { following } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserId = user?._id;

  const date = new Date(user?.joinedDate);
  const options = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  const results = useQuery({
    queryKey: ["userProfile", id],
    queryFn: fetchUser,
  });

  const handleFollowUnfollow = () => {};

  if (results.isError || error) return <Errorpage />;
  if (results.isLoading || loading) {
    return (
      <div
        style={{ left: "60%" }}
        className="absolute top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center"
      >
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="oval-loading"
          strokeWidth="7"
        />
      </div>
    );
  }
  if (results.data) user = results.data;
  if (!user) return;
  return (
    <div className=" w-full md:w-4/5">
      <header className="relative mt-4 h-11">
        {id && (
          <button className="p2 ml-2" onClick={() => navigate(-1)}>
            {<ArrowBackIcon />}
          </button>
        )}
        <h1 className="w-full border border-b-2 border-t-0 text-center text-3xl font-bold text-green-600">
          Profile
        </h1>
        {!id && (
          <Link to={`/${user.name}/settings`}>
            <SettingsIcon className="absolute right-1 top-1  text-4xl text-gray-500" />
          </Link>
        )}
      </header>
      <div className=" relative mt-4 flex h-1/3 flex-col items-center justify-around md:h-1/3 md:flex-row">
        <div>
          <img
            className="h-48 w-48  rounded-full border-4 border-green-600"
            src={user?.avatar.url}
            alt="userProfilePic"
          />
        </div>
        <div className="mt-3 flex h-20 flex-col justify-between font-mono ">
          <p className="font-semibold">{user.name}</p>
          <p>{user.bio}</p>
          <i>Joined {formattedDate}</i>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="mr-4 rounded-full bg-green-600 p-1 pl-2 pr-2 text-white md:p-2">
            <Link to="/profile/following">
              {followers.length} <span> Followers</span>
            </Link>
          </div>
          <div className="rounded-full bg-green-600 p-1 pl-2 pr-2 text-white md:p-2">
            <Link to="/profile/following">
              {following.length} <span>Following</span>
            </Link>
          </div>
        </div>
        {!id ? (
          <button
            onClick={() => logOutUser(dispatch)}
            className="absolute right-2 top-2 w-1/5 rounded-md bg-red-600 p-2 font-mono font-semibold text-white md:w-1/12"
          >
            Logout
          </button>
        ) : user.following.includes(id) ? (
          <button
            onClick={handleFollowUnfollow}
            className="absolute right-2 top-2 w-1/5 rounded-md bg-green-600 p-2 font-mono font-semibold text-white md:w-1/12"
          >
            Following
          </button>
        ) : (
          <button
            onClick={handleFollowUnfollow}
            className="absolute right-2 top-2 w-1/5 rounded-md bg-green-600 p-2 font-mono font-semibold text-white md:w-1/12"
          >
            Follow
          </button>
        )}
      </div>
      {/* User Posts */}
      <h1 className="w-full border border-b-2 border-t-0 text-center text-3xl font-bold text-green-600">
        Posts
      </h1>
      <div
        className="grid grid-cols-2 gap-2  overflow-y-auto p-2 md:grid-cols-3 "
        style={{ height: "calc(100vh - 50vh)" }}
      >
        {user.posts.length === 0 ? (
          <h1 className=" font-mono text-xl font-extrabold">No Posts Yet</h1>
        ) : (
          user.posts.map((post) => (
            <ProfilePost
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postSrc={post.image.url}
              ownerName={user.name}
              likes={post.likes.length}
              comments={post.comments.length}
              isLoggedUser={loggedInUserId === user?._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
