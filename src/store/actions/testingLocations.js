import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const setLocations = (locations) => {
  return {
    type: actionTypes.SET_LOCATIONS,
    locations: locations
  };
}

export const fetchLocationsFail = (error) => {
  return {
    type: actionTypes.FETCH_LOCATIONS_FAIL,
    error: error
  };
}

export const initLocations = () => {
  return dispatch => {
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/testing/location', config)
      .then(response => {
        console.log(response);
        dispatch(setLocations(response.data))
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchLocationsFail(error.response.data.message));
      });
  };
}