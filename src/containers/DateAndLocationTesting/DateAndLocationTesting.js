import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DateAndLocationTesting.module.css';

import Layout from '../../hoc/Layout/Layout';
import DateAndLocationRegistration from '../../components/DateAndLocationRegistration/DateAndLocationRegistration';
import * as actions from '../../store/actions/index';

class DateAndLocationTesting extends Component {
  componentDidMount() {
    this.props.onInitLocations();
  }

  render() {
    const listLocation = [
      { value: 'Nguyễn Văn Linh center', label: 'Nguyễn Văn Linh center' },
      { value: 'Nguyễn Lương Bằng center', label: 'Nguyễn Lương Bằng center' },
    ];

    return (
      <Layout>
        <DateAndLocationRegistration listLocation={listLocation} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.testingLocations.locations,
    error: state.testingLocations.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLocations: () => dispatch(actions.initLocations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateAndLocationTesting);