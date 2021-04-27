import React, { Component } from 'react';

import classes from './CheckHealthConditionsAndSymtomps.module.css';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

class CheckHealthConditionsAndSymtomps extends Component {
  state = {
    healthConditions: {
      column1: [
        {
          key: "asthma",
          name: "Hen suyễn",
          checked: false
        },
        {
          key: "pregnancy",
          name: "Mang thai",
          checked: false
        },
        {
          key: "highBloodPressure",
          name: "Cao huyết áp",
          checked: false
        },
        {
          key: "none",
          name: "Không có triệu chứng",
          checked: false
        }
      ],
      column2: [{
        key: "obesity",
        name: "Béo phì",
        checked: false
      },
      {
        key: "heartProblem",
        name: "Bệnh tim",
        checked: false
      },
      {
        key: "hiv",
        name: "HIV",
        checked: false
      }]
    }
  };

  // handleChangeCheckBox = event => {
  //   this.setState({ ...this.state, this.state.: event.target.checked });
  // }

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
                  {this.state.healthConditions.column1.map(condition => (
                    <FormControlLabel
                      key={condition.key}
                      control={
                        <Checkbox
                          onChange={this.handleChangeCheckBox}
                          checked={condition.checked}
                          color="primary"
                        />
                      }
                      label={<Typography variant="body2">{condition.name}</Typography>}
                    />
                  ))}
                </FormGroup>
              </div>
              <div className={classes.HAndSBody_HC_Content_column2}>
                <FormGroup column>
                  {this.state.healthConditions.column2.map(condition => (
                    <FormControlLabel
                      key={condition.key}
                      control={
                        <Checkbox
                          checked={condition.checked}
                          color="primary"
                        />
                      }
                      label={<Typography variant="body2">{condition.name}</Typography>}
                    />
                  ))}
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