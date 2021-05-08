import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const checkinLocationstart = () => {
  return {
    type: actionTypes.CHECKIN_LOCATION_START
  };
}

export const checkinLocationSuccess = (isSuccess) => {
  return {
    type: actionTypes.CHECKIN_LOCATION_SUCCESS,
    isSuccess
  };
}

export const checkinLocationFail = (error) => {
  return {
    type: actionTypes.CHECKIN_LOCATION_FAIL,
    error
  };
}

export const checkinLocation = (address) => {
  return dispatch => {
    dispatch(checkinLocationstart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const checkinLocationInfo = {
      address
    };
    axios.post('', checkinLocationInfo, config)
      .then(response => {
        dispatch(checkinLocationSuccess(response.data.isSuccess));
      })
      .catch(error => {
        dispatch(checkinLocationFail(error.response.data.message));
      });
  };
}

export const closeModalCheckinLocation = () => {
  return {
    type: actionTypes.CLOSE_MODAL_CHECKIN_LOCATION
  };
}