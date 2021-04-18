import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  message: null,
  error: null,
  loading: false
};

const recoverPasswordStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const recoverPasswordSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    message: action.message,
    error: null,
    loading: false
  });
}

const recoverPasswordFailed = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    message: null,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECOVER_PASSWORD_START:
      return recoverPasswordStart(state, action);
    case actionTypes.RECOVER_PASSWORD_SUCCESS:
      return recoverPasswordSuccess(state, action);
    case actionTypes.RECOVER_PASSWORD_FAILED:
      return recoverPasswordFailed(state, action);
    default:
      return state;
  }
}

export default reducer;