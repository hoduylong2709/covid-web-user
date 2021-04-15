import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Layout from '../../hoc/Layout/Layout';
import classes from './Login.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Login extends Component {
  state = {
    controls: {
      email: {
        elementName: 'Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Nhập email của bạn'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementName: 'Mật khẩu',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'nhập mật khẩu của bạn'
        },
        value: '',
        validation: {
          // required: true,
          // minLength: 8
        },
        valid: false,
        touched: false
      }
    },
    passwordShown: false
  };

  togglePasswordVisiblity = () => {
    this.setState(prevState => {
      return { passwordShown: !prevState.passwordShown }
    });
  };

  checkValidity = (value, rules) => {
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
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => {
      let input = <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        valueType={formElement.id}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />;

      if (formElement.config.elementConfig.placeholder === 'Password') {
        input = (
          <div className={classes.PasswordFeild}>
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType={formElement.id}
              showPassword={this.state.passwordShown}
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
        <div className={classes.LoginContainer}>
          {this.props.loading ? <Spinner className={classes.LoginSpinner}></Spinner> : <div className={classes.Login}>
            <h1>Đăng nhập</h1>
            <form>
              {form}
            </form>
            <div className={classes.ForgotPassword}>
              <a href="/forgot-password" className={classes.ForgotPasswordLink}>Quên mật khẩu?</a>
              <a href="/signup" className={classes.RegisterLink}>Chưa có tài khoản?</a>
            </div>
            <Button btnType="Success" clicked={this.submitHandler}>Đăng nhập</Button>
          </div>}
          {/* <div className={classes.Login}>
            <h1>Đăng nhập</h1>
            <form>
              {form}
            </form>
            <div className={classes.ForgotPassword}>
              <a href="/forgot-password" className={classes.ForgotPasswordLink}>Quên mật khẩu?</a>
              <a href="/signup" className={classes.RegisterLink}>Chưa có tài khoản?</a>
            </div>
            <Button btnType="Success" clicked={this.submitHandler}>Đăng nhập</Button>
          </div> */}
        </div>
        {this.props.error && <Modal
          show={this.props.error}
          modalClosed={this.props.onCloseModalErrorLogin}>
          {this.props.error}
        </Modal>}
        {/* {true && <Spinner className={classes.LoginSpinner}></Spinner>} */}
      </Layout>
    );
  };
};

const mapStateToProps = state => {
  return {
    isSuccess: state.login.isSuccess,
    userId: state.login.userId,
    token: state.login.token,
    fullName: state.login.fullName,
    role: state.login.role,
    error: state.login.error,
    loading: state.login.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onCloseModalErrorLogin: () => dispatch(actions.closeModalErrorLogin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);