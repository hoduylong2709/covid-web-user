import React, { Component } from 'react';

import Layout from '../../hoc/Layout/Layout';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './ForgotPassword.module.css';

class ForgotPassword extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email của bạn'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
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
    console.log('You clicked done button');
    // this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <div className={classes.InputElement}>
        <h5 className={classes.InputType}>{formElement.id.charAt(0).toUpperCase() + formElement.id.slice(1)}</h5>
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          valueType={formElement.id}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      </div>
    ));

    return (
      <Layout>
        <div className={classes.FgPasswordContainer}>
          <div className={classes.FgPassword}>
            <h1>Quên mật khẩu?</h1>
            <p className={classes.FgPasswordText}>Vui lòng nhập email của bạn</p>
            <form>
              {form}
            </form>
            <Button btnType="Success" clicked={this.submitHandler}>Xác nhận</Button>
          </div>
        </div>
      </Layout>
    );
  };
};

export default ForgotPassword