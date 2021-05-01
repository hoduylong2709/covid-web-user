import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  testingDate: new Date(),
  testingLocation: null
};

const saveTestingDateAndLocation = (state, action) => {
  return updateObject(state, {
    testingDate: action.testingDate,
    testingLocation: action.testingLocation
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TESTING_DATE_AND_LOCATION:
      return saveTestingDateAndLocation(state, action);
    default:
      return state;
  }
}

export default reducer;