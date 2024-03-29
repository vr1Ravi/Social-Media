import axios from "axios";
import {
  postOfFollowingUsersRequest,
  postOfFollowingUsersSuccess,
  postOfFollowingUsersFaliure,
  deletePostFaliure,
  deletePostRequest,
  deletePostSuccess,
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
export const uploadPost = async (formData, navigate) => {
  try {
    const { data } = await axios.post(
      "/api/v1/post/upload",

      formData,

      {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    );
    navigate("/");
    return data.post;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// Delete post
export const deletePost = async (postId, dispatch) => {
  try {
    dispatch(deletePostRequest());
    const { data } = await axios.delete(`/api/v1/post/${postId}`);
    dispatch(deletePostSuccess(data.message));
  } catch (error) {
    dispatch(deletePostFaliure(error.message));
    console.log(error.message);
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
      },
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
      },
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
