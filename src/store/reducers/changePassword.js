import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false
};

const changePasswordStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const changePasswordSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true
  });
}

const changePasswordFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true
  });
}

const closeChangePasswordModal = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD_START:
      return changePasswordStart(state, action);
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return changePasswordSuccess(state, action);
    case actionTypes.CHANGE_PASSWORD_FAIL:
      return changePasswordFail(state, action);
    case actionTypes.CLOSE_CHANGE_PASSWORD_MODAL:
      return closeChangePasswordModal(state, action);
    default:
      return state;
  }
}

export default reducer;