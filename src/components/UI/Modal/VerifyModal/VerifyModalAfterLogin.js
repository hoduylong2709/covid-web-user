import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

  handleCancelButton = (event) => {
    localStorage.clear();
    this.props.onCloseVerifyModalAfterLogin();
    this.props.history.push("/");
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
        modalClosed={this.props.onCloseVerifyModalAfterLogin}
      >
        <div className={classes.VerifyModal}>
          <h4 className={classes.VerifyHeader}>Vui lòng kiểm tra Email và nhập mã code</h4>
          <input className={classes.VerifyInput} type="text" name="code-number" placeholder="Code" onChange={this.inputChangeHandler} />
          <div className={classes.VerifyResult}>
            {verifyResult}
          </div>
          <div className={classes.Button}>
            <div
              style={{
                marginRight: '3px'
              }}
            >
              <Button
                btnType="Success"
                anotherType="VerifyAfterLoginSubmitButton"
                clicked={() => this.props.onVerifyEmailAfterLogin(this.props.email, this.state.inputValue)}
              >Xác nhận</Button>
            </div>
            <div
              style={{
                marginLeft: '3px'
              }}
            >
              <Button
                btnType="Danger"
                anotherType="VerifyAfterLoginCancelButton"
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyModalAfterLogin));