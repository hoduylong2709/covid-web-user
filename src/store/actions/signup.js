import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signupSuccess = (isSuccess, accountId) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    isSuccess: isSuccess,
    accountId: accountId
  };
};

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  };
};

export const signup = (email, password, firstName, lastName) => {
  return dispatch => {
    dispatch(signupStart());
    const signupData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
    axios.post("/Authorization/register", signupData)
      .then(response => {
        dispatch(signupSuccess(response.data.isSuccess, response.data.accountId));
      })
      .catch(error => {
        dispatch(signupFail(error.response.data.message));
      });
  };
};

export const closeModalSignup = () => {
  return {
    type: actionTypes.CLOSE_MODAL_SIGNUP
  };
};