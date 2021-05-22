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

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import ErrorIcon from '@material-ui/icons/Error';

class LocationCheckinHistory extends Component {
  state = {
    locationList: [],
    openConfirmation: false,
    currentIdRecord: null
  };

  componentDidMount() {
    this.props.onGetLocationCheckin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkinList !== this.props.checkinList) {
      this.setState({ locationList: nextProps.checkinList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.checkinList.length !== prevState.locationList.length && this.props.errorDelete) {
      this.setState({ locationList: this.props.checkinList });
    }
  }

  handleDeleteButton = (id) => {
    this.setState({ openConfirmation: true, currentIdRecord: id });
  }

  handleCloseConfirmation = () => {
    this.setState({ openConfirmation: false });
  }

  handleDeleteRecord = () => {
    const updatedList = this.state.locationList
      .filter(checkinInfo => checkinInfo.id !== this.state.currentIdRecord);
    this.setState({ locationList: updatedList, openConfirmation: false });
    setTimeout(() => {
      this.props.onDeleteLocationCheckin(this.state.currentIdRecord);
    }, 1000);
  }

  handleCloseModal = () => {
    this.props.onCloseDeleteErrorModal();
  }

  render() {
    let checkinListView = <Spinner />;

    if (this.state.locationList) {
      checkinListView = this.state.locationList
        .map(checkinInfo => {
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
          <ConfirmDelete
            openConfirmation={this.state.openConfirmation}
            closeConfirmation={this.handleCloseConfirmation}
            deleteRecord={this.handleDeleteRecord}
          />
          <Dialog
            open={this.props.errorDelete !== null}
            onClose={this.handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px'
              }}
            >
              <ErrorIcon
                style={{
                  color: 'red'
                }}
              />
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "black"
                }}
              >
                Xóa địa điểm check-in thất bại, xin vui lòng thử lại!
          </DialogContentText>
            </DialogContent>
          </Dialog>
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
    onDeleteLocationCheckin: (locationId) => dispatch(actions.deleteLocationCheckin(locationId)),
    onCloseDeleteErrorModal: () => dispatch(actions.closeDeleteErrorModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationCheckinHistory);