/* eslint-disable import/no-anonymous-default-export */
import {
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_PROFILE,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_LIKES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log("reducers  payload: ", type, payload);

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
<<<<<<< HEAD

=======
>>>>>>> parent of b710ab3 (Revert "clean up and adding likes (not complete)")
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        repos: []
      };
<<<<<<< HEAD
=======
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
>>>>>>> parent of b710ab3 (Revert "clean up and adding likes (not complete)")

    case CLEAR_PROFILE:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        repos: []
      };
<<<<<<< HEAD

=======
>>>>>>> parent of b710ab3 (Revert "clean up and adding likes (not complete)")
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
<<<<<<< HEAD

=======
>>>>>>> parent of b710ab3 (Revert "clean up and adding likes (not complete)")
    default:
      return state;
  }
}
