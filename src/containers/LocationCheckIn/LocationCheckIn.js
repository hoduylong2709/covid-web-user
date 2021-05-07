import React, { Component } from 'react';

import Layout from '../../hoc/Layout/Layout';

import CheckInMap from '../../components/CheckInMap/CheckInMap';

class LocationCheckIn extends Component {
  render() {
    return (
      <Layout>
        <CheckInMap />
      </Layout>
    );
  }
}

export default LocationCheckIn;