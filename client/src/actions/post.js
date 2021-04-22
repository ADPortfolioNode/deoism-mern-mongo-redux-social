import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

//get post

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
    setAlert(err);
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
  }
};
