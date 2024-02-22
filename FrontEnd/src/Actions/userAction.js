import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFaliure,
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFaliure,
  registerRequest,
  registerSuccess,
  registerFaliure,
  updateUserInfo,
} from "../Slices/userSlice";

export const loginUser = async (email, password, dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFaliure(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get("/api/v1/me");

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFaliure(error.response.data.message));
    console.log(error);
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
    location.href = "/";
    setTimeout(dispatch(logoutSuccess()), 100);
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
