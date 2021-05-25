import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false
};

const editItineraryInfoStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const editItineraryInfoSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true
  });
}

const editItineraryInfoFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true
  });
}

const closeEditItineraryInfoModal = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const finishEditItineraryInfo = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: null,
    loading: false,
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_ITINERARY_INFO_START:
      return editItineraryInfoStart(state, action);
    case actionTypes.EDIT_ITINERARY_INFO_SUCCESS:
      return editItineraryInfoSuccess(state, action);
    case actionTypes.EDIT_ITINERARY_INFO_FAIL:
      return editItineraryInfoFail(state, action);
    case actionTypes.CLOSE_EDIT_ITINERARY_INFO_MODAL:
      return closeEditItineraryInfoModal(state, action);
    case actionTypes.FINISH_EDIT_ITINERARY_INFO:
      return finishEditItineraryInfo(state, action);
    default:
      return state;
  }
}

export default reducer;