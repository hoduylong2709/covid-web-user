import React, { Component } from 'react';

import classes from './CheckoutPayment.module.css';
import Layout from '../../hoc/Layout/Layout';
import Payment from '../../components/Payment/Payment';

class CheckoutPayment extends Component {
  render() {
    return (
      <Layout>
        <Payment></Payment>
      </Layout>
    );
  }
}

export default CheckoutPayment;