import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    if (this.props.locations) {
      listLocation = this.props.locations.map(location => {
        return { value: location.name, label: location.name, id: location.id, cityId: location.cityId };
      });
    }

    if (this.props.cities) {
      listCity = this.props.cities.map(city => {
        return { value: city.name, label: city.name, id: city.id };
      });
    }

    return (
      <Layout>
        <DateAndLocationRegistration listLocation={listLocation} listCity={listCity} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.testingLocations.locations,
    error: state.testingLocations.error,
    cities: state.cityList.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLocations: () => dispatch(actions.initLocations()),
    onGetCityList: () => dispatch(actions.getCityList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateAndLocationTesting);