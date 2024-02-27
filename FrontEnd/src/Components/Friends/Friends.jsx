import { useState } from "react";

import User from "./User";
import { useSelector } from "react-redux";
const Friends = () => {
  const [type, setType] = useState("Followers");
  const { followers } = useSelector((state) => state.user);
  const { following } = useSelector((state) => state.user);
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
      <div className="flex flex-wrap gap-1 justify-evenly p-1 h-screen">
        {type === "Followers" ? (
          followers.length === 0 ? (
            <h1 className=" mt-11">You don't have any followers yet</h1>
          ) : (
            followers.map((user) => (
              <User
                key={user._id}
                id={user._id}
                isLoggedInUser={true}
                name={user.name}
                followers={user.followers.length}
                following={user.following.length}
              />
            ))
          )
        ) : following.length === 0 ? (
          <h1 className=" mt-11">Start adding some friends</h1>
        ) : (
          following.map((user) => (
            <User
              key={user._id}
              id={user._id}
              isLoggedInUser={true}
              name={user.name}
              followers={user.followers.length}
              following={user.following.length}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
