import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  data: null,
  loading: false
};

const fetchDataCovidStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchDataCovidSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_COVID_START:
      return fetchDataCovidStart(state, action);
    case actionTypes.FETCH_DATA_COVID_SUCCESS:
      return fetchDataCovidSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;