import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';


export const getLocationCheckinStart = () => {
  return {
    type: actionTypes.GET_LOCATION_CHECKIN_START
  };
}

export const getLocationCheckinSuccess = (checkinList, isSuccess, pageNumber, pageSize, totalPages, totalRecords) => {
  return {
    type: actionTypes.GET_LOCATION_CHECKIN_SUCCESS,
    checkinList,
    isSuccess,
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: totalPages,
    totalRecords: totalRecords
  };
}

export const getLocationCheckinFail = (error) => {
  return {
    type: actionTypes.GET_LOCATION_CHECKIN_FAIL,
    error
  };
}

export const getLocationCheckin = (pageNumber) => {
  return dispatch => {
    dispatch(getLocationCheckinStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`/User/itinerary/location-checkin?PageNumber=${pageNumber}&PageSize=4`, config)
      .then(response => {
        dispatch(getLocationCheckinSuccess(response.data.data, response.data.isSuccess, response.data.pageNumber, response.data.pageSize, response.data.totalPages, response.data.totalRecords));
      })
      .catch(error => {
        // dispatch(getLocationCheckinFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, getLocationCheckinFail);
      });
  };
}

export const setPaginationCheckinHistory = (pageNumber, pageSize) => {
  return dispatch => {
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`/User/itinerary/location-checkin?PageNumber=${pageNumber}&PageSize=${pageSize}`, config)
      .then(response => {
        dispatch(getLocationCheckinSuccess(response.data.data, response.data.isSuccess, response.data.pageNumber, response.data.pageSize, response.data.totalPages, response.data.totalRecords));
      })
      .catch(error => {
        console.log(error);
      });
  };
}