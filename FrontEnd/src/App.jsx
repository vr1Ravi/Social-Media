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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { loadingUser } = useSelector((state) => state.user);

  useEffect(() => {
    loadUser(dispatch);
  }, []);
  if (loadingUser) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="oval-loading"
          strokeWidth="7"
        />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {isAuthenticated && <Header />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Onboarding />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            }
          />
          <Route path={`/:userName`} element={<UserProfile />} />
          <Route
            path={`/:userName/settings`}
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <UserProfileSetting />
              )
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
