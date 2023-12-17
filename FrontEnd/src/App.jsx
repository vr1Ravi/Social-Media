import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";

import Login from "./Components/Login/Login";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/userAction";
import { getPostsOfFollwingUsers } from "./Actions/postsAction";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./Components/Home/Home";
import UserProfile from "./Components/UserProfile/UserProfile";
import { Oval } from "react-loader-spinner";
import Register from "./Components/Register/Register";
// import User from "./Components/User/User";
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.loading);
  const loggedInUser = useSelector((state) => state.user.user);

  useEffect(() => {
    loadUser(dispatch);
    console.log("App");
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path={`/profile/${loggedInUser && loggedInUser._id}`}
          element={
            <UserProfile
              userName={loggedInUser?.name}
              userAvatar={loggedInUser?.avatar.url}
              userEmail={loggedInUser?.email}
              userBio={loggedInUser?.bio}
              userJoinedDate={loggedInUser?.joinedDate}
              userFollowers={loggedInUser?.followers}
              userFollowing={loggedInUser?.following}
              userPosts={loggedInUser?.posts}
              userId={loggedInUser?._id}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
