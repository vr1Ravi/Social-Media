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
    <div className=" h-screen w-1/6 flex flex-col justify-evenly border-r-2 items-center border-slate-400 ">
      <Link className="w-1/2" to="/" onClick={() => setCurrentTab("/")}>

        {currentTab === "/" ?
         <div className="  flex justify-around items-center text-green-600">
          <Home/><p className= "font-bold ">Home</p>
          </div>
           : <div className=" flex justify-around items-center"><HomeOutlined /><p className="font-semibold ">Home</p></div> }
        
      </Link>
      <Link className="w-1/2" to="/" onClick={() => setCurrentTab("/search")}>
        {currentTab === "/search" ? (
        <div className="flex justify-around items-center text-green-600">
            <Search />
          <p  className=" font-bold">Search</p>
        </div>
        ) : (
          <div className="flex justify-around items-center">
            <SearchOutlined />
            <p className="font-semibold ">Search</p>
          </div>
        )}
      </Link>
      <Link className="w-1/2" to="/" onClick={() => setCurrentTab("/friends")}>

        {currentTab === "/friends" ?
           <div className="flex justify-around items-center text-green-600">
            <GroupIcon />
         <p className= "font-bold ">Friends</p>
           </div>
          : 
          <div className="flex justify-around items-center">
            <PeopleOutlineIcon />
            <p className="font-semibold ">Friends</p>
          </div>
          }
      </Link>

      <Link className="w-1/2" to={`/`} onClick={() => setCurrentTab("/me")}>
        {currentTab === "/me" ?
         <div className="flex justify-around items-center text-green-600">
          <AccountCircle />
         <p className=" font-bold">Profile</p>
         </div>
         :
         
          <div className="flex justify-around items-center">
              <AccountCircleOutlined />
              <p className="font-semibold ">Profile</p>
          </div>

          }
      </Link>
    </div>
  );
};

export default Header;
