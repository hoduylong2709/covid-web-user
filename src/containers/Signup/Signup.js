import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Layout from '../../hoc/Layout/Layout';
import classes from './Signup.module.css';

class Signup extends Component {
  state = {
    controls: {
      email: {
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
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          // minLength: 8
          isValidPassword: true
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm your password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      }
    }
    // isRightPassword: false
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

    if (rules.isValidPassword) {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm;
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
    // if (updatedControls.confirmPassword.value === updatedControls.password.value) {

    //   this.setState({ isRightPassword: true });
    // }
  }

  submitHandler = (event) => {
    event.preventDefault();
    // this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      console.log(key, typeof key);
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

      // if (formElement.config.elementConfig.placeholder === 'Confirm your password') {
      //   input = (
      //     <div>
      //       <p className={classes.PasswordRequirement}>The password must follow the rules
      //       (At least 8 characters, one lowercase character, one uppercase character, one digit, and one special character)
      //       </p>
      //       <Input
      //         key={formElement.id}
      //         elementType={formElement.config.elementType}
      //         elementConfig={formElement.config.elementConfig}
      //         value={formElement.config.value}
      //         invalid={!formElement.config.valid && !formElement.isRightPassword}
      //         shouldValidate={formElement.config.validation}
      //         touched={formElement.config.touched}
      //         valueType={formElement.id}
      //         changed={(event) => this.inputChangedHandler(event, formElement.id)}
      //       />
      //     </div>
      //   );
      // }

      return (
        <div className={classes.InputElement}>
          <h5 className={classes.InputType}>{formElement.id.charAt(0).toUpperCase() + formElement.id.slice(1) + "*"}</h5>
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