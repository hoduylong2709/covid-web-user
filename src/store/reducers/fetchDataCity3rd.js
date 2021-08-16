import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  data: null,
  loading: false
};

const fetchDataCity3rdStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchDataCity3rdSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_CITY_3RD_START:
      return fetchDataCity3rdStart(state, action);
    case actionTypes.FETCH_DATA_CITY_3RD_SUCCESS:
      return fetchDataCity3rdSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;