import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

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
  none,
  coughing,
  fever,
  shortnessOfBreath,
  runningNose,
  tired
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
      none,
      coughing,
      fever,
      shortnessOfBreath,
      runningNose,
      tired
    };
    axios.post('/User/testing/medicalinfo', medicalInfoData, config)
      .then(response => {
        dispatch(submitMedicalInfoSuccess(response.data.isSuccess));
      })
      .catch(error => {
        dispatch(submitMedicalInfoFail(error.response.data.message));
      });
  };
}