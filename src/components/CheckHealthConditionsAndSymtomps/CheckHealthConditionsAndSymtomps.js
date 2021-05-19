import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './CheckHealthConditionsAndSymtomps.module.css';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Switch from "react-switch";
import Button from '../../components/UI/Button/Button';
import { convertStringToBoolean } from '../../store/utility';

class CheckHealthConditionsAndSymtomps extends Component {
  state = {
    isAsthma: localStorage.getItem('isAsthma') ? convertStringToBoolean(localStorage.getItem('isAsthma')) : false,
    isPregnancy: localStorage.getItem('isPregnancy') ? convertStringToBoolean(localStorage.getItem('isPregnancy')) : false,
    isHighBloodPressure: localStorage.getItem('isHighBloodPressure') ? convertStringToBoolean(localStorage.getItem('isHighBloodPressure')) : false,
    isObesity: localStorage.getItem('isObesity') ? convertStringToBoolean(localStorage.getItem('isObesity')) : false,
    isHeartProblem: localStorage.getItem('isHeartProblem') ? convertStringToBoolean(localStorage.getItem('isHeartProblem')) : false,
    isHiv: localStorage.getItem('isHiv') ? convertStringToBoolean(localStorage.getItem('isHiv')) : false,
    isNone: localStorage.getItem('isNone') ? convertStringToBoolean(localStorage.getItem('isNone')) : false,
    isCoughing: localStorage.getItem('isCoughing') ? convertStringToBoolean(localStorage.getItem('isCoughing')) : false,
    isFever: localStorage.getItem('isFever') ? convertStringToBoolean(localStorage.getItem('isFever')) : false,
    isShortnessOfBreath: localStorage.getItem('isShortnessOfBreath') ? convertStringToBoolean(localStorage.getItem('isShortnessOfBreath')) : false,
    isRunningNose: localStorage.getItem('isRunningNose') ? convertStringToBoolean(localStorage.getItem('isRunningNose')) : false,
    isTired: localStorage.getItem('isTired') ? convertStringToBoolean(localStorage.getItem('isTired')) : false
  };

  handleChangeCheckBox = event => {
    this.setState({
      ...this.state,
      isNone: false,
      [event.target.name]: event.target.checked
    });
  }

  handleNoneCheckBox = event => {
    this.setState({
      ...this.state,
      isAsthma: false,
      isPregnancy: false,
      isHighBloodPressure: false,
      isObesity: false,
      isHeartProblem: false,
      isHiv: false,
      [event.target.name]: event.target.checked
    });
  }

  handleChangeSwitch = (checked, event, id) => {
    console.log(checked, typeof id);
    this.setState({ ...this.state, [id]: checked });
  }

  componentDidUpdate() {
    for (const medicalInfo in this.state) {
      localStorage.setItem(`${medicalInfo}`, this.state[medicalInfo]);
    }
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.HealthConditionsAndSymtompsContainer}>
          <div className={classes.HAndSHeader}>
            <h2 className={classes.HAndSHeader_Title}>Xác nhận tình trạng sức khỏe</h2>
          </div>
          <div className={classes.HAndSBody}>
            <div className={classes.HAndSBody_HC_Header}>
              <h3 className={classes.H3Tag}>Tình trạng sức khỏe</h3>
            </div>
            <div className={classes.HAndSBody_HC_Content}>
              <div className={classes.HAndSBody_HC_Content_column1}>
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#07627e" }}
                        name="isAsthma"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.isAsthma}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Hen suyễn</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#07627e" }}
                        name="isPregnancy"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.isPregnancy}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Mang thai</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#07627e" }}
                        name="isHighBloodPressure"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.isHighBloodPressure}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Cao huyết áp</Typography>}
                  />
                </FormGroup>
              </div>
              <div className={classes.HAndSBody_HC_Content_column2}>
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#07627e" }}
                        name="isHeartProblem"
                        checked={this.state.isHeartProblem}
                        color="primary"
                        onChange={this.handleChangeCheckBox}
                      />
                    }
                    label={<Typography variant="body2">Bệnh tim</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#07627e" }}
                        name="isHiv"
                        checked={this.state.isHiv}
                        color="primary"
                        onChange={this.handleChangeCheckBox}
                      />
                    }
                    label={<Typography variant="body2">HIV</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#07627e" }}
                        name="isNone"
                        onChange={this.handleNoneCheckBox}
                        checked={this.state.isNone}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Bình thường</Typography>}
                  />
                </FormGroup>
              </div>
            </div>
            <div className={classes.HAndSBody_S_Header}>
              <h3 className={classes.H3Tag}>Triệu chứng</h3>
            </div>
            <div className={classes.HAndSBody_S_Content}>
              <div className={classes.SymtompWrapper}>
                <Typography variant="body2">Bạn có trải qua triệu chứng ho?</Typography>
                <Switch onColor="#07627e" id="isCoughing" checked={this.state.isCoughing} onChange={this.handleChangeSwitch} />
              </div>
              <div className={classes.SymtompWrapper}>
                <Typography variant="body2">Bạn có trải qua triệu chứng sốt?</Typography>
                <Switch onColor="#07627e" id="isFever" checked={this.state.isFever} onChange={this.handleChangeSwitch} />
              </div>
              <div className={classes.SymtompWrapper}>
                <Typography variant="body2">Bạn có trải qua triệu chứng khó thở?</Typography>
                <Switch onColor="#07627e" id="isShortnessOfBreath" checked={this.state.isShortnessOfBreath} onChange={this.handleChangeSwitch} />
              </div>
              <div className={classes.SymtompWrapper}>
                <Typography variant="body2">Bạn có trải qua triệu chứng mệt?</Typography>
                <Switch onColor="#07627e" id="isTired" checked={this.state.isTired} onChange={this.handleChangeSwitch} />
              </div>
              <div className={classes.SymtompWrapper}>
                <Typography variant="body2">Bạn có trải qua triệu chứng chảy mũi?</Typography>
                <Switch onColor="#07627e" id="isRunningNose" checked={this.state.isRunningNose} onChange={this.handleChangeSwitch} />
              </div>
            </div>
            <div className={classes.RegistrationBody_Buttons}>
              <div className={classes.CancelButton}>
                <Button
                  anotherType="RegisterButton-Cancel"
                  clicked={() => this.props.history.goBack()}
                >Hủy</Button>
              </div>
              <div className={classes.NextButton}>
                <Button
                  anotherType="RegisterButton-Next"
                  clicked={() => this.props.history.push("/checkout")}
                >Xác nhận</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CheckHealthConditionsAndSymtomps);