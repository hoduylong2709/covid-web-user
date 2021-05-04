import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  disableDates: null,
  error: null
};

const setDisableDates = (state, action) => {
  return updateObject(state, {
    disableDates: action.disableDates,
    error: null
  });
}

const fetchDisableDatesFail = (state, action) => {
  return updateObject(state, {
    disableDates: null,
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DISABLE_DATES:
      return setDisableDates(state, action);
    case actionTypes.FETCH_DISABLE_DATES_FAIL:
      return fetchDisableDatesFail(state, action);
    default:
      return state;
  }
}

export default reducer;