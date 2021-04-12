import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  accountId: null,
  error: null,
  loading: false
};

const signupStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const signupSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    accountId: action.accountId,
    error: null,
    loading: false
  });
};

const signupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const closeModalSignup = (state, action) => {
  return updateObject(state, {
    error: null
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
    default:
      return state;
  }
}

export default reducer;