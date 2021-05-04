import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  isSuccess: false,
  error: null,
  loading: false,
  showModal: false
};

const submitMedicalInfoStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const submitMedicalInfoSuccess = (state, action) => {
  return updateObject(state, {
    isSuccess: action.isSuccess,
    error: null,
    loading: false,
    showModal: true
  });
}

const submitMedicalInfoFail = (state, action) => {
  return updateObject(state, {
    isSuccess: false,
    error: action.error,
    loading: false,
    showModal: true
  });
}

const closeModalTestingRegistration = (state, action) => {
  return updateObject(state, {
    showModal: false
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
    case actionTypes.CLOSE_MODAL_TESTING_REGISTRATION:
      return closeModalTestingRegistration(state, action);
    default:
      return state;
  }
}

export default reducer;