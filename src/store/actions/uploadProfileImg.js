import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const uploadProfileImageStart = () => {
  return {
    type: actionTypes.UPLOAD_PROFILE_IMAGE_START
  };
}

export const uploadProfileImageSuccess = (isSuccess) => {
  return {
    type: actionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS,
    isSuccess
  };
}

export const uploadProfileImageFail = (error) => {
  return {
    type: actionTypes.UPLOAD_PROFILE_IMAGE_FAIL,
    error
  };
}

export const uploadProfileImage = (imgFile) => {
  return dispatch => {
    dispatch(uploadProfileImageStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const formData = new FormData();
    formData.append('avatar', imgFile);
    axios.post('/User/profile/avatar', formData, config)
      .then(response => {
        dispatch(uploadProfileImageSuccess(response.data.isSuccess));
      })
      .catch(error => {
        // dispatch(uploadProfileImageFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, uploadProfileImageFail);
      });
  };
}