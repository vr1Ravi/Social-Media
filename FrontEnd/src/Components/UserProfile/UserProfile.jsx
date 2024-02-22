import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import CloseIcon from "@mui/icons-material/Close";
import { logOutUser } from "../../Actions/userAction";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfilePost from "../Post/ProfilePost";
import { Oval } from "react-loader-spinner";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { userToSearh_Id } = useSelector((state) => state.user);
  console.log(userToSearh_Id);
  const dispatch = useDispatch();
  const date = new Date(user?.joinedDate);
  const options = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  const handleLogoutClick = async () => {
    await logOutUser(dispatch);
    localStorage.removeItem("path");
  };
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center">
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="oval-loading"
          strokeWidth="7"
        />
        <span className="ml-3 font-mono">Logging out</span>
      </div>
    );
  }
  if (!isAuthenticated) return;
  return (
    <div className=" w-full md:w-4/5">
      <header className="relative h-11 mt-4">
        <h1 className="text-center text-green-600 text-3xl border border-b-2 border-t-0 w-full font-bold">
          Profile
        </h1>
        {!userToSearh_Id && (
          <Link to={`/${user?.name}/settings`}>
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
          <p className="font-semibold">{user?.name}</p>
          <p>{user?.bio}</p>
          <i>Joined {formattedDate}</i>
        </div>
        <div className="flex justify-between mt-6">
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full mr-4">
            <Link to="/profile/following">
              {user?.followers.length} <span> Followers</span>
            </Link>
          </div>
          <div className="p-1 pl-2 pr-2 md:p-2 bg-green-600 text-white rounded-full">
            <Link to="/profile/following">
              {user?.following.length} <span>Following</span>
            </Link>
          </div>
        </div>
        {!userToSearh_Id && (
          <button
            className="absolute top-2 right-2 w-1/5 md:w-1/12 p-2 bg-pink-600 text-white rounded-md font-semibold font-mono"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        )}
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
