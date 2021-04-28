import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Payment.module.css';
import Typography from '@material-ui/core/Typography';
import Button from '../../components/UI/Button/Button';

class Payment extends Component {
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
                >Xác nhận</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Payment);