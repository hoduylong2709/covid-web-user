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

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class DateAndLocationRegistration extends Component {
  state = {
    date: localStorage.getItem('testingDate') ? localStorage.getItem('testingDate') : new Date(),
    location: localStorage.getItem('testingLocation') ? localStorage.getItem('testingLocation') : "",
    city: localStorage.getItem('testingCity') ? localStorage.getItem('testingCity') : "An Giang",
    testingLocationId: null,
    testingCityId: null,
    testingTime: this.props.registeringTimes[0].value,
    testingTimeId: this.props.registeringTimes[0].id,
    testingTimeLabel: this.props.registeringTimes[0].label,
    invalidTestingTime: false
  };

  handleDateChange = date => {
    this.setState({ ...this.state, date: date });
  }

  handleLocationChange = value => {
    this.setState({ ...this.state, location: value.value, testingLocationId: value.id });
  }

  handleCityChange = value => {
    this.setState({ ...this.state, city: value.value, testingCityId: value.id, location: '', testingLocationId: null });
  }

  handleTimeChange = value => {
    if (moment(this.state.date).format().substring(0, 11) + value.value <= moment().format().substring(0, 19)) {
      this.setState({ invalidTestingTime: true });
      return;
    }
    this.setState({ ...this.state, testingTime: value.value, testingTimeId: value.id, testingTimeLabel: value.label })
  }

  handleCloseTimeModal = () => {
    this.setState({ invalidTestingTime: false });
  }

  handleNextButton = () => {
    if (moment(this.state.date).format().substring(0, 11) + this.state.testingTime <= moment().format().substring(0, 19)) {
      this.setState({ invalidTestingTime: true });
      return;
    }
    this.props.history.push("/register-testing-questions");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.testingLocationId !== this.state.testingLocationId) {
      this.props.onInitDisableDates(this.state.testingLocationId);
    }
    localStorage.setItem('testingDate', this.state.date);
    // localStorage.setItem('testingLocation', this.state.location);
    localStorage.setItem('testingCity', this.state.city);
    localStorage.setItem('testingTime', this.state.testingTime);
  }

  filterDisableDates = (date) => {
    const updatedDisableDatesArray = this.props.disableDates.map(date => moment(date).format('YYYY-MM-DD'));
    return updatedDisableDatesArray.includes(moment(date).format('YYYY-MM-DD'));
  }

  filterTestingLocation = (cityName) => {
    const listLocation = this.props.listLocation.filter(location => location.cityName === cityName);
    if (listLocation[0]) {
      console.log('AAAAAAAAAAAAAA', listLocation[0]);
      localStorage.setItem('testingLocation', listLocation[0].label);
    }
    return listLocation;
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
            <div className={classes.RegistrationBody_Content}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px'
                }}
              >
                {/* date */}
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
                      disablePast={true}
                      shouldDisableDate={this.state.testingLocationId && this.filterDisableDates}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                {/* time */}
                <div className={classes.RegistrationBody_Location}>
                  <h4 style={{ color: "#a19f9f" }}>Chọn thời gian bạn muốn xét nghiệm</h4>
                  <Select
                    styles={customStyles}
                    value={{ label: this.state.testingTimeLabel, value: this.state.testingTime }}
                    options={this.props.registeringTimes}
                    onChange={this.handleTimeChange}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px'
                }}
              >
                <div className={classes.RegistrationBody_Location}>
                  <h4 style={{ color: "#a19f9f" }}>Chọn thành phố bạn muốn xét nghiệm</h4>
                  <Select
                    styles={customStyles}
                    value={{ label: this.state.city, value: this.state.city }}
                    options={this.props.listCity}
                    onChange={this.handleCityChange}
                  />
                </div>
                <div className={classes.RegistrationBody_Location}>
                  <h4 style={{ color: "#a19f9f" }}>Chọn địa điểm bạn muốn xét nghiệm</h4>
                  <Select
                    styles={customStyles}
                    value={
                      {
                        label: this.state.location ? this.state.location : (
                          this.filterTestingLocation(this.state.city)[0] ? this.filterTestingLocation(this.state.city)[0].label : null
                        ),
                        value: this.state.location ? this.state.location : (
                          this.filterTestingLocation(this.state.city)[0] ? this.filterTestingLocation(this.state.city)[0].label : null
                        )
                      }
                    }

                    options={this.filterTestingLocation(this.state.city)}
                    onChange={this.handleLocationChange}
                    isDisabled={!this.state.city}
                  />
                </div>
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
                  // clicked={() => this.props.history.push("/register-testing-questions")}
                  clicked={this.handleNextButton}
                  disabled={localStorage.getItem('testingLocation') === null}
                >Tiếp tục</Button>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.invalidTestingTime}
          onClose={this.handleCloseTimeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "black"
              }}
            >
              Thời gian xét nghiệm không hợp lệ, vui lòng chọn lại!
          </DialogContentText>
          </DialogContent>
        </Dialog>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    disableDates: state.disableDates.disableDates,
    error: state.disableDates.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitDisableDates: (testingLocationId) => dispatch(actions.initDisableDates(testingLocationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DateAndLocationRegistration));