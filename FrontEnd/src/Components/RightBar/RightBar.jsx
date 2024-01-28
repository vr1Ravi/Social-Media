import { useEffect, useState } from "react";
import "./RightBar.scss";
import axios from "axios";
const RightBar = () => {
  const [bots, setBot] = useState([]);
  const [callOnce, setCallOnce] = useState(true);

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
          <h1 style={{ color: "white" }}>Whom to Follow</h1>
          {bots.map((bot) => (
            <Bot key={bot._id} bot={bot} />
          ))}
        </div>
      </div>
    </>
  );
};
const Bot = ({ bot }) => {
  return (
    <div>
      <div>
        <img className="userImage" src={bot.avatar.url} alt="user" />
        <h3>{bot.name}</h3>
      </div>
      <button>Follow</button>
    </div>
  );
};
export default RightBar;
