import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';


export const getTestingInfoStart = () => {
  return {
    type: actionTypes.GET_TESTING_INFORMATION_START
  };
}

export const getTestingInfoSuccess = (testingRecords, isSuccess, pageNumber, pageSize, totalPages, totalRecords) => {
  return {
    type: actionTypes.GET_TESTING_INFORMATION_SUCCESS,
    testingRecords,
    isSuccess,
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: totalPages,
    totalRecords: totalRecords
  };
}

export const getTestingInfoFail = (error) => {
  return {
    type: actionTypes.GET_TESTING_INFORMATION_FAIL,
    error
  };
}

export const getTestingInfo = () => {
  return dispatch => {
    dispatch(getTestingInfoStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/User/testing?PageNumber=1&PageSize=4', config)
      .then(response => {
        dispatch(getTestingInfoSuccess(response.data.data, response.data.isSuccess, response.data.pageNumber, response.data.pageSize, response.data.totalPages, response.data.totalRecords));
      })
      .catch(error => {
        // dispatch(getTestingInfoFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, getTestingInfoFail);
      });
  };
}

export const setPaginationTestingInfo = (pageNumber, pageSize) => {
  return dispatch => {
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get(`/User/testing?PageNumber=${pageNumber}&PageSize=${pageSize}`, config)
      .then(response => {
        dispatch(getTestingInfoSuccess(response.data.data, response.data.isSuccess, response.data.pageNumber, response.data.pageSize, response.data.totalPages, response.data.totalRecords));
      })
      .catch(error => {
        console.log(error);
      });
  };
}