import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false
  // showModal: false
};

const uploadProfileImageStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const uploadProfileImageSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const uploadProfileImageFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PROFILE_IMAGE_START:
      return uploadProfileImageStart(state, action);
    case actionTypes.UPLOAD_PROFILE_IMAGE_SUCCESS:
      return uploadProfileImageSuccess(state, action);
    case actionTypes.UPLOAD_PROFILE_IMAGE_FAIL:
      return uploadProfileImageFail(state, action);
    default:
      return state;
  }
}

export default reducer;