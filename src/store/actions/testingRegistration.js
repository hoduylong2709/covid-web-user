import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const testingRegistrationStart = () => {
  return {
    type: actionTypes.TESTING_REGISTRATION_START
  };
}

export const testingRegistrationSuccess = (isSuccess) => {
  return {
    type: actionTypes.TESTING_REGISTRATION_SUCCESS,
    isSuccess: isSuccess
  };
}

export const testingRegistrationFail = (error) => {
  return {
    type: actionTypes.TESTING_REGISTRATION_FAIL,
    error: error
  };
}

export const testingRegistration = (testingLocationId, registerDate, testingDate) => {
  return dispatch => {
    dispatch(testingRegistrationStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const testingData = {
      testingLocationId,
      registerDate,
      testingDate
    };
    axios.post("/User/testing/register", testingData, config)
      .then(response => {
        dispatch(testingRegistrationSuccess(response.data.isSuccess));
      })
      .catch(error => {
        // dispatch(testingRegistrationFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, testingRegistrationFail);
      });
  };
}