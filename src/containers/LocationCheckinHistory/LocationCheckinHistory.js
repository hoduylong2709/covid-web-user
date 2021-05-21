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
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '../../components/UI/Button/Button';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';

class LocationCheckinHistory extends Component {
  state = {
    openConfirmation: false,
    currentIdRecord: null
  };

  componentDidMount() {
    this.props.onGetLocationCheckin();
  }

  handleDeleteButton = (id) => {
    this.setState({ openConfirmation: true, currentIdRecord: id });
  }

  handleCloseConfirmation = () => {
    this.setState({ openConfirmation: false });
  }

  handleDeleteRecord = () => {
    this.props.onDeleteLocationCheckin(this.state.currentIdRecord);
  }

  render() {
    let checkinListView = <Spinner />;

    if (this.props.checkinList) {
      checkinListView = this.props.checkinList.map(checkinInfo => {
        return (
          <div className={classes.CheckinRecords}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
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
              <div className={classes.EditAndDelete}>
                <Button
                  anotherType='EditCheckinButton'
                >
                  <EditIcon
                    style={{
                      transform: 'scale(1)',
                      color: '#07627e'
                    }}
                  />
                </Button>
                <Button
                  anotherType='DeleteCheckinButton'
                  clicked={() => this.handleDeleteButton(checkinInfo.id)}
                >
                  <DeleteForeverIcon
                    style={{
                      transform: 'scale(1)',
                      color: '#07627e'
                    }}
                  />
                </Button>
              </div>
            </div>
            <ConfirmDelete
              openConfirmation={this.state.openConfirmation}
              closeConfirmation={this.handleCloseConfirmation}
              deleteRecord={this.handleDeleteRecord}
            />
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
    loading: state.getLocationCheckin.loading,
    isSuccessDelete: state.deleteLocationCheckin.isSuccess,
    errorDelete: state.deleteLocationCheckin.error,
    loadingDelete: state.deleteLocationCheckin.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLocationCheckin: () => dispatch(actions.getLocationCheckin()),
    onDeleteLocationCheckin: (locationId) => dispatch(actions.deleteLocationCheckin(locationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationCheckinHistory);