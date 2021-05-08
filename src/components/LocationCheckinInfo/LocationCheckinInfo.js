import React from 'react';
import classes from './LocationCheckinInfo.module.css';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const locationCheckinInfo = (props) => {
  return (
    <div className={classes.TestingBody_InfoRecords}>
      <div className={classes.InfoTestingContent}>
        <Typography variant="body1">
          {moment(new Date()).format('LLLL')}
        </Typography>
        <Typography variant="body1">
          115 Nguyễn Lương Bằng, quận Liên Chiểu, thành phố Đà Nẵng
        </Typography>
      </div>
    </div>
  );
}

export default locationCheckinInfo;