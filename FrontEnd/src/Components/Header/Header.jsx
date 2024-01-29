import "./Header.scss";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const currentPath = window.location.pathname; // To get current url path.
  const [currentTab, setCurrentTab] = useState(currentPath);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="header">
      <Link to="/" onClick={() => setCurrentTab("/")}>
        {currentTab === "/" ? <Home /> : <HomeOutlined />}
        <span>Home</span>
      </Link>
      <Link to="/search" onClick={() => setCurrentTab("/search")}>
        {currentTab === "/search" ? (
          <Search style={{ fontWeight: "bold" }} />
        ) : (
          <SearchOutlined />
        )}
        <span>Search</span>
      </Link>
      <Link to="/friends" onClick={() => setCurrentTab("/friends")}>
        {currentTab === "/friends" ? <GroupIcon /> : <PeopleOutlineIcon />}
        <span>Friends</span>
      </Link>

      <Link to={`/${user.name}`} onClick={() => setCurrentTab("/me")}>
        {currentTab === "/me" ? <AccountCircle /> : <AccountCircleOutlined />}
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default Header;
