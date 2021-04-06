import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS
  };
};