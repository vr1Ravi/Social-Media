import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFaliure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFaliure,
  registerRequest,
  registerSuccess,
  registerFaliure,
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

export const logOutUser = async () => {
  try {
    const { data } = await axios.get("/api/v1/logout");
    return data.message;
  } catch (error) {
    return null;
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
