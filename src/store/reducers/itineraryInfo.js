import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false,
  mustTesting: false
};

const submitItineraryInfoStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const submitItineraryInfoSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true,
    mustTesting: action.mustTesting
  });
}

const submitItineraryInfoFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true,
    mustTesting: false
  });
}

const closeModalItineraryInfo = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ITINERARY_INFORMATION_START:
      return submitItineraryInfoStart(state, action);
    case actionTypes.SUBMIT_ITINERARY_INFORMATION_SUCCESS:
      return submitItineraryInfoSuccess(state, action);
    case actionTypes.SUBMIT_ITINERARY_INFORMATION_FAIL:
      return submitItineraryInfoFail(state, action);
    case actionTypes.CLOSE_MODAL_ITINERARY_INFORMATION:
      return closeModalItineraryInfo(state, action);
    default:
      return state;
  }
}

export default reducer;