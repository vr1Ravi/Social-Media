import "./User.scss";
import { useDispatch } from "react-redux";

import { setCurSearchUser } from "../../Slices/userSlice";
import { Link } from "react-router-dom";
const User = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={`/profile/${user.name}`}
      onClick={() => dispatch(setCurSearchUser(user))}
      style={{ textDecoration: "none", color: "black", fontFamily: "math" }}
    >
      <div className="userBox">
        <div className="leftSide">
          <div className="userImage">
            <img src={user.avatar.url} alt="userImage" />
          </div>

          <p>{user.bio}</p>
        </div>
        <div className="rightSide">
          <p>{user.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default User;
