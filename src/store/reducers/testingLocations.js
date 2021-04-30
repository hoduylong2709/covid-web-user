import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  locations: null,
  error: null
};

const setLocations = (state, action) => {
  return updateObject(state, {
    locations: action.locations,
    error: null,
  });
}

const fetchLocationsFail = (state, action) => {
  return updateObject(state, {
    locations: null,
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATIONS:
      return setLocations(state, action);
    case actionTypes.FETCH_LOCATIONS_FAIL:
      return fetchLocationsFail(state, action);
    default:
      return state;
  }
}

export default reducer;