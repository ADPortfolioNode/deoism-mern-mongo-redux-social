import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST
} from "./types";

//get posts

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert("Post Failed", "danger"));
  }
};

//get post

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { err }
    });

    dispatch(setAlert("Post request Failed", "danger"));
  }
};

//ADD LIKE

export const addLike = (_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${_id}`);
    console.log("add like action ", _id);
    dispatch({
      type: UPDATE_LIKES,
      payload: { _id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { err }
    });

    dispatch(setAlert("like Failed", "danger"));
  }
};

//remove LIKE

export const removeLike = (_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { _id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert("like Failed", "danger"));
  }
};

//DELETE POST

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: { id }
    });
    dispatch(setAlert("Post Removed ", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert("post removed ", "danger"));
  }
};

//add  post

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`/api/posts/`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { err }
    });

    dispatch(setAlert("Post Failed", "danger"));
  }
};
