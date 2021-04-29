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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  news: newsReducer,
  signup: signupReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  verifyEmailAfterLogin: verifyEmailAfterLoginReducer
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
