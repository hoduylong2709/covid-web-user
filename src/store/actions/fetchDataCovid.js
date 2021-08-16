import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const fetchDataCovidStart = () => {
  return {
    type: actionTypes.FETCH_DATA_COVID_START
  };
};

export const fetchDataCovidSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DATA_COVID_SUCCESS,
    data
  };
};

export const fetchDataCovid = () => {
  return dispatch => {
    dispatch(fetchDataCovidStart());
    axios.get('https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST')
      .then(response => {
        dispatch(fetchDataCovidSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};