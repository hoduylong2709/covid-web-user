import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '../../components/UI/Button/Button';

import classes from './DateAndLocationRegistration.module.css';

class DateAndLocationRegistration extends Component {
  state = {
    date: localStorage.getItem('testingDate') ? localStorage.getItem('testingDate') : new Date(),
    location: localStorage.getItem('testingLocation') ? localStorage.getItem('testingLocation') : null
  };

  handleDateChange = date => {
    console.log(moment(date).format('YYYY-MM-DD'));
    this.setState({ ...this.state, date: date });
  }

  handleLocationChange = value => {
    console.log(value, typeof value);
    this.setState({ ...this.state, location: value.value });
  }

  componentDidUpdate() {
    localStorage.setItem('testingDate', this.state.date);
    localStorage.setItem('testingLocation', this.state.location);
    console.log(typeof this.state.location);
  }

  render() {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        width: "100%"
      })
    };

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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ width: "100%", marginTop: "6px" }}
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={classes.RegistrationBody_Location}>
                <h4 style={{ color: "#a19f9f" }}>Chọn địa điểm bạn muốn xét nghiệm</h4>
                <Select
                  styles={customStyles}
                  value={this.state.location ? { label: this.state.location, value: this.state.location } : null}
                  options={this.props.listLocation}
                  onChange={this.handleLocationChange}
                />
              </div>
            </div>
            <div className={classes.RegistrationBody_Buttons}>
              <div className={classes.CancelButton}>
                <Button
                  anotherType="RegisterButton-Cancel"
                  clicked={() => this.props.history.goBack()}
                >Hủy</Button>
              </div>
              <div className={classes.NextButton}>
                <Button
                  anotherType="RegisterButton-Next"
                  clicked={() => this.props.history.push("/register-testing-questions")}
                >Xác nhận</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DateAndLocationRegistration);