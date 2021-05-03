import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false
};

const submitMedicalInfoStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const submitMedicalInfoSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false
  });
}

const submitMedicalInfoFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_MEDICALINFO_START:
      return submitMedicalInfoStart(state, action);
    case actionTypes.SUBMIT_MEDICALINFO_SUCCESS:
      return submitMedicalInfoSuccess(state, action);
    case actionTypes.SUBMIT_MEDICALINFO_FAIL:
      return submitMedicalInfoFail(state, action);
    default:
      return state;
  }
}

export default reducer;