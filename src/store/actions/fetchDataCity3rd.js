import * as actionTypes from './actionTypes';
import axios from '../../axios-base';
import { fetchDataCovidStart } from './fetchDataCovid';

export const fetchDataCity3rdStart = () => {
  return {
    type: actionTypes.FETCH_DATA_CITY_3RD_START
  };
};

export const fetchDataCity3rdSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DATA_CITY_3RD_SUCCESS,
    data
  };
};

export const fetchDataCity3rd = () => {
  return dispatch => {
    dispatch(fetchDataCovidStart());
    axios.get('https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST')
      .then(response => {
        dispatch(fetchDataCity3rdSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};