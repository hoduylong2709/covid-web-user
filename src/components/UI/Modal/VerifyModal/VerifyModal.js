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

  render() {
    return (
      <Modal
        show={this.props.showVerifyModal}
        modalClosed={this.props.closeModal}
      >
        <div className={classes.VerifyModal}>
          <h4 className={classes.VerifyHeader}>Vui lòng kiểm tra Email và nhập mã code</h4>
          <input className={classes.VerifyInput} type="text" name="code-number" placeholder="Code" onChange={this.inputChangeHandler} />
          <div className={classes.Button}>
            <div className={classes.SubmitButton}>
              <Button
                btnType="Success"
                clicked={this.props.onVerifyEmail(this.props.accountId, this.state.inputValue)}
              >Submit</Button>
            </div>
            <div className={classes.CancelButton}>
              <Button btnType="Danger">Cancel</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountId: state.signup.accountId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVerifyEmail: (accountId, code) => dispatch(actions.verifyEmail(accountId, code))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);