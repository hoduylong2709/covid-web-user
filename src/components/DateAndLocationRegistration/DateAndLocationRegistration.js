import React, { Component } from 'react';

import classes from './DateAndLocationRegistration.module.css';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

class DateAndLocationRegistration extends Component {
  render() {
    return (
      <div className={classes.RegistrationContainer}>
        <div className={classes.RegistrationHeader}>
          <h3 className={classes.RegistrationHeader_Title}>Đăng ký xét nghiệm</h3>
          <div></div>
        </div>
        <div className={classes.RegistrationBody}>
          <div className={classes.RegistrationBody_Header}>
            <h4>Thời gian và địa điểm xét nghiệm</h4>
          </div>
          <div className={classes.RegistrationBody_Date}>
            <h5>Chọn ngày bạn muốn xét nghiệm</h5>
            <DatePicker selected={new Date()} />
          </div>
          <div className={classes.RegistrationBody_Location}>
            <h5>Chọn địa điểm bạn muốn xét nghiệm</h5>
            <Select options={this.props.listLocation} />
          </div>
        </div>
      </div>
    );
  }
}

export default DateAndLocationRegistration;