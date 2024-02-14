import { useState } from "react";
import "./Friends.scss";
import { useSelector } from "react-redux";
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
     
    </div>
  );
};

export default Friends;
