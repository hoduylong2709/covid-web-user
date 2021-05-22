import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false
};

const editLocationCheckinStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const editLocationCheckinSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true
  });
}

const editLocationCheckinFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true
  });
}

const closeEditLocationCheckinModal = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const finishEditLocationCheckin = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: null,
    loading: false,
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_LOCATION_CHECKIN_START:
      return editLocationCheckinStart(state, action);
    case actionTypes.EDIT_LOCATION_CHECKIN_SUCCESS:
      return editLocationCheckinSuccess(state, action);
    case actionTypes.EDIT_LOCATION_CHECKIN_FAIL:
      return editLocationCheckinFail(state, action);
    case actionTypes.CLOSE_EDIT_LOCATION_CHECKIN_MODAL:
      return closeEditLocationCheckinModal(state, action);
    case actionTypes.FINISH_EDIT_LOCATION_CHECKIN:
      return finishEditLocationCheckin(state, action);
    default:
      return state;
  }
}

export default reducer;