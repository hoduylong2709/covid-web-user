import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/Layout';
import Banner from '../../components/Banner/Banner';
import News from '../News/News';
import MyPagination from '../../components/UI/Pagination/Pagination';

import classes from './HomePage.module.css';

class HomePage extends Component {
  render() {

    let pagination = null;

    if (this.props.news) {
      pagination = <MyPagination totalPages={this.props.news.totalPages} />
    }

    return (
      <Layout>
        <Banner />
        <h3 className={classes.Header}>Tin tức và cập nhật</h3>
        <News />
        {pagination}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news
  };
};

export default connect(mapStateToProps, null)(HomePage);