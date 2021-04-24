import React, { Component } from 'react';

import classes from './Testing.module.css';

import Layout from '../../hoc/Layout/Layout';
import Button from '../../components/UI/Button/Button';

class Testing extends Component {
  render() {
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
                <button className={classes.Button} autoFocus>Thông tin đăng ký</button>
                <button className={classes.Button}>Lịch sử đăng ký</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Testing;