import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';

class LocationCheckinHistory extends Component {
  render() {
    return (
      <Layout></Layout>
    );
  }
}

export default connect()(LocationCheckinHistory);