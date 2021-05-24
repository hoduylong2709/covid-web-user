import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const deleteItineraryHistoryStart = () => {
  return {
    type: actionTypes.DELETE_ITINERARY_HISTORY_START
  };
}

export const deleteItineraryHistorySuccess = (isSuccess) => {
  return {
    type: actionTypes.DELETE_ITINERARY_HISTORY_SUCCESS,
    isSuccess
  };
}

export const deleteItineraryHistoryFail = (error) => {
  return {
    type: actionTypes.DELETE_ITINERARY_HISTORY_FAIL,
    error
  };
}

export const deleteItineraryHistory = (itineraryId) => {
  return dispatch => {
    dispatch(deleteItineraryHistoryStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.delete(`/User/itinerary/${itineraryId}`, config)
      .then(response => {
        dispatch(deleteItineraryHistorySuccess(response.data.isSuccess));
      })
      .catch(error => {
        dispatch(deleteItineraryHistoryFail(error.response.data.message));
      });
  };
}

export const closeDeleteErrorModal = () => {
  return {
    type: actionTypes.CLOSE_DELETE_ERROR_MODAL
  };
}

