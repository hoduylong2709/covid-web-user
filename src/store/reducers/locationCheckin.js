import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false
};

const checkinLocationStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const checkinLocationSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true
  });
}

const checkinLocationFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true
  });
}

const closeModalCheckinLocation = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKIN_LOCATION_START:
      return checkinLocationStart(state, action);
    case actionTypes.CHECKIN_LOCATION_SUCCESS:
      return checkinLocationSuccess(state, action);
    case actionTypes.CHECKIN_LOCATION_FAIL:
      return checkinLocationFail(state, action);
    case actionTypes.CLOSE_MODAL_CHECKIN_LOCATION:
      return closeModalCheckinLocation(state, action);
    default:
      return state;
  }
}

export default reducer;