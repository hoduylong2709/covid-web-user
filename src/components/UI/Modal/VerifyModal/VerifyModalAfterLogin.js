import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import Button from '../../Button/Button';
import classes from './VerifyModal.module.css';
import * as actions from '../../../../store/actions/index';

class VerifyModalAfterLogin extends Component {
  state = {
    inputValue: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ inputValue: e.target.value });
  };

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
        modalClosed={this.props.onCloseVerifyModalAfterLogin}
      >
        <div className={classes.VerifyModal}>
          <h4 className={classes.VerifyHeader}>Vui lòng kiểm tra Email và nhập mã code</h4>
          <input className={classes.VerifyInput} type="text" name="code-number" placeholder="Code" onChange={this.inputChangeHandler} />
          <div className={classes.VerifyResult}>
            {verifyResult}
          </div>
          <div className={classes.Button}>
            <div className={classes.SubmitButton}>
              <Button
                btnType="Success"
                clicked={() => this.props.onVerifyEmailAfterLogin(this.props.email, this.state.inputValue)}
              >Xác nhận</Button>
            </div>
            <div className={classes.CancelButton}>
              <Button
                btnType="Danger"
                disabled={localStorage.getItem('isVerified') === 'false'}
                clicked={() => this.props.onCloseVerifyModalAfterLogin()}
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
    verifySuccess: state.verifyEmailAfterLogin.verifySuccess,
    verifyError: state.verifyEmailAfterLogin.verifyError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVerifyEmailAfterLogin: (email, code) => dispatch(actions.verifyEmailAfterLogin(email, code)),
    onCloseVerifyModalAfterLogin: () => dispatch(actions.closeVerifyModalAfterLogin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModalAfterLogin);