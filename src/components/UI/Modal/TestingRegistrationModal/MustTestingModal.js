import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './../Modal';
import Button from '../../Button/Button';
import classes from './TestingRegistrationModal.module.css';
import IsoIcon from '@material-ui/icons/Iso';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class MustTestingModal extends Component {
  handleSubmit = () => {
    if (this.props.isEditItinerary) {
      this.props.onFinishEditItineraryInfo();
    } else {
      this.props.onFinishSubmitItinerary();
    }
    this.props.history.push("/testing");
  }

  render() {
    return (
      <Modal
        show={this.props.mustTesting}
        modalClosed={this.props.closeModal}
      >
        <div className={classes.testingModal}>
          <h4 className={classes.ItineraryInfoHeader}>
            Dựa vào khai báo lịch trình, bạn thuộc diện bắt buộc xét nghiệm. Vui lòng đến mục XÉT NGHIỆM !
        </h4>
          <IsoIcon fontSize="large" style={{ color: 'red' }} />
          <div className={classes.Button}>
            <div className={classes.SubmitButton}>
              <Button
                anotherType="RegisterButton-Next"
                // clicked={() => this.props.history.push("/testing")}
                clicked={this.handleSubmit}
              >Đến XÉT NGHIỆM</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFinishSubmitItinerary: () => dispatch(actions.finishSubmitItineraryInfo()),
    onFinishEditItineraryInfo: () => dispatch(actions.finishEditItineraryInfo())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(MustTestingModal));