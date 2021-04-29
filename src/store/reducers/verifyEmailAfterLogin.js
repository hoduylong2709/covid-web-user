import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isVerifying: false,
  verifySuccess: false,
  verifyError: null,
};

const verifyAfterLoginStart = (state, action) => {
  return updateObject(state, { isVerifying: true });
};

const verifyAfterLoginSuccess = (state, action) => {
  return updateObject(state, {
    verifySuccess: action.verifySuccess,
    verifyError: null,
    isVerifying: false
  });
};

const verifyAfterLoginFail = (state, action) => {
  return updateObject(state, {
    verifySuccess: false,
    verifyError: action.verifyError,
    isVerifying: false
  });
};

const closeVerifyModalAfterLogin = (state, action) => {
  return updateObject(state, {
    isVerifying: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_AFTER_LOGIN_START:
      return verifyAfterLoginStart(state, action);
    case actionTypes.VERIFY_AFTER_LOGIN_SUCCESS:
      return verifyAfterLoginSuccess(state, action);
    case actionTypes.VERIFY_AFTER_LOGIN_FAIL:
      return verifyAfterLoginFail(state, action);
    case actionTypes.CLOSE_VERIFY_MODAL_AFTER_LOGIN:
      return closeVerifyModalAfterLogin(state, action);
    default:
      return state;
  }
}

export default reducer;