import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import Button from '../../Button/Button';
import classes from './VerifyModal.module.css';
import * as actions from '../../../../store/actions/index';

class VerifyModal extends Component {
  state = {
    inputValue: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleCancelButton = (event) => {
    event.preventDefault();
    this.props.onFinishSignup();
    this.setState({ inputValue: '' });
    this.props.onCloseVerifyModalSignup()
  }

  render() {
    let verifyResult = null;

    if (this.props.verifySuccess === true) {
      verifyResult = (<p className={classes.Verified}>Email đã được xác nhận.</p>);
    }

    if (this.props.verifyError) {
      verifyResult = (<p className={classes.InvalidVerified}>{this.props.verifyError}</p>);
    }

    return (
      <Modal
        show={this.props.showVerifyModal}
        modalClosed={this.handleCancelButton}
      >
        <div className={classes.VerifyModal}>
          <h4 className={classes.VerifyHeader}>Vui lòng kiểm tra Email và nhập mã code</h4>
          <input className={classes.VerifyInput} type="text" name="code-number" placeholder="Code" onChange={this.inputChangeHandler} value={this.state.inputValue} />
          <div className={classes.VerifyResult}>
            {verifyResult}
          </div>
          <div className={classes.Button}>
            <div className={classes.SubmitButton}>
              <Button
                btnType="Success"
                clicked={() => this.props.onVerifyEmail(this.props.email, this.state.inputValue)}
              >Xác nhận</Button>
            </div>
            <div className={classes.CancelButton}>
              <Button
                btnType="Danger"
                clicked={this.handleCancelButton}
              >Hủy</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountId: state.signup.accountId,
    verifySuccess: state.signup.verifySuccess,
    verifyError: state.signup.verifyError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVerifyEmail: (email, code) => dispatch(actions.verifyEmail(email, code)),
    onCloseVerifyModalSignup: () => dispatch(actions.closeVerifyModalSignup()),
    onFinishSignup: () => dispatch(actions.finishSignup())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);