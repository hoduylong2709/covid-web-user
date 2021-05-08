import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const getLocationCheckinStart = () => {
  return {
    type: actionTypes.GET_LOCATION_CHECKIN_START
  };
}

export const getLocationCheckinSuccess = (checkinList, isSuccess) => {
  return {
    type: actionTypes.GET_LOCATION_CHECKIN_SUCCESS,
    checkinList,
    isSuccess
  };
}

export const getLocationCheckinFail = (error) => {
  return {
    type: actionTypes.GET_LOCATION_CHECKIN_FAIL,
    error
  };
}

export const getLocationCheckin = () => {
  return dispatch => {
    dispatch(getLocationCheckinStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/User/itinerary/location-checkin', config)
      .then(response => {
        dispatch(getLocationCheckinSuccess(response.data.data, response.data.isSuccess));
      })
      .catch(error => {
        dispatch(getLocationCheckinFail(error.response.data.message));
      });
  };
}