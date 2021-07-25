import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (isSuccess, userId, token, fullName, role, isVerified, email) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    isSuccess: isSuccess,
    userId: userId,
    token: token,
    fullName: fullName,
    role: role,
    isVerified: isVerified,
    email: email
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const closeModalErrorLogin = () => {
  return {
    type: actionTypes.CLOSE_MODAL_ERROR_LOGIN
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    const loginData = {
      email: email,
      password: password
    };
    axios.post("/Authorization/user/login", loginData)
      .then(response => {
        setTimeout(() => {
          dispatch(loginSuccess(response.data.isSuccess, response.data.data.id, response.data.data.token, response.data.data.fullName, response.data.data.role, response.data.data.isVerified, response.data.data.email));
        }, 2000);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', response.data.data.fullName);
        localStorage.setItem('isVerified', response.data.data.isVerified);
        localStorage.setItem('email', response.data.data.email);
      })
      .catch(error => {
        // dispatch(loginFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, loginFail);
      });
  };
};

export const navigateAfterLoginStart = () => {
  return {
    type: actionTypes.NAVIGATE_AFTER_LOGIN_START
  };
}

export const navigateAfterLoginSuccess = (token, userName) => {
  return {
    type: actionTypes.NAVIGATE_AFTER_LOGIN_SUCCESS,
    token: token,
    userName: userName
  };
}

export const navigateAfterLoginFailed = (error) => {
  return {
    type: actionTypes.NAVIGATE_AFTER_LOGIN_FAILED,
    error: error
  };
}

export const navigateAfterLogin = () => { }