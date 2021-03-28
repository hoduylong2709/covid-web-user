import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  news: null,
  error: false
};

const setNews = (state, action) => {
  return updateObject(state, { news: action.news });
};

const fecthNewsFailed = (state, action) => {
  return updateObject(state, { error: true });
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