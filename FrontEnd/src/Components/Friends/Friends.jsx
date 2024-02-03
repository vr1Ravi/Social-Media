import { useState } from "react";
import "./Friends.scss";
import { useSelector } from "react-redux";
import User from "../User/User";
const Friends = () => {
  const [type, setType] = useState("Followers");
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const handleFollowersClick = () => {
    setType("Followers");
  };
  const handleFollowingClick = () => {
    setType("Following");
  };
  return (
    <div className="friends">
      <h1>{user?.name}</h1>
      <div className="friendsHeader">
        <button
          style={{ color: type === "Followers" && "white" }}
          onClick={handleFollowersClick}
        >
          Followers
        </button>
        <button
          style={{ color: type === "Following" && "white" }}
          onClick={handleFollowingClick}
        >
          Following
        </button>
      </div>
      {type === "Followers" ? (
        <div className="displayUsers">
          {user?.followers.length ? (
            user.followers.map((user) => <User key={user._id} user={user} />)
          ) : (
            <p className="para">No Followers 👴 </p>
          )}
        </div>
      ) : (
        <div className="displayUsers">
          {user?.following ? (
            user.following.map((user) => <User key={user._id} user={user} />)
          ) : (
            <p className="para">No Following 👴</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;
