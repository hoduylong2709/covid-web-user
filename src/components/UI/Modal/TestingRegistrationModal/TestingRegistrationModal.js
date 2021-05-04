import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from './../Modal';
import Button from '../../Button/Button';
import classes from './TestingRegistrationModal.module.css';
import * as actions from '../../../../store/actions/index';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

class TestingRegistrationModal extends Component {
  submitHandler = (event) => {
    event.preventDefault();
    this.props.history.push('/testing');
    this.props.onCloseModalTestingRegistration();
    localStorage.setItem('testingDate', new Date());
    localStorage.setItem('testingLocation', '');
    localStorage.setItem('isAsthma', false);
    localStorage.setItem('isPregnancy', false);
    localStorage.setItem('isHighBloodPressure', false);
    localStorage.setItem('isObesity', false);
    localStorage.setItem('isHeartProblem', false);
    localStorage.setItem('isHiv', false);
    localStorage.setItem('isNone', false);
    localStorage.setItem('isCoughing', false);
    localStorage.setItem('isFever', false);
    localStorage.setItem('isShortnessOfBreath', false);
    localStorage.setItem('isRunningNose', false);
    localStorage.setItem('isTired', false);
  }

  render() {
    let icon = <WarningIcon fontSize="large" style={{ color: 'red' }} />;

    if (this.props.showSuccessIcon) {
      icon = <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />;
    }

    let descRegistration = <h4 className={classes.testingHeader}>{this.props.testingRegistrationResult}</h4>

    if (this.props.hasError) {
      descRegistration = <h4 className={classes.testingHeaderError}>{this.props.testingRegistrationResult}</h4>
    }

    return (
      <Modal
        show={this.props.showTestingModal}
        modalClosed={this.props.onCloseModalTestingRegistration}
      >
        <div className={classes.testingModal}>
          {/* <h4 className={classes.testingHeader}>{this.props.testingRegistrationResult}</h4> */}
          {descRegistration}
          {icon}
          <div className={classes.Button}>
            <div className={classes.SubmitButton}>
              <Button
                btnType="Success"
                clicked={this.submitHandler}
              >Xác nhận</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseModalTestingRegistration: () => dispatch(actions.closeModalTestingRegistration())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(TestingRegistrationModal));

