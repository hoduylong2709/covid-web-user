import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const submitItineraryInfoStart = () => {
  return {
    type: actionTypes.SUBMIT_ITINERARY_INFORMATION_START
  };
}

export const submitItineraryInfoSuccess = (isSuccess, mustTesting) => {
  return {
    type: actionTypes.SUBMIT_ITINERARY_INFORMATION_SUCCESS,
    isSuccess,
    mustTesting
  };
}

export const submitItineraryInfoFail = (error) => {
  return {
    type: actionTypes.SUBMIT_ITINERARY_INFORMATION_FAIL,
    error
  };
}

export const closeModalItineraryInfo = () => {
  return {
    type: actionTypes.CLOSE_MODAL_ITINERARY_INFORMATION
  };
}

export const submitItineraryInfo = (
  departureCityId,
  destinationCityId,
  flyNo,
  departureTime,
  landingTime
) => {
  return dispatch => {
    dispatch(submitItineraryInfoStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const itineraryInfo = {
      departureCityId,
      destinationCityId,
      flyNo,
      departureTime,
      landingTime
    };
    axios.post('/User/itinerary', itineraryInfo, config)
      .then(response => {
        dispatch(submitItineraryInfoSuccess(response.data.isSuccess, response.data.data.mustTesting));
      })
      .catch(error => {
        dispatch(submitItineraryInfoFail(error.response.data.message));
      });
  };
}