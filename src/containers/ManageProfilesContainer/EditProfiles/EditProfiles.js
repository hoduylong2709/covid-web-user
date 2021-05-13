import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../../hoc/Layout/Layout';
import classes from './EditProfiles.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class EditProfiles extends Component {
  state = {
    controls: {
      firstName: {
        elementName: 'Họ',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Họ của bạn'
        },
        value: '',
        validation: {},
        valid: true,
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
        validation: {},
        valid: true,
        touched: false
      },
      gender: {
        elementName: 'Giới tính',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'mam', displayValue: 'Nam' },
            { value: 'nữ', displayValue: 'Nữ' },
            { value: 'khác', displayValue: 'Khác' }
          ]
        },
        value: 'nam',
        validation: {},
        valid: true
      },
      email: {
        elementName: 'Email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Nhập email muốn thay đổi'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      phoneNumber: {
        elementName: 'Số điện thoại',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Số điện thoại của bạn'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      IdNo: {
        elementName: 'Số CMND',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Số CMND của bạn'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      nationality: {
        elementName: 'Quốc tịch',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Quốc tịch của bạn'
        },
        value: '',
        validation: {},
        valid: false,
        touched: false
      },
      address: {
        elementName: 'Địa chỉ',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Địa chỉ của bạn'
        },
        value: '',
        validation: {},
        valid: true,
        touched: false
      },
    }
  };

  componentDidUpdate() {
    console.log(this.state.controls);
  }

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
      if (formElement.config.touched) {
        count++;
      }
    });

    console.log(count);

    let form1 = formElementsArray.slice(0, 4).map(formElement => {
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
        editStyle="EditProfile"
      />;

      if (formElement.config.elementName === 'Email') {
        input = (
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
            editStyle="EditProfile"
            disabledInput={true}
          />
        );
      }

      return (
        <div style={{ marginBottom: '15px' }} className={classes.InputElement}>
          <h4 style={{ margin: '10px auto' }} className={classes.InputType}>{formElement.config.elementName}</h4>
          {input}
        </div>
      );
    });

    let form2 = formElementsArray.slice(4, 8).map(formElement => {
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
        editStyle="EditProfile"
      />;

      return (
        <div style={{ marginBottom: '15px' }} className={classes.InputElement}>
          <h4 style={{ margin: '10px auto' }} className={classes.InputType}>{formElement.config.elementName}</h4>
          {input}
        </div>
      );
    });

    return (
      <Layout>
        <div className={classes.EditProfilesWrapper}>
          <div className={classes.EditProfilesContainer}>
            <div className={classes.EditProfilesContainer_Header}>
              <h2>Chỉnh sửa hồ sơ</h2>
            </div>
            <div className={classes.EditProfilesContainer_Body}>
              <form>
                <div className={classes.FormContainer}>
                  <div className={classes.FormType}>
                    {form1}
                  </div>
                  <div className={classes.FormType}>
                    {form2}
                  </div>
                </div>
              </form>
              <div className={classes.Buttons}>
                <div className={classes.SubmitButton}>
                  <Button
                    anotherType="RegisterButton-Next"
                    clicked={this.handleSubmitButton}
                    disabled={count <= 0}
                  >Xác nhận</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default EditProfiles;