import React, { Component } from 'react';

import Auxx from '../../hoc/Auxx/Auxx';
import Footer from '../../components/UI/Footer/Footer';

class HomePage extends Component {
  render() {
    return (
      <Auxx>
        <h1>This is Home Page</h1>
        <Footer />
      </Auxx>
    );
  }
}

export default HomePage;