import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Layout from '../../hoc/Layout/Layout';
// import Banner from '../../components/Banner/Banner';
import News from '../News/News';
import MyPagination from '../../components/UI/Pagination/Pagination';
import VerifyModalAfterLogin from './../../components/UI/Modal/VerifyModal/VerifyModalAfterLogin';
// import StatisticContainer from './../StatisticContainer/StatisticContainer';
import classes from './HomePage.module.css';
import * as actions from '../../store/actions/index';
import PieChart from '../../components/PieChart/PieChart';
import ReactVirtualizedTable from '../../components/DataTable/DataTable';

class HomePage extends Component {
  componentDidMount() {
    this.props.onFetchDataCovid();
    this.props.onFetchDataCity3rd();
  }

  render() {
    let newArray = [];

    if (this.props.dataCity3rd && this.props.data) {
      const mappedArray = mapApi(this.props.data, this.props.dataCity3rd);
      newArray = convertObjectArrayToArrayOfArray(mappedArray);
      console.log(newArray);
    }

    let pieChart = null;

    if (this.props.data) {
      pieChart = <PieChart
        infected={this.props.data.infected}
        treated={this.props.data.treated}
        recovered={this.props.data.recovered}
        deceased={this.props.data.deceased * 1000}
        lastUpdate={this.props.data.lastUpdatedAtApify}
      />;
    }

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
            {/* <Banner /> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: '20px 0'
                }}
              >
                {pieChart}
                <ReactVirtualizedTable sample={newArray} />
              </div>
            </div>
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

const mapApi = (data1, data2) => {
  const detailArray = data1.detail;
  const cityArray = data2.key;
  let mappedArray = [];

  for (let i = 0; i < detailArray.length; i++) {
    mappedArray.push({
      ...detailArray[i],
      ...(cityArray.find((city) => city['hec-key'] === detailArray[i]['hc-key']))
    }
    );
  }

  return mappedArray;
};

const convertObjectArrayToArrayOfArray = (objArray) => {
  let newArray = [];

  objArray.forEach(obj => {
    let subArray = [];
    subArray.push(obj.name);
    subArray.push(obj.socakhoi);
    subArray.push(obj.socatuvong);
    subArray.push(obj.value);
    newArray.push(subArray);
  });

  return newArray;
};

const mapStateToProps = state => {
  return {
    news: state.news.news,
    error: state.news.error,
    data: state.fetchDataCovid.data,
    loading: state.fetchDataCovid.loading,
    dataCity3rd: state.fetchDataCity3rd.data,
    loadingCity3rd: state.fetchDataCity3rd.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDataCovid: () => dispatch(actions.fetchDataCovid()),
    onFetchDataCity3rd: () => dispatch(actions.fetchDataCity3rd())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);