import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  testingRecords: null,
  isSuccess: false,
  error: null,
  loading: false
};

const getTestingInfoStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const getTestingInfoSuccess = (state, action) => {
  return updateObject(state, {
    testingRecords: action.testingRecords,
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const getTestingInfoFail = (state, action) => {
  return updateObject(state, {
    testingRecords: null,
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TESTING_INFORMATION_START:
      return getTestingInfoStart(state, action);
    case actionTypes.GET_TESTING_INFORMATION_SUCCESS:
      return getTestingInfoSuccess(state, action);
    case actionTypes.GET_TESTING_INFORMATION_FAIL:
      return getTestingInfoFail(state, action);
    default:
      return state
  }
}

export default reducer;