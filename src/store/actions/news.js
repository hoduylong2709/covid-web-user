import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const setNews = (news, pageNumber, pageSize, totalPages, totalRecords) => {
  return {
    type: actionTypes.SET_NEWS,
    news: news,
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: totalPages,
    totalRecords: totalRecords
  };
};

export const fetchNewsFailed = (error) => {
  return {
    type: actionTypes.FETCH_NEWS_FAILED,
    error: error
  };
};

export const initNews = () => {
  return dispatch => {
    axios.get('/Homepage/news')
      .then(response => {
        console.log(response);
        dispatch(setNews(response.data, response.pageNumber, response.pageSize, response.totalPages, response.totalRecords));
      })
      .catch(error => {
        dispatch(fetchNewsFailed(error.response.data.message))
      });
  };
};

export const setPagination = (pageNumber, pageSize) => {
  return dispatch => {
    axios.get(`/Homepage/news?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .then(response => {
        dispatch(setNews(response.data, response.pageNumber, response.pageSize, response.totalPages, response.totalRecords));
      })
      .catch(error => {
        console.log(error);
      });
  };
}