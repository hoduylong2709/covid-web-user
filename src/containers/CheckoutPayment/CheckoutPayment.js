import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import Payment from '../../components/Payment/Payment';
import * as actions from '../../store/actions/index';

class CheckoutPayment extends Component {
  shouldComponentUpdate() {
    this.props.onInitLocations();
  }

  render() {
    let listLocation = null;

    if (this.props.locations) {
      listLocation = this.props.locations;
    }

    return (
      <Layout>
        <Payment listLocation={listLocation}></Payment>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.testingLocations.locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitLocations: () => dispatch(actions.initLocations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPayment);