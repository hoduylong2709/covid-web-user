import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  profileImage: null,
  isSuccess: false,
  error: null
};

const setProfileImage = (state, action) => {
  return updateObject(state, {
    profileImage: action.profileImg,
    isSuccess: action.isSuccess,
    error: null
  });
}

const setProfileImageFail = (state, action) => {
  return updateObject(state, {
    profileImage: null,
    isSuccess: false,
    error: action.error
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILE_IMAGE:
      return setProfileImage(state, action);
    case actionTypes.SET_PROFILE_IMAGE_FAIL:
      return setProfileImageFail(state, action);
    default:
      return state
  }
}

export default reducer;