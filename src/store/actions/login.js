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
        dispatch(loginSuccess(response.data.isSuccess, response.data.data.id, response.data.data.token, response.data.data.fullName, response.data.data.role));
        localStorage.setItem('token', response.data.data.token);
      })
      .catch(error => {
        dispatch(loginFail(error.response.data.message));
      });
  };
};