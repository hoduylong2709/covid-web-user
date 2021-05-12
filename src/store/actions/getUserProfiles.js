import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const getUserProfilesStart = () => {
  return {
    type: actionTypes.GET_USER_PROFILES_START
  };
}

export const getUserProfilesSuccess = (isSuccess, userProfiles) => {
  return {
    type: actionTypes.GET_USER_PROFILES_SUCCESS,
    isSuccess,
    userProfiles
  };
}

export const getUserProfilesFail = (error) => {
  return {
    type: actionTypes.GET_USER_PROFILES_FAIL,
    error
  };
}

export const getUserProfiles = () => {
  return dispatch => {
    dispatch(getUserProfilesStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/User/profile', config)
      .then(response => {
        dispatch(getUserProfilesSuccess(response.data.isSuccess, response.data.data));
      })
      .catch(error => {
        dispatch(getUserProfilesFail(error.response.data.message));
      });
  };
}