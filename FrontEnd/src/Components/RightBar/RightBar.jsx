import { useEffect, useState } from "react";
import "./RightBar.scss";
import axios from "axios";
import { followUnfollowUser } from "../../Actions/userAction";
import { useSelector, useDispatch } from "react-redux";
const RightBar = () => {
  const [bots, setBot] = useState([]);
  const [callOnce, setCallOnce] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    async function getBots() {
      const res = await axios.get("/api/v1/users/bots");
      setBot(res.data.bots);
      setCallOnce(false);
    }

    if (callOnce) getBots();
  }, [callOnce]);

  return (
    <>
      <div className="homeRight">
        <div className="randomUsers">
          <h1 style={{ color: "white", fontSize: "2vmax" }}>Whom to Follow</h1>
          {bots.map((bot) => (
            <Bot
              key={bot._id}
              bot={bot}
              isFollowing={user.following.includes(bot._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Bot = ({ bot, isFollowing }) => {
  const [followed, setFollowed] = useState(isFollowing);
  const dispatch = useDispatch();
  const handleFollow = async () => {
    const res = await followUnfollowUser(dispatch, bot._id);
    if (res) setFollowed(!followed);
  };
  return (
    <div>
      <div>
        <img className="userImage" src={bot.avatar.url} alt="user" />
        <h3 style={{ color: "white", fontSize: "2vmax" }}>{bot.name}</h3>
      </div>

      <button style={{ fontSize: "1.2vmax" }} onClick={() => handleFollow()}>
        {followed ? "Following" : "Follow"}
      </button>
    </div>
  );
};
export default RightBar;
