import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";

import Login from "./Components/Login/Login";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/userAction";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./Components/Home/Home";
import UserProfile from "./Components/UserProfile/UserProfile";
import { Oval } from "react-loader-spinner";
import Register from "./Components/Register/Register";
import SearchUser from "./Components/SearchUser/SearchUser";
import Friends from "./Components/Friends/Friends";
import Onboarding from "./Components/Onboarding/Onboarding";
import UserProfileSetting from "./Components/UserProfileSetting/UserProfileSetting";
import ComposePost from "./Components/ComposePost/ComposePost";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const curSearchUser = useSelector((state) => state.user.curSearchUser);
  const isLoading = useSelector((state) => state.user.loading);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    loadUser(dispatch);
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
        <Route path="/" element={isAuthenticated ? <Home /> : <Onboarding />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path={`/:userName`}
          element={
            <UserProfile
              userName={user?.name}
              userAvatar={user?.avatar.url}
              userEmail={user?.email}
              userBio={user?.bio}
              userJoinedDate={user?.joinedDate}
              userFollowers={user?.followers}
              userFollowing={user?.following}
              userPosts={user?.posts}
              userId={user?._id}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path={`/:userName/settings`} element={<UserProfileSetting />} />
        <Route
          path={`/profile/${curSearchUser?.name}`}
          element={
            <UserProfile
              userName={curSearchUser?.name}
              userAvatar={curSearchUser?.avatar.url}
              userEmail={curSearchUser?.email}
              userBio={curSearchUser?.bio}
              userJoinedDate={curSearchUser?.joinedDate}
              userFollowers={curSearchUser?.followers}
              userFollowing={curSearchUser?.following}
              userPosts={curSearchUser?.posts}
              userId={curSearchUser?._id}
              isAuthenticatedUser={false}
            />
          }
        />
        <Route
          path="/compose/post"
          element={
            <ComposePost>
              <Home />
            </ComposePost>
          }
        />
        <Route path="/friends" element={<Friends />} />
        <Route path="/search" element={<SearchUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
