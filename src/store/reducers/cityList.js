import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  cities: null,
  isSuccess: false,
  error: null,
  loading: false
};

const getCityListStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const getCityListSuccess = (state, action) => {
  return updateObject(state, {
    cities: action.cities,
    isSuccess: true,
    error: null,
    loading: false
  });
}

const getCityListFail = (state, action) => {
  return updateObject(state, {
    cities: null,
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CITY_LIST_START:
      return getCityListStart(state, action);
    case actionTypes.GET_CITY_LIST_SUCCESS:
      return getCityListSuccess(state, action);
    case actionTypes.GET_CITY_LIST_FAIL:
      return getCityListFail(state, action);
    default:
      return state;
  }
}

export default reducer;

