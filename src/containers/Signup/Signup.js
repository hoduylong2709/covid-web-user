import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Layout from '../../hoc/Layout/Layout';
import classes from './Signup.module.css';

class Signup extends Component {
  state = {
    controls: {
      email: {
        elementName: 'Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
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
        elementName: 'First Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your First Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      lastName: {
        elementName: 'Last Name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Last Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementName: 'Password',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
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
        elementName: 'Confirm Password',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm your password'
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
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
        valueType={formElement.id}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />;

      if (formElement.config.elementConfig.placeholder === 'Password') {
        input = (
          <div>
            <p className={classes.PasswordRequirement}>The password must follow the rules
            (At least 8 characters, one lowercase character, one uppercase character, one digit, and one special character)
            </p>
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
        <div className={classes.SignupContainer}>
          <div className={classes.Signup}>
            <h1>Create A New Account</h1>
            <form onSubmit={this.submitHandler}>
              {form}
            </form>
            <Button btnType="Success" disabled={count === 5 ? false : true}>Create</Button>
          </div>
        </div>
      </Layout>
    );
  };
};

export default Signup;