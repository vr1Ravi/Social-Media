import axios from "axios";
import {
  postOfFollowingUsersRequest,
  postOfFollowingUsersSuccess,
  postOfFollowingUsersFaliure,
  uploadPostRequest,
  uploadPostSuccess,
  uploadPostFaliure,
} from "../Slices/postSlice";
import { loadUser } from "./userAction";

export const getPostsOfFollwingUsers = async (dispatch) => {
  try {
    dispatch(postOfFollowingUsersRequest());
    const { data } = await axios.get("/api/v1/posts");
    dispatch(postOfFollowingUsersSuccess(data.posts));
  } catch (error) {
    dispatch(postOfFollowingUsersFaliure(error.response.data.message));
  }
};

// Upload post
export const uploadPost = async (formData, dispatch) => {
  try {
    dispatch(uploadPostRequest());
    const { data } = await axios.post(
      "/api/v1/post/upload",

      formData,

      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    dispatch(uploadPostSuccess(data.post));
    loadUser(dispatch);
  } catch (error) {
    dispatch(uploadPostFaliure(error.response.data.message));
  }
};

// Delete post
export const deletePost = async (postId, dispatch) => {
  try {
    const { data } = await axios.delete(`/api/v1/post/${postId}`);

    await loadUser(dispatch);
    return data.message;
  } catch (error) {
    return null;
  }
};

// UpdateCaption

export const updatePostCaption = async (newCaption, postId) => {
  try {
    const { data } = await axios.put(
      `/api/v1/post/${postId}`,
      { newCaption },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.message;
  } catch (error) {
    return null;
  }
};

// getRandomPosts
export const geRandomPosts = async () => {
  try {
    const { data } = await axios.get("/api/v1/random/posts");
    return data.randomPosts;
  } catch (error) {
    return null;
  }
};

// postComment
export const postComment = async (id, comment) => {
  try {
    const { data } = axios.put(
      `/api/v1/post/comment/${id}`,
      { comment },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.message;
  } catch (error) {
    return null;
  }
};

//PostAction
export const likeUnlikePost = async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/post/${id}`);
  } catch (error) {
    console.log(error);
  }
};
