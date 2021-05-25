import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const editItineraryInfoStart = () => {
  return {
    type: actionTypes.EDIT_ITINERARY_INFO_START
  };
}

export const editItineraryInfoSuccess = (isSuccess, mustTesting) => {
  return {
    type: actionTypes.EDIT_ITINERARY_INFO_SUCCESS,
    isSuccess,
    mustTesting
  };
}

export const editItineraryInfoFail = (error) => {
  return {
    type: actionTypes.EDIT_ITINERARY_INFO_FAIL,
    error
  };
}

export const editItineraryInfo = (
  id,
  departureCityId,
  destinationCityId,
  flyNo,
  departureTime,
  landingTime
) => {
  return dispatch => {
    dispatch(editItineraryInfoStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const editData = {
      id,
      departureCityId,
      destinationCityId,
      flyNo,
      departureTime,
      landingTime
    };
    axios.put(`/User/itinerary/${id}`, editData, config)
      .then(response => {
        dispatch(editItineraryInfoSuccess(response.data.isSuccess, response.data.data.mustTesting));
      })
      .catch(error => {
        dispatch(editItineraryInfoFail(error.response.data.message));
      });
  };
}

export const closeEditItineraryInfoModal = () => {
  return {
    type: actionTypes.CLOSE_EDIT_ITINERARY_INFO_MODAL
  };
}

export const finishEditItineraryInfo = () => {
  return {
    type: actionTypes.FINISH_EDIT_ITINERARY_INFO
  };
}

export const closeMustTestingModal = () => {
  return {
    type: actionTypes.CLOSE_MUST_TESTING_MODAL
  };
}