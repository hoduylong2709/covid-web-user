import React, { Component } from 'react';

import classes from './RegisterTestingQuestions.module.css';

import Layout from './../../hoc/Layout/Layout';
import CheckHealthConditionsAndSymtomps from './../../components/CheckHealthConditionsAndSymtomps/CheckHealthConditionsAndSymtomps';

class RegisterTestingQuestions extends Component {
  render() {
    return (
      <Layout>
        <CheckHealthConditionsAndSymtomps />
      </Layout>
    );
  }
}

export default RegisterTestingQuestions;