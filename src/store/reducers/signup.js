import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  accountId: null,
  error: null,
  loading: false,
  isVerified: false,
  isVerifying: false,
  verifySuccess: false,
  verifyMessage: null,
};

const signupStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const signupSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    accountId: action.accountId,
    error: null,
    loading: false,
    isVerifying: true
  });
};

const signupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isVerifying: false
  });
};

const closeModalSignup = (state, action) => {
  return updateObject(state, {
    error: null
  });
};

const verifyStart = (state, action) => {
  return updateObject(state, { verifyError: null, loading: true });
};

const verifySuccess = (state, action) => {
  return updateObject(state, {
    verifySuccess: action.verifySuccess,
    verifyError: null,
    loading: false,
  });
};

const verifyFail = (state, action) => {
  return updateObject(state, {
    verifyError: action.verifyError,
    loading: false,
    verifySuccess: null
  });
};

const closeVerifyModalSignup = (state, action) => {
  return updateObject(state, {
    isVerifying: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signupFail(state, action);
    case actionTypes.CLOSE_MODAL_SIGNUP:
      return closeModalSignup(state, action);
    case actionTypes.VERIFY_START:
      return verifyStart(state, action);
    case actionTypes.VERIFY_SUCCESS:
      return verifySuccess(state, action);
    case actionTypes.VERIFY_FAIL:
      return verifyFail(state, action);
    case actionTypes.CLOSE_VERIFY_MODAL_SIGNUP:
      return closeVerifyModalSignup(state, action);
    default:
      return state;
  }
}

export default reducer;