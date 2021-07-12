import React, { Component } from 'react';

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