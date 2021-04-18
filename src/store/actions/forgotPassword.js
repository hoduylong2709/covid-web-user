import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const recoverPasswordStart = () => {
  return {
    type: actionTypes.RECOVER_PASSWORD_START
  };
}

export const recoverPasswordSuccess = (isSuccess, message) => {
  return {
    type: actionTypes.RECOVER_PASSWORD_SUCCESS,
    isSuccess: isSuccess,
    message: message
  };
}

export const recoverPasswordFailed = (error) => {
  return {
    type: actionTypes.RECOVER_PASSWORD_FAILED,
    error: error
  };
}

export const recoverPassword = (recoverEmail) => {
  return dispatch => {
    dispatch(recoverPasswordStart());
    axios.post("/Authorization/forgotpassword", recoverEmail)
      .then(response => {
        console.log(response);
        dispatch(recoverPasswordSuccess(response.isSuccess, response.message));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(recoverPasswordFailed(error.response.data.message));
      });
  };
}