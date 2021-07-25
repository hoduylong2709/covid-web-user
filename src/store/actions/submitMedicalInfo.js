import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { handleTimeoutRequest } from '../utility';

export const submitMedicalInfoStart = () => {
  return {
    type: actionTypes.SUBMIT_MEDICALINFO_START
  };
}

export const submitMedicalInfoSuccess = (isSuccess) => {
  return {
    type: actionTypes.SUBMIT_MEDICALINFO_SUCCESS,
    isSuccess
  };
}

export const submitMedicalInfoFail = (error) => {
  return {
    type: actionTypes.SUBMIT_MEDICALINFO_FAIL,
    error
  };
}

export const submitMedicalInfo = (
  asthma,
  pregnancy,
  highBloodPressure,
  obesity,
  heartProblem,
  hiv,
  cough,
  fever,
  shortnessOfBreath,
  runningNose,
  tiredness,
  none
) => {
  return dispatch => {
    dispatch(submitMedicalInfoStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    const medicalInfoData = {
      asthma,
      pregnancy,
      highBloodPressure,
      obesity,
      heartProblem,
      hiv,
      cough,
      fever,
      shortnessOfBreath,
      runningNose,
      tiredness,
      none
    };
    axios.post('/User/testing/medicalinfo', medicalInfoData, config)
      .then(response => {
        setTimeout(() => {
          dispatch(submitMedicalInfoSuccess(response.data.isSuccess));
        }, 2000);
      })
      .catch(error => {
        // dispatch(submitMedicalInfoFail(error.response.data.message));
        handleTimeoutRequest(dispatch, error, submitMedicalInfoFail);
      });
  };
}

export const closeModalTestingRegistration = () => {
  return {
    type: actionTypes.CLOSE_MODAL_TESTING_REGISTRATION
  };
}