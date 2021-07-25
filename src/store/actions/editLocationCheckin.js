import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const editLocationCheckinStart = () => {
  return {
    type: actionTypes.EDIT_LOCATION_CHECKIN_START
  };
}

export const editLocationCheckinSuccess = (isSuccess) => {
  return {
    type: actionTypes.EDIT_LOCATION_CHECKIN_SUCCESS,
    isSuccess
  };
}

export const editLocationCheckinFail = (error) => {
  return {
    type: actionTypes.EDIT_LOCATION_CHECKIN_FAIL,
    error
  };
}

export const editLocationCheckin = (id, address, time) => {
  return dispatch => {
    dispatch(editLocationCheckinStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const editData = { id, address, time };
    axios.put(`/User/itinerary/location-checkin/${id}`, editData, config)
      .then(response => {
        dispatch(editLocationCheckinSuccess(response.data.isSuccess));
      })
      .catch(error => {
        // dispatch(editLocationCheckinFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, editLocationCheckinFail);
      });
  };
}

export const closeEditLocationCheckinModal = () => {
  return {
    type: actionTypes.CLOSE_EDIT_LOCATION_CHECKIN_MODAL
  };
}

export const finishEditLocationCheckin = () => {
  return {
    type: actionTypes.FINISH_EDIT_LOCATION_CHECKIN
  };
}