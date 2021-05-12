import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  userProfiles: null,
  error: null,
  loading: false
};

const getUserProfilesStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const getUserProfilesSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    userProfiles: action.userProfiles,
    error: null,
    loading: false
  });
}

const getUserProfilesFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    userProfiles: null,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILES_START:
      return getUserProfilesStart(state, action);
    case actionTypes.GET_USER_PROFILES_SUCCESS:
      return getUserProfilesSuccess(state, action);
    case actionTypes.GET_USER_PROFILES_FAIL:
      return getUserProfilesFail(state, action);
    default:
      return state
  }
}

export default reducer;