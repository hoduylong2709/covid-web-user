import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  itineraryList: null,
  isSuccess: false,
  error: null,
  loading: false
};

const getItineraryHistoryStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const getItineraryHistorySuccess = (state, action) => {
  return updateObject(state, {
    itineraryList: action.itineraryList,
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const getItineraryHistoryFail = (state, action) => {
  return updateObject(state, {
    itineraryList: null,
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITINERARY_HISTORY_START:
      return getItineraryHistoryStart(state, action);
    case actionTypes.GET_ITINERARY_HISTORY_SUCCESS:
      return getItineraryHistorySuccess(state, action);
    case actionTypes.GET_ITINERARY_HISTORY_FAIL:
      return getItineraryHistoryFail(state, action);
    default:
      return state
  }
}

export default reducer;