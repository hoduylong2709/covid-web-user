import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const verifyAfterLoginStart = () => {
  return {
    type: actionTypes.VERIFY_AFTER_LOGIN_START
  };
};

export const verifyAfterLoginSuccess = (isSuccess) => {
  return {
    type: actionTypes.VERIFY_AFTER_LOGIN_SUCCESS,
    verifySuccess: isSuccess
  };
};

export const verifyAfterLoginFail = (error) => {
  return {
    type: actionTypes.VERIFY_AFTER_LOGIN_FAIL,
    verifyError: error
  };
};

export const verifyEmailAfterLogin = (email, code) => {
  return dispatch => {
    dispatch(verifyAfterLoginStart());
    const verifyData = {
      email: email,
      code: code
    };
    axios.post("/Authorization/email", verifyData)
      .then(response => {
        dispatch(verifyAfterLoginSuccess(response.data.isSuccess));
        localStorage.setItem('isVerified', true);
        window.location.reload();
      })
      .catch(error => {
        dispatch(verifyAfterLoginFail(error.response.data.message));
      });
  };
};

export const closeVerifyModalAfterLogin = () => {
  return {
    type: actionTypes.CLOSE_VERIFY_MODAL_AFTER_LOGIN
  };
};