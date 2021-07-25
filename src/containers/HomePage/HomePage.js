import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../../hoc/Layout/Layout';
import Banner from '../../components/Banner/Banner';
import News from '../News/News';
import MyPagination from '../../components/UI/Pagination/Pagination';
import VerifyModalAfterLogin from './../../components/UI/Modal/VerifyModal/VerifyModalAfterLogin';

import classes from './HomePage.module.css';

class HomePage extends Component {
  render() {

    let pagination = null;

    if (this.props.news) {
      pagination = <MyPagination
        totalPages={this.props.news.totalPages}
        isPaginationForNews={true}
        pageSizeNews={9}
      />
    }

    return (
      <div>
        <Layout>
          <div
            style={{
              height: '100%',
              backgroundColor: '#f3f4f4'
            }}
          >
            <Banner />
            <h3 className={classes.Header}>Tin tức và cập nhật</h3>
            <News />
            {pagination}
          </div>
        </Layout>
        <VerifyModalAfterLogin
          showVerifyModal={localStorage.getItem('isVerified') === 'false'}
          email={localStorage.getItem('email')}
        >
        </VerifyModalAfterLogin>
        {this.props.error === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news.news,
    error: state.news.error
  };
};

export default connect(mapStateToProps, null)(HomePage);