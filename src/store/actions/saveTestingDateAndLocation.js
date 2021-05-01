import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const saveTestingDateAndLocation = (testingDate, testingLocation) => {
  return {
    type: actionTypes.SAVE_TESTING_DATE_AND_LOCATION
  };
}