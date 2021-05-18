import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from '../../../hoc/Layout/Layout';
import classes from './EditProfiles.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import moment from 'moment';
import * as actions from '../../../store/actions/index';
import CheckinLocationModal from '../../../components/UI/Modal/TestingRegistrationModal/CheckinLocationModal';
import countryList from 'react-select-country-list'

class EditProfiles extends Component {
  state = {
    controls: {
      firstName: {
        elementName: 'Họ',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ''
        },
        value: `${localStorage.getItem('firstName')}`,
        validation: {},
        valid: true,
        touched: false
      },
      lastName: {
        elementName: 'Tên',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ''
        },
        value: `${localStorage.getItem('lastName')}`,
        validation: {},
        valid: true,
        touched: false
      },
      gender: {
        elementName: 'Giới tính',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'nam', displayValue: 'Nam' },
            { value: 'nữ', displayValue: 'Nữ' },
            { value: 'khác', displayValue: 'Khác' }
          ]
        },
        value: `${localStorage.getItem('gender') ? localStorage.getItem('gender').toLowerCase() : 'nam'}`,
        validation: {},
        valid: true
      },
      dateOfBirth: {
        elementName: 'Ngày sinh',
        elementType: 'input',
        elementConfig: {
          type: 'date'
        },
        value: `${localStorage.getItem('dateOfBirth') ? moment(localStorage.getItem('dateOfBirth')).format('YYYY-MM-DD') : ''}`,
        validation: {},
        valid: true,
        touched: false
      },
      phoneNumber: {
        elementName: 'Số điện thoại',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ''
        },
        value: `${localStorage.getItem('phoneNumber') ? localStorage.getItem('phoneNumber') : 'N/A'}`,
        validation: {
          required: true,
          isNumeric: true
        },
        valid: true,
        touched: false
      },
      idNo: {
        elementName: 'Số CMND',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ''
        },
        value: `${localStorage.getItem('idNo') ? localStorage.getItem('idNo') : 'N/A'}`,
        validation: {
          required: true,
          isNumeric: true
        },
        valid: true,
        touched: false
      },
      nationality: {
        elementName: 'Quốc tịch',
        elementType: 'select',
        elementConfig: {
          options: countryList().getData().map(country => {
            return { value: country.label, displayValue: country.label }
          })
        },
        value: `${localStorage.getItem('nationality') ? localStorage.getItem('nationality') : ''}`,
        validation: {},
        valid: true
      },
      address: {
        elementName: 'Địa chỉ',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ''
        },
        value: `${localStorage.getItem('address') ? localStorage.getItem('address') : 'N/A'}`,
        validation: {},
        valid: true,
        touched: false
      },
    }
  };

  componentDidMount() {
    console.log(countryList().getData());
  }

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

  handleSubmitButton = (event) => {
    event.preventDefault();
    this.props.onEditProfiles(
      this.state.controls.firstName.value,
      this.state.controls.lastName.value,
      this.state.controls.phoneNumber.value,
      this.state.controls.dateOfBirth.value,
      this.state.controls.gender.value,
      this.state.controls.idNo.value,
      this.state.controls.nationality.value,
      this.state.controls.address.value,
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

    let count1 = 0;
    let count2 = 0;

    formElementsArray.forEach(formElement => {
      if (formElement.config.value !== '' && formElement.config.value !== 'N/A' && formElement.config.valid) {
        count1++;
      }

      if (formElement.config.touched) {
        count2++;
      }
    });

    console.log(count1);

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

      return (
        <div style={{ marginBottom: '15px' }} className={classes.InputElement}>
          <h4 style={{ margin: '10px auto' }} className={classes.InputType}>{formElement.config.elementName + "*"}</h4>
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
          <h4 style={{ margin: '10px auto' }} className={classes.InputType}>{formElement.config.elementName + "*"}</h4>
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
                    disabled={count1 !== 8 || count2 === 0}
                  >Xác nhận</Button>
                </div>
                <div className={classes.CancelButton}>
                  <Button
                    anotherType="Success"
                    clicked={() => this.props.history.goBack()}
                  >Hủy</Button>
                </div>
              </div>
            </div>
            <CheckinLocationModal
              showCheckinModal={this.props.showModal}
              showSuccessIcon={this.props.isSuccess}
              checkinLocationResult={
                this.props.isSuccess ? 'Cập nhật thông tin thành công' : this.props.error
              }
              hasError={this.props.error}
              closeModal={this.props.onCloseEditProfilesModal}
              goToProfile={true}
            ></CheckinLocationModal>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.editProfiles.isSuccess,
    error: state.editProfiles.error,
    loading: state.editProfiles.loading,
    showModal: state.editProfiles.showModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onEditProfiles: (
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      idNo,
      nationality,
      address
    ) => dispatch(actions.editProfiles(
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      idNo,
      nationality,
      address
    )),
    onCloseEditProfilesModal: () => dispatch(actions.closeEditProfilesModal())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfiles));