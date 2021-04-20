import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  message: null,
  error: null,
  loading: false,
  recoverSuccess: false,
  recoverMessage: null,
  recoverError: null,
  isRecovering: false
};

const recoverPasswordStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const recoverPasswordSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    message: action.message,
    error: null,
    loading: false,
    isRecovering: true
  });
}

const recoverPasswordFailed = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    message: null,
    error: action.error,
    loading: false,
    isRecovering: false
  });
}

const closeModalErrorRecoverPassword = (state, action) => {
  return updateObject(state, { error: null });
}

const recoverProcessStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const recoverProcessSuccess = (state, action) => {
  return updateObject(state, {
    recoverSuccess: action.recoverSuccess,
    recoverMessage: action.recoverMessage,
    recoverError: null,
    loading: false
  });
}

const recoverProcessFailed = (state, action) => {
  return updateObject(state, {
    recoverSuccess: false,
    recoverMessage: null,
    recoverError: action.recoverError,
    loading: false
  });
}

const closeRecoverProcessModal = (state, action) => {
  return updateObject(state, { isRecovering: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECOVER_PASSWORD_START:
      return recoverPasswordStart(state, action);
    case actionTypes.RECOVER_PASSWORD_SUCCESS:
      return recoverPasswordSuccess(state, action);
    case actionTypes.RECOVER_PASSWORD_FAILED:
      return recoverPasswordFailed(state, action);
    case actionTypes.CLOSE_MODAL_ERROR_RECOVER_PASSWORD:
      return closeModalErrorRecoverPassword(state, action);
    case actionTypes.RECOVER_PROCESS_START:
      return recoverProcessStart(state, action);
    case actionTypes.RECOVER_PROCESS_SUCCESS:
      return recoverProcessSuccess(state, action);
    case actionTypes.RECOVER_PROCESS_FAILED:
      return recoverProcessFailed(state, action);
    case actionTypes.CLOSE_RECOVER_PROCESS_MODAL:
      return closeRecoverProcessModal(state, action);
    default:
      return state;
  }
}

export default reducer;