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
    date: localStorage.getItem('testingDate') ? localStorage.getItem('testingDate') : new Date(),
    location: localStorage.getItem('testingLocation') ? localStorage.getItem('testingLocation') : "",
    city: localStorage.getItem('testingCity') ? localStorage.getItem('testingCity') : "",
    testingLocationId: null,
    testingCityId: null,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.testingLocationId !== this.state.testingLocationId) {
      this.props.onInitDisableDates(this.state.testingLocationId);
    }
    localStorage.setItem('testingDate', this.state.date);
    localStorage.setItem('testingLocation', this.state.location);
    localStorage.setItem('testingCity', this.state.city);
    console.log('city id', this.state.testingCityId);
    console.log('location id', this.state.testingLocationId);
  }

  filterDisableDates = (date) => {
    const updatedDisableDatesArray = this.props.disableDates.map(date => moment(date).format('YYYY-MM-DD'));
    return updatedDisableDatesArray.includes(moment(date).format('YYYY-MM-DD'));
  }

  filterTestingLocation = (cityId) => {
    return this.props.listLocation.filter(location => location.cityId === cityId);
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px'
                }}
              >
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
                <div className={classes.RegistrationBody_Location}>
                  <h4 style={{ color: "#a19f9f" }}>Chọn địa điểm bạn muốn xét nghiệm</h4>
                  <Select
                    styles={customStyles}
                    value={{ label: this.state.location, value: this.state.location }}
                    options={this.filterTestingLocation(this.state.testingCityId)}
                    onChange={this.handleLocationChange}
                    isDisabled={!this.state.city}
                  />
                </div>
              </div>
              <div className={classes.RegistrationBody_Location}>
                <h4 style={{ color: "#a19f9f" }}>Chọn thành phố bạn muốn xét nghiệm</h4>
                <Select
                  styles={customStyles}
                  value={this.state.city !== "" ? { label: this.state.city, value: this.state.city } : null}
                  options={this.props.listCity}
                  onChange={this.handleCityChange}
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
                  // disabled={this.state.testingLocationId === null || this.state.testingCityId === null}
                  disabled={localStorage.getItem('testingLocation') === '' || localStorage.getItem('testingCity') === ''}
                >Tiếp tục</Button>
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