import React, { Component } from 'react';

import classes from './DateAndLocationTesting.module.css';

import Layout from '../../hoc/Layout/Layout';
import DateAndLocationRegistration from '../../components/DateAndLocationRegistration/DateAndLocationRegistration';

class DateAndLocationTesting extends Component {
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

export default DateAndLocationTesting;