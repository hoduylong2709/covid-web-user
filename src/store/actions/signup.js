import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signupSuccess = (isSuccess, accountId, isVerified) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    isSuccess: isSuccess,
    accountId: accountId,
    isVerified: isVerified
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
        dispatch(signupSuccess(response.data.isSuccess, response.data.accountId, response.data.isVerified));
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

export const closeVerifyModalSignup = () => {
  return {
    type: actionTypes.CLOSE_VERIFY_MODAL_SIGNUP
  };
};

export const verifyStart = () => {
  return {
    type: actionTypes.VERIFY_START
  };
};

export const verifySuccess = (isSuccess, message) => {
  return {
    type: actionTypes.VERIFY_SUCCESS,
    verifySuccess: isSuccess,
    verifyMessage: message
  };
};

export const verifyFail = (error) => {
  return {
    type: actionTypes.VERIFY_FAIL,
    verifyError: error
  };
};

export const verifyEmail = (accountId, code) => {
  return dispatch => {
    dispatch(verifyStart());
    const verifyData = {
      accountId: accountId,
      code: code
    };
    axios.post("/Authorization/email", verifyData)
      .then(response => {
        dispatch(verifySuccess(response.data.isSuccess, response.data.message));
      })
      .catch(error => {
        dispatch(signupFail(error.response.data.message));
      });
  };
};
