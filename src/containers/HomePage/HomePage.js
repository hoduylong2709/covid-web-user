import React, { Component } from 'react';

// import Auxx from '../../hoc/Auxx/Auxx';
import Layout from '../../hoc/Layout/Layout';
import Banner from '../../components/Banner/Banner';
import New from '../../components/New/New';
import classes from './HomePage.module.css';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Banner />
        <h3 className={classes.News}>News and Updates</h3>
        {/* <New /> */}
      </Layout>
    );
  }
}

export default HomePage;