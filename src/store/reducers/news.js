import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  news: null,
  error: null,
  pageNumber: null,
  pageSize: null,
  totalPages: null,
  totalRecords: null
};

const setNews = (state, action) => {
  return updateObject(state, {
    news: action.news,
    pageNumber: action.pageNumber,
    pageSize: action.pageSize,
    totalPages: action.totalPages,
    totalRecords: action.totalRecords
  });
};

const fecthNewsFailed = (state, action) => {
  return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEWS:
      return setNews(state, action);
    case actionTypes.FETCH_NEWS_FAILED:
      return fecthNewsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;