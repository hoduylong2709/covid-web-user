import React, { Component } from 'react';

// import Auxx from '../../hoc/Auxx/Auxx';
import Layout from '../../hoc/Layout/Layout';
import Banner from '../../components/Banner/Banner';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Banner />
      </Layout>
    );
  }
}

export default HomePage;