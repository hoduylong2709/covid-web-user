import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const editProfilesStart = () => {
  return {
    type: actionTypes.EDIT_PROFILES_START
  };
}

export const editProfilesSuccess = (isSuccess) => {
  return {
    type: actionTypes.EDIT_PROFILES_SUCCESS,
    isSuccess
  };
}

export const editProfilesFail = (error) => {
  return {
    type: actionTypes.EDIT_PROFILES_FAIL,
    error
  };
}

export const editProfiles = (
  firstName,
  lastName,
  phoneNumber,
  dateOfBirth,
  gender,
  idNo,
  nationality,
  address
) => {
  return dispatch => {
    dispatch(editProfilesStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const editData = {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      idNo,
      nationality,
      address
    };
    axios.put('/User/profile', editData, config)
      .then(response => {
        dispatch(editProfilesSuccess(response.data.isSuccess));
      })
      .catch(error => {
        dispatch(editProfilesFail(error.response.data.message));
      })
  };
}

export const closeEditProfilesModal = () => {
  return {
    type: actionTypes.CLOSE_EDIT_PROFILES_MODAL
  };
}

