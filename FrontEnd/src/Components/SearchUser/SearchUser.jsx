import { useEffect, useState } from "react";
import "./SearchUser.scss";
import axios from "axios";
import User from "../User/User";
import { SearchOutlined } from "@mui/icons-material";
const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [box, setBox] = useState(false);
  const [searchInp, setSearchInp] = useState("");
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
  return (
    <div className="searchUserBox">
      <div className="searchUser">
        <SearchOutlined />
        <input
          onFocus={() => setBox(true)}
          onBlur={() => setBox(false)}
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          type="text"
          placeholder="search-user"
        />
        {box && <div className="searchBox"></div>}
      </div>
      <div className="displayUsers">
        {users.map((user) => (
          <User
            key={user._id}
            name={user.name}
            image={user.avatar.url}
            bio={user.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
