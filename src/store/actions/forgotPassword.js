import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

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

export const closeModalErrorRecoverPassword = () => {
  return {
    type: actionTypes.CLOSE_MODAL_ERROR_RECOVER_PASSWORD
  };
}

export const recoverPassword = (recoverEmail) => {
  return dispatch => {
    dispatch(recoverPasswordStart());
    const recoverData = {
      email: recoverEmail
    };
    axios.post("/Authorization/forgotpassword/code", recoverData)
      .then(response => {
        console.log(response);
        dispatch(recoverPasswordSuccess(response.data.isSuccess, response.data.message));
      })
      .catch(error => {
        // console.log(error.response);
        // dispatch(recoverPasswordFailed(error.response.data.message));
        handleTimeoutRequest(dispatch, error, recoverPasswordFailed);
      });
  };
}

export const recoverProcessStart = () => {
  return {
    type: actionTypes.RECOVER_PROCESS_START
  };
}

export const recoverProcessSuccess = (isSuccess, message) => {
  return {
    type: actionTypes.RECOVER_PROCESS_SUCCESS,
    recoverSuccess: isSuccess,
    recoverMessage: message
  };
}

export const recoverProcessFailed = (error) => {
  return {
    type: actionTypes.RECOVER_PROCESS_FAILED,
    recoverError: error
  };
}

export const closeRecoverProcessModal = () => {
  return {
    type: actionTypes.CLOSE_RECOVER_PROCESS_MODAL
  };
}

export const recoverProcess = (email, code, password) => {
  return dispatch => {
    dispatch(recoverProcessStart());
    const recoverProcessData = {
      email: email,
      code: code,
      password: password
    };
    axios.post("/Authorization/forgotpassword", recoverProcessData)
      .then(response => {
        console.log(response);
        dispatch(recoverProcessSuccess(response.data.isSuccess, response.data.message));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(recoverProcessFailed(error.response.data.message));
      });
  };
}