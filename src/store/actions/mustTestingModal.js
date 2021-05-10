import * as actionTypes from './actionTypes';

export const openMustTestingModal = () => {
  return {
    type: actionTypes.OPEN_MUST_TESTING_MODAL
  };
}

export const closeMustTestingModal = () => {
  return {
    type: actionTypes.CLOSE_MUST_TESTING_MODAL
  };
}