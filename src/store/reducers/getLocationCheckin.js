import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  checkinList: [],
  isSuccess: false,
  error: null,
  loading: false
};

const getLocationCheckinStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const getLocationCheckinSuccess = (state, action) => {
  return updateObject(state, {
    checkinList: action.checkinList,
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const getLocationCheckinFail = (state, action) => {
  return updateObject(state, {
    checkinList: null,
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOCATION_CHECKIN_START:
      return getLocationCheckinStart(state, action);
    case actionTypes.GET_LOCATION_CHECKIN_SUCCESS:
      return getLocationCheckinSuccess(state, action);
    case actionTypes.GET_LOCATION_CHECKIN_FAIL:
      return getLocationCheckinFail(state, action);
    default:
      return state
  }
}

export default reducer;