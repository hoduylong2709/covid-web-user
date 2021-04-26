import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Layout from '../src/hoc/Layout/Layout';
import Auxx from '../src/hoc/Auxx/Auxx';
import HomePage from '../src/containers/HomePage/HomePage';
import Login from '../src/containers/Login/Login';
import Signup from '../src/containers/Signup/Signup';
import ForgotPassword from '../src/containers/ForgotPassword/ForgotPassword';
import NewPage from '../src/components/NewPage/NewPage';
import Testing from '../src/containers/Testing/Testing';
import DateAndLocation from '../src/containers/DateAndLocationTesting/DateAndLocationTesting';

class App extends Component {
  render() {
    return (
      <Auxx>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/news/:id" exact component={NewPage} />
          <Route path="/testing" exact component={Testing} />
          <Route path="/register-testing-date-location" exact component={DateAndLocation} />
          <Route path="/register-testing-questions" exact component={HomePage} />
        </Switch>
      </Auxx>
    );
  };
}

export default App;
