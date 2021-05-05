import React, { Component } from 'react';

import classes from './Testing.module.css';

import Layout from '../../hoc/Layout/Layout';
import Button from '../../components/UI/Button/Button';

class Testing extends Component {
  state = {
    infoButtonClicked: true,
    historyButtonClicked: false
  };

  handleInfoButtonClick = () => {
    this.setState({ infoButtonClicked: true, historyButtonClicked: false });
  }

  handleHistoryButtonClick = () => {
    this.setState({ infoButtonClicked: false, historyButtonClicked: true });
  }

  render() {
    let testInfo = null;

    if (this.state.infoButtonClicked) {
      testInfo = <h2>infoButtonClicked</h2>;
    }

    if (this.state.historyButtonClicked) {
      testInfo = <h2>historyButtonClicked</h2>;
    }

    return (
      <Layout>
        <div className={classes.TestingContainer}>
          <div className={classes.TestingHeader}>
            <div className={classes.TestingTitle}>
              <h3>Quản lý xét nghiệm</h3>
            </div>
            <div>
              <Button
                btn="Success"
                anotherType="Custom"
                clicked={() => this.props.history.push('/register-testing-date-location')}
              >
                Đăng ký xét nghiệm
              </Button>
            </div>
          </div>
          <div className={classes.TestingBody}>
            <div className={classes.TestingBody_Navbar}>
              <div className={classes.TestingBody_Navbar_Button}>
                <button
                  className={classes.Button}
                  autoFocus
                  onClick={this.handleInfoButtonClick}
                >Thông tin xét nghiệm</button>
                <button
                  className={classes.Button}
                  onClick={this.handleHistoryButtonClick}
                >Lịch sử xét nghiệm</button>
              </div>
            </div>
            <div className={classes.TestingBody_InfoRecords}>
              {testInfo}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Testing;