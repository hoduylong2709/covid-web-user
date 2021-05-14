import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const changePasswordStart = () => {
  return {
    type: actionTypes.CHANGE_PASSWORD_START
  };
}

export const changePasswordSuccess = (isSuccess) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    isSuccess
  };
}

export const changePasswordFail = (error) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAIL,
    error
  };
}

export const changePassword = (oldPassword, newPassword) => {
  return dispatch => {
    dispatch(changePasswordStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const changePasswordData = {
      oldPassword,
      newPassword
    };
    axios.put('/User/profile/password', changePasswordData, config)
      .then(response => {
        dispatch(changePasswordSuccess(response.data.isSuccess));
      })
      .catch(error => {
        dispatch(changePasswordFail(error.response.data.message))
      });
  };
}

export const closeChangePasswordModal = () => {
  return {
    type: actionTypes.CLOSE_CHANGE_PASSWORD_MODAL
  };
}