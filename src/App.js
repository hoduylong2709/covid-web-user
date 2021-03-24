import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../src/hoc/Layout/Layout';
import HomePage from '../src/containers/HomePage/HomePage';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Layout>
    );
  };
}

export default App;
