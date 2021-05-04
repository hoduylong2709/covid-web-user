import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const setDisableDates = (disableDates) => {
  return {
    type: actionTypes.SET_DISABLE_DATES,
    disableDates
  };
}

export const fetchDisableDatesFail = (error) => {
  return {
    type: actionTypes.FETCH_DISABLE_DATES_FAIL,
    error
  };
}

export const initDisableDates = (testingLocationId) => {
  return dispatch => {
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`/User/testing/invaliddate/${testingLocationId}`, config)
      .then(response => {
        dispatch(setDisableDates(response.data.data));
      })
      .catch(error => {
        dispatch(fetchDisableDatesFail(error.response.data.message));
      });
  };
}