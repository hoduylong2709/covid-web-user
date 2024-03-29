import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Layout from '../../hoc/Layout/Layout';
import classes from './Signup.module.css';
import * as actions from '../../store/actions/index';
import Modal from './../../components/UI/Modal/Modal';
import VerifyModal from '../../components/UI/Modal/VerifyModal/VerifyModal';
import LoadingModal from '../../components/UI/Modal/LoadingModal/LoadingModal';

class Signup extends Component {
  state = {
    controls: {
      email: {
        elementName: 'Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Nhập email muốn đăng ký'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      firstName: {
        elementName: 'Họ',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Họ của bạn'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      lastName: {
        elementName: 'Tên',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Tên của bạn'
        },
        value: '',
        validation: {
          required: true
        },
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
    },
    err: null
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

    if (rules.isEmail) {
      const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isValidPassword) {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/gm;
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
    this.props.onSignup(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.firstName.value,
      this.state.controls.lastName.value
    );
    if (this.props.error) {
      this.setState({ err: this.props.error });
    }
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

      if (formElement.config.elementConfig.placeholder === 'Mật khẩu') {
        input = (
          <div>
            <p className={classes.PasswordRequirement}>Mật khẩu phải tuân theo quy tắc
              (Chứa ít nhất 8 ký tự, 1 ký tự thường, 1 ký tự in hoa, 1 chữ số, và 1 ký tự đặc biệt @$!%*?&^#)
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
      <div>
        <Layout>
          <div className={classes.SignupContainer}>
            <div className={classes.Signup}>
              <h1>Tạo tài khoản mới</h1>
              <form>
                {form}
              </form>
              <Button btnType="Success" disabled={count === 5 ? false : true} clicked={this.submitHandler}>Đăng ký</Button>
            </div>
          </div>
          <LoadingModal show={this.props.loading}></LoadingModal>
        </Layout>
        {this.props.error && <Modal
          show={this.props.error}
          modalClosed={this.props.onCloseModalSignup}>
          {this.props.error}
        </Modal>}
        <VerifyModal
          showVerifyModal={this.props.isVerifying}
          email={this.state.controls.email.value}
        >
        </VerifyModal>
        {this.props.error === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isSuccess: state.signup.isSuccess,
    accountId: state.signup.accountId,
    loading: state.signup.loading,
    error: state.signup.error,
    isVerifying: state.signup.isVerifying
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (email, password, firstName, lastName) => dispatch(actions.signup(email, password, firstName, lastName)),
    onCloseModalSignup: () => dispatch(actions.closeModalSignup())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);