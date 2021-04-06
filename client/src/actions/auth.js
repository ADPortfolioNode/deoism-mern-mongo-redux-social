import axios from "axios"; 
 
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from "./types";

import setAuthToken from "../utils/setAuthToken";

//LOAD USER
export const loadUser = (token) => async (dispatch) => {
   if (localStorage.token || token) {
    setAuthToken(localStorage.token);
  }  
    
    try {
        const res = await axios.get("/api/auth");
 
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.error();
        dispatch({
            type: AUTH_ERROR
        });
    }
    
};
//register user


export const register = (email, name, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, name, password });

    try { 
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        
dispatch(loadUser(res.data));

    } catch (err) {  
        console.error(body, config);
        dispatch({
            type: REGISTER_FAIL 
        });
        
    }
};

//login user

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }); 


        dispatch(loadUser(res.data));
    } catch (err) {
        console.error(err, body);
       
        dispatch({
           type: LOGIN_FAIL
        });
    }
};
//LOGOUT /clear profile

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE});
};
