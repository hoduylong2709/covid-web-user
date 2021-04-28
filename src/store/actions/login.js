import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (isSuccess, userId, token, fullName, role) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    isSuccess: isSuccess,
    userId: userId,
    token: token,
    fullName: fullName,
    role: role
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
    axios.post("/Authorization/login", loginData)
      .then(response => {
        setTimeout(() => {
          dispatch(loginSuccess(response.data.isSuccess, response.data.data.id, response.data.data.token, response.data.data.fullName, response.data.data.role));
        }, 2000);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', response.data.data.fullName);
      })
      .catch(error => {
        dispatch(loginFail(error.response.data.message));
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