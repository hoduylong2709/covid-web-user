import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../../hoc/Layout/Layout';
import DateAndLocationRegistration from '../../components/DateAndLocationRegistration/DateAndLocationRegistration';
import * as actions from '../../store/actions/index';

class DateAndLocationTesting extends Component {
  componentDidMount() {
    this.props.onInitLocations();
    this.props.onGetCityList();
  }

  render() {
    let listLocation = [{ value: 'Loading...', label: 'Loading...', id: null, cityId: null }];
    let listCity = [{ value: 'Loading...', label: 'Loading...', id: null }];
    const registeringTimes = [
      { value: '08:00:00', label: '8 AM', id: 1 },
      { value: '09:00:00', label: '9 AM', id: 2 },
      { value: '10:00:00', label: '10 AM', id: 3 },
      { value: '14:00:00', label: '2 PM', id: 4 },
      { value: '15:00:00', label: '3 PM', id: 5 },
      { value: '16:00:00', label: '4 PM', id: 6 },
    ];

    if (this.props.locations) {
      listLocation = this.props.locations.map(location => {
        return { value: location.name, label: location.name, id: location.id, cityId: location.cityId, cityName: location.city['name'] };
      });
    }

    if (this.props.cities) {
      listCity = this.props.cities.map(city => {
        return { value: city.name, label: city.name, id: city.id };
      });
    }

    return (
      <Layout>
        <DateAndLocationRegistration
          listLocation={listLocation}
          listCity={listCity}
          registeringTimes={registeringTimes}
        />
        {this.props.errorCityList === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
        {this.props.error === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.testingLocations.locations,
    error: state.testingLocations.error,
    cities: state.cityList.cities,
    errorCityList: state.cityList.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLocations: () => dispatch(actions.initLocations()),
    onGetCityList: () => dispatch(actions.getCityList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateAndLocationTesting);