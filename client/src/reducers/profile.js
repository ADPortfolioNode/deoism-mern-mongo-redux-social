/* eslint-disable import/no-anonymous-default-export */
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
console.log("reducer payload: " ,type ,payload);
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }; 

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        repos: [],
      }; 

    case CLEAR_PROFILE:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        repos: [], 
      };

    default:
      return state;
  }
}
