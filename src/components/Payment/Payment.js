import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import classes from './Payment.module.css';
import Typography from '@material-ui/core/Typography';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { convertStringToBoolean } from '../../store/utility';
import LoadingModal from '../UI/Modal/LoadingModal/LoadingModal';
import TestingRegistrationModal from '../UI/Modal/TestingRegistrationModal/TestingRegistrationModal';

class Payment extends Component {
  componentDidMount() {
    console.log(this.props.listLocation);
  }

  handleCheckout = (event) => {
    event.preventDefault();
    const location = this.props.listLocation.find(ele => ele.name === localStorage.getItem('testingLocation'));
    const testingLocationId = location.id;
    const registerDate = moment(new Date()).format();
    const testingDate = moment(localStorage.getItem('testingDate')).format();
    console.log('HDL', testingLocationId, registerDate, testingDate);
    this.props.onTestingRegistration(testingLocationId, registerDate, testingDate);
    const asthma = convertStringToBoolean(localStorage.getItem('isAsthma'));
    const pregnancy = convertStringToBoolean(localStorage.getItem('isPregnancy'));
    const highBloodPressure = convertStringToBoolean(localStorage.getItem('isHighBloodPressure'));
    const obesity = convertStringToBoolean(localStorage.getItem('isObesity'));
    const heartProblem = convertStringToBoolean(localStorage.getItem('isHeartProblem'));
    const hiv = convertStringToBoolean(localStorage.getItem('isHiv'));
    const none = convertStringToBoolean(localStorage.getItem('isNone'));
    const cough = convertStringToBoolean(localStorage.getItem('isCoughing'));
    const fever = convertStringToBoolean(localStorage.getItem('isFever'));
    const shortnessOfBreath = convertStringToBoolean(localStorage.getItem('isShortnessOfBreath'));
    const runningNose = convertStringToBoolean(localStorage.getItem('isRunningNose'));
    const tiredness = convertStringToBoolean(localStorage.getItem('isTired'));
    console.log(
      asthma,
      pregnancy,
      highBloodPressure,
      obesity,
      heartProblem,
      hiv,
      cough,
      fever,
      shortnessOfBreath,
      runningNose,
      tiredness,
      none
    );
    this.props.isSuccess === true && this.props.onSubmitMedicalInfo(
      asthma,
      pregnancy,
      highBloodPressure,
      obesity,
      heartProblem,
      hiv,
      cough,
      fever,
      shortnessOfBreath,
      runningNose,
      tiredness,
      none
    );
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
        <LoadingModal show={this.props.loading || this.props.loadingMI}></LoadingModal>
        <TestingRegistrationModal
          showTestingModal={this.props.showModal}
          showSuccessIcon={this.props.isSuccess && this.props.isSuccessMI}
          testingRegistrationResult={
            this.props.isSuccess && this.props.isSuccessMI ? 'Đăng ký xét nghiệm COVID-19 thành công' : this.props.error
          }
          hasError={this.props.error}
        ></TestingRegistrationModal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.testingRegistration.isSuccess,
    error: state.testingRegistration.error,
    loading: state.testingRegistration.loading,
    isSuccessMI: state.submitMedicalInfo.isSuccess,
    errorMI: state.submitMedicalInfo.error,
    loadingMI: state.submitMedicalInfo.loading,
    showModal: state.submitMedicalInfo.showModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTestingRegistration: (testingLocationId, registerDate, testingDate) => dispatch(actions.testingRegistration(testingLocationId, registerDate, testingDate)),
    onSubmitMedicalInfo: (
      asthma,
      pregnancy,
      highBloodPressure,
      obesity,
      heartProblem,
      hiv,
      cough,
      fever,
      shortnessOfBreath,
      runningNose,
      tiredness,
      none
    ) => dispatch(actions.submitMedicalInfo(
      asthma,
      pregnancy,
      highBloodPressure,
      obesity,
      heartProblem,
      hiv,
      cough,
      fever,
      shortnessOfBreath,
      runningNose,
      tiredness,
      none
    ))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));