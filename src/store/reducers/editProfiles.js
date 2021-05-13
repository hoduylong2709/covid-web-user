import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false
};

const editProfilesStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const editProfilesSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true
  });
}

const editProfilesFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true
  });
}

const closeEditProfilesModal = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PROFILES_START:
      return editProfilesStart(state, action);
    case actionTypes.EDIT_PROFILES_SUCCESS:
      return editProfilesSuccess(state, action);
    case actionTypes.EDIT_PROFILES_FAIL:
      return editProfilesFail(state, action);
    case actionTypes.CLOSE_EDIT_PROFILES_MODAL:
      return closeEditProfilesModal(state, action);
    default:
      return state;
  }
}

export default reducer;