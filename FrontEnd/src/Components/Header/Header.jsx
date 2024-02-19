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
  const currentPath = localStorage.getItem("path") || "/";
  const [currentTab, setCurrentTab] = useState(currentPath);
  const user = useSelector((state) => state.user.user);
  return (
    <div className=" absolute w-screen bottom-0  md:h-screen md:w-1/5 flex md:flex-col justify-evenly border-r-2 items-center border-slate-400   md:static">
      <Link className="w-1/2" to="/" onClick={() => setCurrentTab("/")}>
        {currentTab === "/" ? (
          <div className="  flex justify-around items-center text-green-600">
            <Home />
            <p className="font-bold hidden md:block">Home</p>
          </div>
        ) : (
          <div className=" flex justify-around items-center">
            <HomeOutlined />
            <p className="font-semibold hidden md:block">Home</p>
          </div>
        )}
      </Link>
      <Link
        className="w-1/2"
        to="/search"
        onClick={() => {
          localStorage.setItem("path", "/search");
          setCurrentTab("/search");
        }}
      >
        {currentTab === "/search" ? (
          <div className="flex justify-around items-center text-green-600">
            <Search />
            <p className=" font-bold hidden md:block">Search</p>
          </div>
        ) : (
          <div className="flex justify-around items-center">
            <SearchOutlined />
            <p className="font-semibold hidden md:block">Search</p>
          </div>
        )}
      </Link>
      <Link
        className="w-1/2"
        to="/friends"
        onClick={() => {
          localStorage.setItem("path", "/friends");
          setCurrentTab("/friends");
        }}
      >
        {currentTab === "/friends" ? (
          <div className="flex justify-around items-center text-green-600">
            <GroupIcon />
            <p className="font-bold hidden md:block">Friends</p>
          </div>
        ) : (
          <div className="flex justify-around items-center">
            <PeopleOutlineIcon />
            <p className="font-semibold hidden md:block">Friends</p>
          </div>
        )}
      </Link>

      <Link
        className="w-1/2"
        to={`/${user.name}`}
        onClick={() => {
          localStorage.setItem("path", "/me");
          setCurrentTab("/me");
        }}
      >
        {currentTab === "/me" ? (
          <div className="flex justify-around items-center text-green-600">
            <AccountCircle />
            <p className=" font-bold hidden md:block">Profile</p>
          </div>
        ) : (
          <div className="flex justify-around items-center">
            <AccountCircleOutlined />
            <p className="font-semibold hidden md:block">Profile</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default Header;
