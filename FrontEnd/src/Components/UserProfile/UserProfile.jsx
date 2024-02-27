import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logOutUser } from "../../Actions/userAction";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProfilePost from "../Post/ProfilePost";
import { Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "./Button";

const UserProfile = () => {
  let { user } = useSelector((state) => state.user);
  const { followers } = useSelector((state) => state.user);
  const { following } = useSelector((state) => state.user);
  const [btn, setBtn] = useState("Logout");
  const { id } = useParams();
  console.log(id, user?._id);
  const navigate = useNavigate();

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
  useEffect(() => {
    const fetchedUser = results.data;
    if (user._id === fetchedUser._id) {
      setBtn("Logout");
    } else if (following.includes(fetchedUser._id)) {
      setBtn("Unfollow");
    } else if (followers.includes(fetchedUser._id)) {
      setBtn("Remove");
    } else {
      setBtn("Follow");
    }
  }, [results.data]);

  if (results.isLoading) {
    return (
      <div
        style={{ left: "60%" }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center"
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

  if (!user) return;
  return (
    <div className=" w-full md:w-4/5">
      <header className="relative h-11 mt-4">
        {id && (
          <button className="p2 ml-2" onClick={() => navigate(-1)}>
            {<ArrowBackIcon />}
          </button>
        )}
        <h1 className="text-center text-green-600 text-3xl border border-b-2 border-t-0 w-full font-bold">
          Profile
        </h1>
        {!id && (
          <Link to={`/${user.name}/settings`}>
            <SettingsIcon className="absolute right-1 top-1  text-4xl text-gray-500" />
          </Link>
        )}
      </header>
      <div className=" relative flex flex-col items-center mt-4 justify-around h-1/3 md:h-1/3 md:flex-row">
        <div>
          <img
            className="rounded-full border-green-600  border-4 w-48 h-48"
            src={user?.avatar.url}
            alt="userProfilePic"
          />
        </div>
        <div className="mt-3 h-20 flex flex-col justify-between font-mono ">
          <p className="font-semibold">{user.name}</p>
          <p>{user.bio}</p>
          <i>Joined {formattedDate}</i>
        </div>
        <div className="flex justify-between mt-6">
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full mr-4">
            <Link to="/profile/following">
              {user.followers.length} <span> Followers</span>
            </Link>
          </div>
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full">
            <Link to="/profile/following">
              {user.following.length} <span>Following</span>
            </Link>
          </div>
        </div>
        <Button btn={btn} />
      </div>
      {/* User Posts */}
      <h1 className="text-center text-green-600 text-3xl border border-b-2 border-t-0 w-full font-bold">
        Posts
      </h1>
      <div
        className="relative grid grid-cols-2 md:grid-cols-3  gap-2 overflow-y-auto p-2 "
        style={{ height: "calc(100vh - 50vh)" }}
      >
        {user.posts.length === 0 ? (
          <h1 className=" font-extrabold font-mono text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No Posts Yet
          </h1>
        ) : (
          user.posts.map((post) => (
            <ProfilePost
              key={post._id}
              caption={post.caption}
              postSrc={post.image.url}
              ownerName={user.name}
              likes={post.likes.length}
              comments={post.comments.length}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
