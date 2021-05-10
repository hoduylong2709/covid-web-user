import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  showModal: false
};

const openMustTestingModal = (state, action) => {
  return updateObject(state, {
    showModal: true
  });
}

const closeMustTestingModal = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MUST_TESTING_MODAL:
      return openMustTestingModal(state, action);
    case actionTypes.CLOSE_MUST_TESTING_MODAL:
      return closeMustTestingModal(state, action);
    default:
      return state;
  }
}

export default reducer;