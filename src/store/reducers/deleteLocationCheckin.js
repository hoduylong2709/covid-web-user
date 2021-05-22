import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false
};

const deleteLocationCheckinStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const deleteLocationCheckinSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const deleteLocationCheckinFail = (state, action) => {
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
    case actionTypes.DELETE_LOCATION_CHECKIN_START:
      return deleteLocationCheckinStart(state, action);
    case actionTypes.DELETE_LOCATION_CHECKIN_SUCCESS:
      return deleteLocationCheckinSuccess(state, action);
    case actionTypes.DELETE_LOCATION_CHECKIN_FAIL:
      return deleteLocationCheckinFail(state, action);
    case actionTypes.CLOSE_DELETE_ERROR_MODAL:
      return closeDeleteErrorModal(state, action);
    default:
      return state
  }
}

export default reducer;