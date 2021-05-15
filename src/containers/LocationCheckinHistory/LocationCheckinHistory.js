import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import classes from './LocationCheckinHistory.module.css';
import * as actions from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';

class LocationCheckinHistory extends Component {
  componentDidMount() {
    this.props.onGetLocationCheckin();
  }

  render() {
    let checkinListView = <Spinner />;

    if (this.props.checkinList) {
      checkinListView = this.props.checkinList.map(checkinInfo => {
        return (
          <div className={classes.CheckinRecords}>
            <div className={classes.CheckinRecord_Content}>
              <div className={classes.CheckinRecord_Content_Time}>
                <EventIcon />
                <Typography variant="body1" color="primary">
                  {moment(checkinInfo.time).format('LLLL')}
                </Typography>
              </div>
              <div className={classes.CheckinRecord_Content_Location}>
                <LocationOnIcon />
                <Typography variant="body1">
                  {checkinInfo.address}
                </Typography>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <Layout>
        <div className={classes.Container}>
          <div className={classes.CheckinHeader}>
            <h2 className={classes.CheckinHeader_Title}>Lịch sử check-in</h2>
          </div>
          {checkinListView}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkinList: state.getLocationCheckin.checkinList,
    isSuccess: state.getLocationCheckin.isSuccess,
    error: state.getLocationCheckin.error,
    loading: state.getLocationCheckin.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLocationCheckin: () => dispatch(actions.getLocationCheckin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationCheckinHistory);