import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const getCityListStart = () => {
  return {
    type: actionTypes.GET_CITY_LIST_START
  };
}

export const getCityListSuccess = (cities, isSuccess) => {
  return {
    type: actionTypes.GET_CITY_LIST_SUCCESS,
    cities,
    isSuccess
  }
}

export const getCityListFail = (error) => {
  return {
    type: actionTypes.GET_CITY_LIST_FAIL,
    error
  };
}

export const getCityList = () => {
  return dispatch => {
    dispatch(getCityListStart());
    const config = {
      headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` }
    };
    axios.get('/city', config)
      .then(response => {
        dispatch(getCityListSuccess(response.data.data, response.data.isSuccess));
      })
      .catch(error => {
        dispatch(getCityListFail(error.response.data.message));
      });
  };
}