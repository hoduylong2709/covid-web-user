import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const getTestingInfoStart = () => {
  return {
    type: actionTypes.GET_TESTING_INFORMATION_START
  };
}

export const getTestingInfoSuccess = (testingRecords, isSuccess) => {
  return {
    type: actionTypes.GET_TESTING_INFORMATION_SUCCESS,
    testingRecords,
    isSuccess
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
    axios.get('/User/testing', config)
      .then(response => {
        dispatch(getTestingInfoSuccess(response.data.data, response.data.isSuccess));
      })
      .catch(error => {
        dispatch(getTestingInfoFail(error.response.data.message));
      });
  };
}