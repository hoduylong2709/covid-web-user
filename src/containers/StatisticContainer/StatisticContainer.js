import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import classes from './StatisticContainer.module.css';
import PieChart from '../../components/PieChart/PieChart';
import * as actions from '../../store/actions/index';

class StatisticContainer extends Component {
  componentDidMount() {
    this.props.onFetchDataCovid();
  }

  render() {
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

    return (
      <Layout>
        <div className={classes.StatisticContainer}>
          {pieChart}
        </div>
      </Layout>
    );
  };
}

const mapStateToProps = state => {
  return {
    data: state.fetchDataCovid.data,
    loading: state.fetchDataCovid.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDataCovid: () => dispatch(actions.fetchDataCovid())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticContainer);