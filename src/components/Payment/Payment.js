import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import classes from './Payment.module.css';
import Typography from '@material-ui/core/Typography';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Payment extends Component {
  componentDidMount() {
    console.log(this.props.listLocation);
  }

  handleCheckout = (event) => {
    event.preventDefault();
    const location = this.props.listLocation.find(ele => ele.name === localStorage.getItem('testingLocation'));
    const testingLocationId = location.id;
    const registerDate = moment(new Date()).format('YYYY-MM-DD');
    const testingDate = moment(localStorage.getItem('testingDate')).format('YYYY-MM-DD');
    console.log('HDL', testingLocationId, registerDate, testingDate);
    this.props.onTestingRegistration(testingLocationId, registerDate, testingDate);
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.PaymentContainer}>
          <div className={classes.PaymentHeader}>
            <h2 className={classes.PaymentHeader_Title}>Xác nhận thanh toán</h2>
          </div>
          <div className={classes.PaymentBody}>
            <div className={classes.PaymentContent}>
              <Typography variant="body1">Tổng cộng: 120000 VNĐ</Typography>
              <Typography variant="body1">Mô tả: Đăng ký xét nghiệm COVID-19 cho ông/bà {localStorage.getItem('user')}</Typography>
              <Typography variant="body1">Vui lòng thanh toán tại địa điểm xét nghiệm</Typography>
            </div>
            <div className={classes.Payment_Buttons}>
              <div className={classes.CancelButton}>
                <Button
                  anotherType="RegisterButton-Cancel"
                  clicked={() => this.props.history.goBack()}
                >Hủy</Button>
              </div>
              <div className={classes.CheckoutButton}>
                <Button
                  anotherType="RegisterButton-Next"
                  clicked={this.handleCheckout}
                >Xác nhận</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.testingRegistration.isSuccess,
    error: state.testingRegistration.error,
    loading: state.testingRegistration.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestingRegistration: (testingLocationId, registerDate, testingDate) => dispatch(actions.testingRegistration(testingLocationId, registerDate, testingDate))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));