import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false
};

const deleteItineraryHistoryStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const deleteItineraryHistorySuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const deleteItineraryHistoryFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const closeDeleteErrorModal = (state, action) => {
  return updateObject(state, {
    error: null
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_ITINERARY_HISTORY_START:
      return deleteItineraryHistoryStart(state, action);
    case actionTypes.DELETE_ITINERARY_HISTORY_SUCCESS:
      return deleteItineraryHistorySuccess(state, action);
    case actionTypes.DELETE_ITINERARY_HISTORY_FAIL:
      return deleteItineraryHistoryFail(state, action);
    case actionTypes.CLOSE_DELETE_ERROR_MODAL:
      return closeDeleteErrorModal(state, action);
    default:
      return state
  }
}

export default reducer;