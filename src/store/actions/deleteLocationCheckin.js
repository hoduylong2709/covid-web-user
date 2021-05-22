import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const deleteLocationCheckinStart = () => {
  return {
    type: actionTypes.DELETE_LOCATION_CHECKIN_START
  };
}

export const deleteLocationCheckinSuccess = (isSuccess) => {
  return {
    type: actionTypes.DELETE_LOCATION_CHECKIN_SUCCESS,
    isSuccess
  };
}

export const deleteLocationCheckinFail = (error) => {
  return {
    type: actionTypes.DELETE_LOCATION_CHECKIN_FAIL,
    error
  };
}

export const deleteLocationCheckin = (locationId) => {
  return dispatch => {
    dispatch(deleteLocationCheckinStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.delete(`/User/itinerary/location-checkin/${locationId}`, config)
      .then(response => {
        dispatch(deleteLocationCheckinSuccess(response.data.isSuccess));
      })
      .catch(error => {
        dispatch(deleteLocationCheckinFail(error.response.data.message));
      });
  };
}

export const closeDeleteErrorModal = () => {
  return {
    type: actionTypes.CLOSE_DELETE_ERROR_MODAL
  };
}