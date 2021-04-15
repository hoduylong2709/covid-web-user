import React, { Component } from 'react';

// import Auxx from '../../hoc/Auxx/Auxx';
import Layout from '../../hoc/Layout/Layout';
import Banner from '../../components/Banner/Banner';
import News from '../News/News';
import MyPagination from '../../components/UI/Pagination/Pagination';

import classes from './HomePage.module.css';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Banner />
        <h3 className={classes.Header}>Tin tức và cập nhật</h3>
        <News />
        <MyPagination />
      </Layout>
    );
  }
}

export default HomePage;