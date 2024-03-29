import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const getItineraryHistoryStart = () => {
  return {
    type: actionTypes.GET_ITINERARY_HISTORY_START
  };
}

export const getItineraryHistorySuccess = (itineraryList, isSuccess, pageNumber, pageSize, totalPages, totalRecords) => {
  return {
    type: actionTypes.GET_ITINERARY_HISTORY_SUCCESS,
    itineraryList,
    isSuccess,
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: totalPages,
    totalRecords: totalRecords
  };
}

export const getItineraryHistoryFail = (error) => {
  return {
    type: actionTypes.GET_ITINERARY_HISTORY_FAIL,
    error
  };
}

export const getItineraryHistory = (pageNumber) => {
  return dispatch => {
    dispatch(getItineraryHistoryStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`/User/itinerary?PageNumber=${pageNumber}&PageSize=4`, config)
      .then(response => {
        dispatch(getItineraryHistorySuccess(response.data.data, response.data.isSuccess, response.data.pageNumber, response.data.pageSize, response.data.totalPages, response.data.totalRecords));
      })
      .catch(error => {
        // dispatch(getItineraryHistoryFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, getItineraryHistoryFail);
      });
  };
}

export const setPaginationItineraryHistory = (pageNumber, pageSize) => {
  return dispatch => {
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`/User/itinerary?PageNumber=${pageNumber}&PageSize=${pageSize}`, config)
      .then(response => {
        dispatch(getItineraryHistorySuccess(response.data.data, response.data.isSuccess, response.data.pageNumber, response.data.pageSize, response.data.totalPages, response.data.totalRecords));
      })
      .catch(error => {
        console.log(error);
      });
  };
}