import { useEffect, useState } from "react";
import "./SearchUser.scss";
import axios from "axios";
import User from "../User/User";
import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurSearchUser } from "../../Slices/userSlice";
const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [box, setBox] = useState(false);
  const [searchInp, setSearchInp] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/users");
        setUsers(data.users);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllUsers();
  });
  useEffect(() => {
    const filterUsers = () => {
      const userArr = users.filter((user) =>
        user.name.toLowerCase().includes(searchInp.toLowerCase())
      );
      setFilteredUsers(userArr);
    };
    if (searchInp) {
      filterUsers();
    } else {
      setFilteredUsers(null);
    }
  }, [searchInp, users]);
  const handleChange = (e) => {
    setSearchInp(e.target.value);
  };
  return (
    <div className="searchUserBox">
      <div className="searchUser">
        <SearchOutlined />
        <input
          onFocus={() => setBox(true)}
          onBlur={() => setTimeout(() => setBox(false), 100)}
          value={searchInp}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="search-user"
        />
        {box && (
          <div className="searchBox">
            {filteredUsers ? (
              filteredUsers.map((user) => (
                <Link
                  key={user._id}
                  to={`/profile/${user.name}`}
                  onClick={() => dispatch(setCurSearchUser(user))}
                >
                  <div className="searchUser" style={{ border: "none" }}>
                    <img src={user.avatar.url} alt="user" />
                    <p>{user.name}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ marginLeft: "10vmax", fontamily: "math" }}>
                search by name
              </p>
            )}
          </div>
        )}
      </div>
      <div className="displayUsers">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
