import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Layout from '../src/hoc/Layout/Layout';
import Auxx from '../src/hoc/Auxx/Auxx';
import HomePage from '../src/containers/HomePage/HomePage';

class App extends Component {
  render() {
    return (
      <Auxx>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Auxx>
    );
  };
}

export default App;
