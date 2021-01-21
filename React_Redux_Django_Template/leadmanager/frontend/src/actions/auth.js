import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

/**This is the loadUser exported and saved and controlled as
 * as const because we wouldnt want a user's information at
 * all be rewritten incorrectly.
 *
 * @param {dispatch} this is used to get the "Types" of the function and
 * based if the data sent or recieved is correct and will explain the
 * error if not with the Dispatch call.
 * @param {getState} this is to get the state of the user, this is
 * to get the check the token of the user trying to be loaded.
 **/

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/**Login is as it sounds. This protected function is exported so when
 * the user trys to log into the system it will check the username
 * and the password and determine if the saved user from a registration
 * matches the database.
 *
 *@param {username} This is so we can get the username of the user to compare
 *@param {password} This is so we can get the password of the user to compare
 *@param {dispatch} Dispatch is once again used to get the Type
 * of the scenario we are in so we can access it correctly.
 **/

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

/**Registration is so the user can register an account to the database.
 * Once a user has registered they will be able to use that account to
 * access the Web Application.
 *
 *  @param {username} Used to post the username from the field to the database.
 *  @param {password} Used to post the password from the field to the database.
 *  @param {email} Used to post the email from the field to the database.
 *  @param {dispatch} Again to defer the error as a type in the case its
 *  bad requests, or in the case the user is successful tell the system that it
 *  is with the correct type.
 **/

export const register = ({ username, password, email }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, email, password });

  axios
    .post("/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

/**This is the logout export and this takes in 2 parameters that will get the
 * state and set it to null so the system knows that the user is logged out
 * and reset the state and dispatch the correct type.
 *
 * @param {dispatch} this is used to get the "Types" of the function and
 * based if the data sent or recieved is correct and will explain the
 * error if not with the Dispatch call.
 * @param {getState} this is to get the state of the user, this is
 * to get the check the token of the user trying to be loaded.
 *
 *
 *
 *
 **/

export const logout = () => (dispatch, getState) => {
  axios.post("/api/auth/logout/", null, tokenConfig(getState)).then((res) => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  });
};

/** This is a small function made to get the Token's state
 *  of the account, so if the user has a legitament account
 *  the user's token will be accessed.
 *
 * @param {getState} this is to get the state of the user, this is
 * to get the check the token of the user trying to be loaded.
 **/

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
