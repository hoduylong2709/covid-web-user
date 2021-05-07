import React, { Component } from 'react';

import classes from './CheckInMap.module.css';

import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Button from '../UI/Button/Button';
import GoogleMap from '../GoogleMap/GoogleMap';

class CheckInMap extends Component {
  render() {
    return (
      <div className={classes.CheckInMap}>
        <div className={classes.CheckInMap_Container}>
          <div className={classes.CheckInMap_Title}>
            <h2 className={classes.CheckInMap_Title_h2}>Check-in địa điểm</h2>
          </div>
          <div className={classes.CheckInMap_Desc}>
            <div className={classes.CheckInMap_Desc_text}>
              <Typography variant="body1">Chung tay cùng cộng đồng đối phó với dịch COVID-19 bằng cách check-in địa điểm hiện tại của bạn</Typography>
            </div>
            <div className={classes.CheckInMap_Desc_submit}>
              <RoomIcon fontSize="large" style={{ color: '#07627e' }} />
              <div className={classes.SubmitButton}>
                <Button
                  btnType="Success"
                  anotherType="CheckInButton"
                >Check-in
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.CheckInMap_Map}>
            <GoogleMap />
          </div>
        </div>
      </div>
    );
  }
}

export default CheckInMap;