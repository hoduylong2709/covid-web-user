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
    axios.post("/register", signupData)
      .then(response => {
        // console.log(response);
        dispatch(signupSuccess(response.data.isSuccess, response.data.accountId));
      })
      .catch(error => {
        console.log(error.response.data.error);
        dispatch(signupFail(error.response.data.error));
      });
  };
};