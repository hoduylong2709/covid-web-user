import React, { Component } from 'react';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

import classes from './DateAndLocationRegistration.module.css';

class DateAndLocationRegistration extends Component {
  state = {
    date: new Date(),
    location: null
  };

  dateChangeHandler = date => {
    console.log(moment(date).format('YYYY-MM-DD'));
    this.setState({ ...this.state, date: date });
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.RegistrationContainer}>
          <div className={classes.RegistrationHeader}>
            <h2 className={classes.RegistrationHeader_Title}>Đăng ký xét nghiệm</h2>
          </div>
          <div className={classes.RegistrationBody}>
            <div className={classes.RegistrationBody_Header}>
              <h3>Thời gian và địa điểm xét nghiệm</h3>
            </div>
            <div className={classes.RegistrationBody_Content}>
              <div className={classes.RegistrationBody_Date}>
                <h4 style={{ color: "#a19f9f" }}>Chọn ngày bạn muốn xét nghiệm</h4>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.dateChangeHandler}
                />
              </div>
              <div className={classes.RegistrationBody_Location}>
                <h4 style={{ color: "#a19f9f" }}>Chọn địa điểm bạn muốn xét nghiệm</h4>
                <Select options={this.props.listLocation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateAndLocationRegistration;