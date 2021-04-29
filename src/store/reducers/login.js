import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  userId: null,
  token: null,
  fullName: null,
  role: null,
  error: null,
  loading: false,
  isVerified: false
};

const loginStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    userId: action.userId,
    token: action.token,
    fullName: action.fullName,
    role: action.role,
    error: null,
    loading: false,
    isVerified: action.isVerified
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false
  });
};

const closeModalErrorLogin = (state, action) => {
  return updateObject(state, { error: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.CLOSE_MODAL_ERROR_LOGIN:
      return closeModalErrorLogin(state, action);
    default:
      return state
  }
}

export default reducer;