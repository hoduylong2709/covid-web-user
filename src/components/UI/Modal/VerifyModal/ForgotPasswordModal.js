import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import Button from '../../Button/Button';
import classes from './VerifyModal.module.css';
import Input from '../../Input/Input';
import * as actions from '../../../../store/actions/index';

class ForgotPasswordModal extends Component {
  state = {
    controls: {
      code: {
        elementName: 'Code',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'nhập code'
        },
        value: '',
        validation: {},
        valid: false,
        touched: false
      },
      password: {
        elementName: 'Mật khẩu',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Mật khẩu'
        },
        value: '',
        validation: {
          required: true,
          isValidPassword: true
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementName: 'Xác nhận mật khẩu',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Xác nhận mật khẩu'
        },
        value: '',
        validation: {
          required: true,
          isValidConfirmPassword: true
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity = (value, rules, valueOfPassword) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isValidPassword) {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isValidConfirmPassword) {
      isValid = value === valueOfPassword && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    let valueOfPassword = '';

    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation, valueOfPassword),
        touched: true
      }
    };

    valueOfPassword = updatedControls.password.value;
    updatedControls.confirmPassword.valid = this.checkValidity(event.target.value, this.state.controls[controlName].validation, valueOfPassword);

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onRecoverProcess(
      this.props.email,
      this.state.controls.code.value,
      this.state.controls.password.value
    );
  };

  render() {
    let recoverResult = null;

    if (this.props.recoverSuccess === true) {
      recoverResult = (<p className={classes.Verified}>{this.props.recoverMessage}</p>);
      console.log(recoverResult);
    }

    if (this.props.recoverError) {
      recoverResult = (<p className={classes.InvalidVerified}>Mã xác nhận không chính xác</p>);
      console.log(recoverResult);
    }

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let count = 0;

    formElementsArray.forEach(formElement => {
      if (formElement.config.valid) {
        count++;
      }
    });

    let form = formElementsArray.map(formElement => {
      let input = <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        valueType={formElement.config.elementName}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />;

      if (formElement.config.elementConfig.placeholder === 'Mật khẩu') {
        input = (
          <div>
            <p className={classes.PasswordRequirement}>Mật khẩu phải tuân theo quy tắc
            (Chứa ít nhất 8 ký tự, 1 ký tự thường, 1 ký tự in hoa, 1 chữ số, và 1 ký tự đặc biệt)
            </p>
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType={formElement.config.elementName}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          </div>
        );
      }

      return (
        <div className={classes.InputElement}>
          <h5 className={classes.InputType}>{formElement.config.elementName + "*"}</h5>
          {input}
        </div>
      );
    });

    return (
      <Modal
        show={this.props.showVerifyModal}
        modalClosed={this.props.onCloseRecoverProcessModal}
      >
        <div className={classes.VerifyModal}>
          <h4 className={classes.VerifyHeader}>{this.props.message}</h4>
          {form}
          <div className={classes.VerifyResult}>
            {recoverResult}
          </div>
          <div className={classes.Button}>
            <div className={classes.SubmitButton}>
              <Button
                btnType="Success"
                disabled={count === 3 ? false : true}
                clicked={this.submitHandler}
              >Xác nhận</Button>
            </div>
            <div className={classes.CancelButton}>
              <Button
                btnType="Danger"
                clicked={() => this.props.onCloseRecoverProcessModal()}
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
    isSuccess: state.forgotPassword.isSuccess,
    message: state.forgotPassword.message,
    error: state.forgotPassword.error,
    loading: state.forgotPassword.loading,
    recoverSuccess: state.forgotPassword.recoverSuccess,
    recoverMessage: state.forgotPassword.recoverMessage,
    recoverError: state.forgotPassword.recoverError,
    isRecovering: state.forgotPassword.isRecovering
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRecoverProcess: (email, code, password) => dispatch(actions.recoverProcess(email, code, password)),
    onCloseRecoverProcessModal: () => dispatch(actions.closeRecoverProcessModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModal);