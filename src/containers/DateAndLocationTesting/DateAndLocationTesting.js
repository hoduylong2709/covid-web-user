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
    let listLocation = [{ value: 'Loading...', label: 'Loading...' }];

    if (this.props.locations) {
      listLocation = this.props.locations.map(location => {
        return { value: location.name, label: location.name };
      });
    }

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