import React, { Component } from 'react';
import Modal from './../Modal';
import Button from '../../Button/Button';
import classes from './TestingRegistrationModal.module.css';
import IsoIcon from '@material-ui/icons/Iso';
import { withRouter } from 'react-router-dom';

class MustTestingModal extends Component {
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
                clicked={() => this.props.history.push("/testing")}
              >Đến XÉT NGHIỆM</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withRouter(MustTestingModal);