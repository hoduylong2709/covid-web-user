import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './../Modal';
import Button from '../../Button/Button';
import classes from './TestingRegistrationModal.module.css';
import * as actions from '../../../../store/actions/index';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

class CheckinLocationModal extends Component {
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onCloseModalCheckinLocation();
  }

  render() {
    let icon = <WarningIcon fontSize="large" style={{ color: 'red' }} />;

    if (this.props.showSuccessIcon) {
      icon = <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />;
    }

    let descCheckin = <h4 className={classes.testingHeader}>{this.props.checkinLocationResult}</h4>

    if (this.props.hasError) {
      descCheckin = <h4 className={classes.testingHeaderError}>{this.props.checkinLocationResult}</h4>
    }

    return (
      <Modal
        show={this.props.showCheckinModal}
        modalClosed={this.props.onCloseModalCheckinLocation}
      >
        <div className={classes.testingModal}>
          {descCheckin}
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
    onCloseModalCheckinLocation: () => dispatch(actions.closeModalCheckinLocation())
  };
};

export default connect(null, mapDispatchToProps)(CheckinLocationModal);