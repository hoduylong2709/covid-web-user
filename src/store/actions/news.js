import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const setNews = (news) => {
  return {
    type: actionTypes.SET_NEWS,
    news: news
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
        dispatch(setNews(response.data));
      })
      .catch(error => {
        dispatch(fetchNewsFailed(error.response.data.message))
      });
  };
};