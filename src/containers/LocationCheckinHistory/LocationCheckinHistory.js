import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classes from './LocationCheckinHistory.module.css';

class LocationCheckinHistory extends Component {
  render() {
    return (
      <Layout>
        <div className={classes.Container}>
          <div className={classes.CheckinHeader}>
            <h2 className={classes.CheckinHeader_Title}>Lịch sử check-in</h2>
          </div>
          <div className={classes.CheckinRecords}>
            <div className={classes.CheckinRecord_Content}>
              <Typography variant="body1" color="primary">
                {moment(new Date()).format('LLLL')}
              </Typography>
              <Typography variant="body1">
                115 Nguyễn Lương Bằng, quận Liên Chiểu, thành phố Đà Nẵng
              </Typography>
            </div>
          </div>
          <div className={classes.CheckinRecords}>
            <div className={classes.CheckinRecord_Content}>
              <Typography variant="body1" color="primary">
                {moment(new Date()).format('LLLL')}
              </Typography>
              <Typography variant="body1">
                115 Nguyễn Lương Bằng, quận Liên Chiểu, thành phố Đà Nẵng
              </Typography>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect()(LocationCheckinHistory);