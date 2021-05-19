import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const getItineraryHistoryStart = () => {
  return {
    type: actionTypes.GET_ITINERARY_HISTORY_START
  };
}

export const getItineraryHistorySuccess = (itineraryList, isSuccess) => {
  return {
    type: actionTypes.GET_ITINERARY_HISTORY_SUCCESS,
    itineraryList,
    isSuccess
  };
}

export const getItineraryHistoryFail = (error) => {
  return {
    type: actionTypes.GET_ITINERARY_HISTORY_FAIL,
    error
  };
}

export const getItineraryHistory = () => {
  return dispatch => {
    dispatch(getItineraryHistoryStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/User/itinerary', config)
      .then(response => {
        dispatch(getItineraryHistorySuccess(response.data.data, response.data.isSuccess));
      })
      .catch(error => {
        dispatch(getItineraryHistoryFail(error.response.data.message));
      });
  };
}