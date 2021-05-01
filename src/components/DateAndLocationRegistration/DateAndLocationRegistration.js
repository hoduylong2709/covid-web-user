import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

import classes from './DateAndLocationRegistration.module.css';

class DateAndLocationRegistration extends Component {
  state = {
    date: new Date(),
    location: null
  };

  handleDateChange = date => {
    console.log(moment(date).format('YYYY-MM-DD'));
    this.setState({ ...this.state, date: date });
  }

  handleLocationChange = value => {
    console.log(value.value);
    this.setState({ ...this.state, location: value.value });
  }

  componentDidUpdate() {
    localStorage.setItem('testingDate', this.state.date);
    localStorage.setItem('testingLocation', this.state.location);
  }

  // handleSubmitButton = (event) => {
  //   event.preventDefault();
  //   this.props.onSaveTestingDateAndLocation()
  // }

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
                    value={localStorage.getItem('testingDate') ? Date.parse(localStorage.getItem('testingDate')) : new Date()}
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
                  options={this.props.listLocation}
                  onChange={this.handleLocationChange}
                  value={localStorage.getItem('testingLocation') ? localStorage.getItem('testingLocation') : 'Chọn địa điểm xét nghiệm...'}
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
                // clicked={this.handleSubmitButton}
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
    testingDate: state.saveTestingDateAndLocation.testingDate,
    testingLocation: state.saveTestingDateAndLocation.testingLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveTestingDateAndLocation: (testingDate, testingLocation) => dispatch(actions.saveTestingDateAndLocation(testingDate, testingLocation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DateAndLocationRegistration));