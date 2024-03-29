import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  itineraryList: [],
  isSuccess: false,
  error: null,
  loading: false,
  pageNumber: null,
  pageSize: null,
  totalPages: null,
  totalRecords: null
};

const getItineraryHistoryStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const getItineraryHistorySuccess = (state, action) => {
  return updateObject(state, {
    itineraryList: action.itineraryList,
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    pageNumber: action.pageNumber,
    pageSize: action.pageSize,
    totalPages: action.totalPages,
    totalRecords: action.totalRecords
  });
}

const getItineraryHistoryFail = (state, action) => {
  return updateObject(state, {
    itineraryList: [],
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