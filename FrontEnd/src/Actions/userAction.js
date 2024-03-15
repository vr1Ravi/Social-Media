import axios from "axios";
import {
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
  registerRequest,
  registerSuccess,
  registerFaliure,
  updateUserInfo,
  loadUserRequest,
  loadUserSuccess,
  loadUserFaliure,
} from "../Slices/userSlice";

export const loginUser = async (email, password, dispatch) => {
  try {
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(data);
    localStorage.setItem("botPosts", JSON.stringify(data.bot_posts));
    dispatch(loginSuccess(data.user));
    localStorage.setItem("isAuthenticated", true);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`/api/v1/me`);
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(loadUserFaliure(error.response.data.message));
  }
};
export const loadOnUpdate = async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/me");
    dispatch(updateUserInfo(data.user));
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (dispatch, formData) => {
  try {
    const { data } = await axios.put("/api/v1/update/profile", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (data) {
      await loadUser(dispatch);
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const logOutUser = async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await axios.get("/api/v1/logout");
    localStorage.removeItem("isAuthenticated");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFaliure(error.message));
  }
};

export const registerUser = async (dispatch, formData) => {
  try {
    dispatch(registerRequest());
    const { data } = await axios.post("/api/v1/register", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (data) {
      dispatch(registerSuccess(data.user));
    }
  } catch (error) {
    dispatch(registerFaliure(error.response.data.message));
  }
};

// export const followUnfollowUser = async (dispatch, userId) => {
//   try {
//     dispatch(followUnfolowRequest());
//     const { data } = await axios.get(`/api/v1/follow/${userId}`);
//     if (data) dispatch(followUnfolowSuccess(data.message));
//     loadOnUpdate(dispatch);
//     return data.message;
//   } catch (error) {
//     return false;
//   }
// };

export const fetchAllUsers = async ({ queryKey }) => {
  const page = queryKey[1];
  try {
    const { data } = await axios.get(`/api/v1/users?page=${page}`);
    return data.users;
  } catch (error) {
    return [];
  }
};

export const fetchUser = async ({ queryKey }) => {
  const id = queryKey[1];
  if (id === undefined) return null;
  const { data } = await axios.get(`/api/v1/user/${id}`);
  return data.user;
};
