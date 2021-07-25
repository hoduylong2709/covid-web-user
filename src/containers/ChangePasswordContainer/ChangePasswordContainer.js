import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import classes from './ChangePasswordContainer.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import CheckinLocationModal from '../../components/UI/Modal/TestingRegistrationModal/CheckinLocationModal';
import { Redirect } from 'react-router';

class ChangePasswordContainer extends Component {
  state = {
    controls: {
      currentPassword: {
        elementName: 'Mật khẩu hiện tại',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Nhập mật khẩu hiện tại của bạn'
        },
        value: '',
        validation: {
          required: true,
          isValidPassword: true
        },
        valid: false,
        touched: false
      },
      newPassword: {
        elementName: 'Mật khẩu mới',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Nhập mật khẩu mới'
        },
        value: '',
        validation: {
          required: true,
          isValidPassword: true
        },
        valid: false,
        touched: false
      },
      confirmNewPassword: {
        elementName: 'Xác nhận mật khẩu mới',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Xác nhận mật khẩu mới'
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

  componentDidUpdate() {
    console.log(this.state.controls);
  }

  checkValidity = (value, rules, valueOfPassword) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
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

    valueOfPassword = updatedControls.newPassword.value;
    updatedControls.confirmNewPassword.valid = this.checkValidity(event.target.value, this.state.controls[controlName].validation, valueOfPassword);

    this.setState({ controls: updatedControls });
  }

  handleSubmitButton = (event) => {
    event.preventDefault();
    this.props.onChangePassword(
      this.state.controls.currentPassword.value,
      this.state.controls.newPassword.value
    );
  }

  render() {
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

      if (formElement.config.elementConfig.placeholder === 'Nhập mật khẩu mới') {
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
      <Layout>
        <div className={classes.ChangePasswordWrapper}>
          <div className={classes.ChangePasswordContainer}>
            <h1>Thay đổi mật khẩu</h1>
            <form>
              {form}
            </form>
            <Button
              btnType="Success"
              disabled={count === 3 ? false : true}
              clicked={this.handleSubmitButton}
            >Xác nhận</Button>
          </div>
          <CheckinLocationModal
            showCheckinModal={this.props.showModal}
            showSuccessIcon={this.props.isSuccess}
            checkinLocationResult={
              this.props.isSuccess ? 'Thay đổi mật khẩu thành công' : this.props.error
            }
            hasError={this.props.error}
            closeModal={this.props.onCloseChangePasswordModal}
          ></CheckinLocationModal>
        </div>
        {this.props.error === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.changePassword.isSuccess,
    error: state.changePassword.error,
    loading: state.changePassword.loading,
    showModal: state.changePassword.showModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onChangePassword: (oldPassword, newPassword) => dispatch(actions.changePassword(oldPassword, newPassword)),
    onCloseChangePasswordModal: () => dispatch(actions.closeChangePasswordModal())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer);