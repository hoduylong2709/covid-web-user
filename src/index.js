import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import newsReducer from './store/reducers/news';
import signupReducer from './store/reducers/signup';
import loginReducer from './store/reducers/login';
import forgotPasswordReducer from './store/reducers/forgotPassword';
import verifyEmailAfterLoginReducer from './store/reducers/verifyEmailAfterLogin';
import testingLocationsReducer from './store/reducers/testingLocations';
import testingRegistrationReducer from './store/reducers/testingRegistration';
import submitMedicalInfoReducer from './store/reducers/submitMedicalInfo';
import disableDatesReducer from './store/reducers/disableDates';
import testingInfoReducer from './store/reducers/testingInfo';
import checkinLocationReducer from './store/reducers/locationCheckin';
import getLocationCheckinReducer from './store/reducers/getLocationCheckin';
import cityListReducer from './store/reducers/cityList';
import itineraryInfoReducer from './store/reducers/itineraryInfo';
import getUserProfilesReducer from './store/reducers/getUserProfiles';
import editProfilesReducer from './store/reducers/editProfiles';
import changePasswordReducer from './store/reducers/changePassword';
import getItineraryHistoryReducer from './store/reducers/getItineraryHistory';
import deleteLocationCheckinReducer from './store/reducers/deleteLocationCheckin';
import editLocationCheckinReducer from './store/reducers/editLocationCheckin';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  news: newsReducer,
  signup: signupReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  verifyEmailAfterLogin: verifyEmailAfterLoginReducer,
  testingLocations: testingLocationsReducer,
  testingRegistration: testingRegistrationReducer,
  submitMedicalInfo: submitMedicalInfoReducer,
  disableDates: disableDatesReducer,
  testingInfo: testingInfoReducer,
  locationCheckin: checkinLocationReducer,
  getLocationCheckin: getLocationCheckinReducer,
  cityList: cityListReducer,
  itineraryInfo: itineraryInfoReducer,
  getUserProfiles: getUserProfilesReducer,
  editProfiles: editProfilesReducer,
  changePassword: changePasswordReducer,
  getItineraryHistory: getItineraryHistoryReducer,
  deleteLocationCheckin: deleteLocationCheckinReducer,
  editLocationCheckin: editLocationCheckinReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
