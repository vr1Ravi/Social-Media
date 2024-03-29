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
import Register from "./Components/Register/Register";
import SearchUser from "./Components/SearchUser/SearchUser";
import Friends from "./Components/Friends/Friends";
import Onboarding from "./Components/Onboarding/Onboarding";
import UserProfileSetting from "./Components/UserProfileSetting/UserProfileSetting";
import ComposePost from "./Components/ComposePost/ComposePost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Errorpage from "./Components/Error/Error";
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
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    loadUser(dispatch);
  }, []);
  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading....
      </div>
    );
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {user && <Header />}
        <Routes>
          {user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Onboarding />} />
          )}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />
          <Route path={`/${user?.name}`} element={<UserProfile />} />
          <Route
            path={`/:userName/settings`}
            element={<UserProfileSetting />}
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
          <Route path={`/profile/:id`} element={<UserProfile />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
