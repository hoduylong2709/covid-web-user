import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false
};

const testingRegistrationStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const testingRegistrationSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const testingRegistrationFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TESTING_REGISTRATION_START:
      return testingRegistrationStart(state, action);
    case actionTypes.TESTING_REGISTRATION_SUCCESS:
      return testingRegistrationSuccess(state, action);
    case actionTypes.TESTING_REGISTRATION_FAIL:
      return testingRegistrationFail(state, action);
    default:
      return state;
  }
}

export default reducer;