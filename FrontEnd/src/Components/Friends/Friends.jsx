import { useState } from "react";
import { useSelector } from "react-redux";
import User from "./User";
const Friends = () => {
  const [type, setType] = useState("Followers");
  const { user } = useSelector((state) => state.user);
  const handleFollowersClick = () => {
    setType("Followers");
  };
  const handleFollowingClick = () => {
    setType("Following");
  };
  return (
    <div className="w-full md:w-4/5 flex flex-col">
      <div className="flex flex-wrap justify-around border border-b-2 border-t-0 border-l-0 border-r-0 *:p-8 *:text-white *:w-1/2 *:h-full">
        <button
          style={{
            backgroundColor: type === "Followers" ? "rgb(34 197 94)" : "white",
            color: type === "Followers" ? "white" : "black",
          }}
          onClick={handleFollowersClick}
        >
          Followers
        </button>
        <button
          style={{
            backgroundColor: type === "Following" ? "rgb(34 197 94)" : "white",
            color: type === "Following" ? "white" : "black",
          }}
          onClick={handleFollowingClick}
        >
          Following
        </button>
      </div>
      <div className=" flex  justify-start p-4 h-screen">
        <User isLoggedInUser={true} />
      </div>
    </div>
  );
};

export default Friends;
