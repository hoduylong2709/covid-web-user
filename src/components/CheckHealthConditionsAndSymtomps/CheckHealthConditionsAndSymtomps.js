import React, { Component } from 'react';

import classes from './CheckHealthConditionsAndSymtomps.module.css';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

class CheckHealthConditionsAndSymtomps extends Component {
  state = {
    isAsthma: false,
    isPregnancy: false,
    isHighBloodPressure: false,
    isObesity: false,
    isHeartProblem: false,
    isHiv: false,
    isNone: false
  };

  handleChangeCheckBox = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
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
              <h3>Tình trạng sức khỏe</h3>
            </div>
            <div className={classes.HAndSBody_HC_Content}>
              <div className={classes.HAndSBody_HC_Content_column1}>
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Checkbox
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
                        name="isHighBloodPressure"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.isHighBloodPressure}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Cao huyết áp</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isNone"
                        onChange={this.handleChangeCheckBox}
                        checked={this.state.isNone}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body2">Không có triệu chứng</Typography>}
                  />
                </FormGroup>
              </div>
              <div className={classes.HAndSBody_HC_Content_column2}>
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isObesity"
                        checked={this.state.isObesity}
                        color="primary"
                        onChange={this.handleChangeCheckBox}
                      />
                    }
                    label={<Typography variant="body2">Béo phì</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
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
                        name="isHiv"
                        checked={this.state.isHiv}
                        color="primary"
                        onChange={this.handleChangeCheckBox}
                      />
                    }
                    label={<Typography variant="body2">HIV</Typography>}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckHealthConditionsAndSymtomps;