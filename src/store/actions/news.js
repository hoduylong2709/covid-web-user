import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const setNews = (news) => {
  return {
    type: actionTypes.SET_NEWS,
    news: news
  };
};

export const fetchNewsFailed = () => {
  return {
    type: actionTypes.FETCH_NEWS_FAILED
  };
};

export const initNews = () => {
  return dispatch => {
    axios.get('/news.json')
      .then(response => {
        dispatch(setNews(response.data));
      })
      .catch(error => {
        dispatch(fetchNewsFailed())
      });
  };
};