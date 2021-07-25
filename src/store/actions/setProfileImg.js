import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const setProfileImage = (profileImg, isSuccess) => {
  return {
    type: actionTypes.SET_PROFILE_IMAGE,
    profileImg,
    isSuccess
  };
}

export const setProfileImageFail = (error) => {
  return {
    type: actionTypes.SET_PROFILE_IMAGE_FAIL,
    error
  };
}

export const getProfileImage = () => {
  return dispatch => {
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/User/profile/avatar', config)
      .then(response => {
        dispatch(setProfileImage(response.data.data, response.data.isSuccess));
      })
      .catch(error => {
        // dispatch(setProfileImageFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, setProfileImageFail);
      });
  };
}