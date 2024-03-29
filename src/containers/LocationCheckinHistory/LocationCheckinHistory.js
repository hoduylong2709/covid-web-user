import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
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
import EditForm from '../../components/EditForm/EditForm';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import ErrorIcon from '@material-ui/icons/Error';

import MyPagination from '../../components/UI/Pagination/Pagination';

class LocationCheckinHistory extends Component {
  state = {
    locationList: [],
    openConfirmation: false,
    currentIdRecord: null,
    openEditForm: false,
    currentTimeRecord: null,
    currentAddressRecord: null,
    openVerifyTimeModal: false
  };

  componentDidMount() {
    this.props.onGetLocationCheckin(1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkinList !== this.props.checkinList) {
      this.setState({ locationList: nextProps.checkinList });
    }
    if (nextProps.isSuccessEdit !== this.props.isSuccessEdit) {
      window.location.reload();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.checkinList && this.props.checkinList.length !== prevState.locationList.length && this.props.errorDelete) {
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
    }, 500);
    // fix here
    // console.log(this.props.pageNumber);
    setTimeout(() => {
      this.props.onGetLocationCheckin(this.props.pageNumber);
    }, 1500);
  }

  handleCloseModal = () => {
    this.props.onCloseDeleteErrorModal();
  }

  handleEditButton = (id, time, address) => {
    this.setState({
      openEditForm: true,
      currentIdRecord: id,
      currentTimeRecord: time,
      currentAddressRecord: address
    });
  }

  handleCloseEditForm = () => {
    this.setState({ openEditForm: false });
    setTimeout(() => {
      this.props.onFinishEditLocationCheckin();
    }, 500);
  }

  handleLocationChange = event => {
    this.setState({ currentAddressRecord: event.target.value });
  }

  handleTimeChange = event => {
    this.setState({ currentTimeRecord: event.target.value });
  }

  handleEditForm = (id, address, time) => {
    if (this.state.currentTimeRecord >= moment(new Date()).format().substring(0, 16)) {
      this.setState({ openVerifyTimeModal: true });
      return;
    }
    this.props.onEditLocationCheckin(id, address, time);
  }

  handleCloseVerifyTimeModal = () => {
    this.setState({ openVerifyTimeModal: false });
  }

  render() {
    let checkinListView = <Spinner />;

    let pagination = null;

    if (this.props.checkinList) {
      pagination = <MyPagination
        totalPages={this.props.totalPages}
        isPaginationForCheckin={true}
        pageSizeCheckin={4}
      />
    }

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
                    clicked={() => this.handleEditButton(checkinInfo.id, checkinInfo.time, checkinInfo.address)}
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '0 225px',
              justifyContent: 'space-around'
            }}
          >
            <a href="/check-in" style={{ marginTop: '21px' }}>Quay lại</a>
            {pagination}
          </div>
          <ConfirmDelete
            openConfirmation={this.state.openConfirmation}
            closeConfirmation={this.handleCloseConfirmation}
            deleteRecord={this.handleDeleteRecord}
            confirmText='Bạn chắc chắn muốn xóa địa điểm và thời gian check-in?'
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
          <EditForm
            isEditForLocationCheckin={true}
            openEditForm={this.state.openEditForm}
            address={this.state.currentAddressRecord}
            time={this.state.currentTimeRecord}
            closeEditForm={this.handleCloseEditForm}
            editLocationCheckin={
              () => this.handleEditForm(
                this.state.currentIdRecord,
                this.state.currentAddressRecord,
                this.state.currentTimeRecord
              )
            }
            changeLocation={this.handleLocationChange}
            changeTime={this.handleTimeChange}
            loading={this.props.loadingEdit}
            hasError={this.props.errorEdit}
            openVerifyTimeModal={this.state.openVerifyTimeModal}
            closeVerifyTimeModal={this.handleCloseVerifyTimeModal}
          />
        </div>
        {this.props.errorDelete === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
        {this.props.errorEdit === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
        {this.props.error === 'TIMEOUT_REQUEST' && <Redirect to="/network-error" />}
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
    loadingDelete: state.deleteLocationCheckin.loading,
    isSuccessEdit: state.editLocationCheckin.isSuccess,
    errorEdit: state.editLocationCheckin.error,
    loadingEdit: state.editLocationCheckin.loading,
    showModalEdit: state.editLocationCheckin.showModal,
    pageSize: state.getLocationCheckin.pageSize,
    totalPages: state.getLocationCheckin.totalPages,
    totalRecords: state.getLocationCheckin.totalRecords,
    pageNumber: state.getLocationCheckin.pageNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLocationCheckin: (pageNumber) => dispatch(actions.getLocationCheckin(pageNumber)),
    onDeleteLocationCheckin: (locationId) => dispatch(actions.deleteLocationCheckin(locationId)),
    onCloseDeleteErrorModal: () => dispatch(actions.closeDeleteErrorModal()),
    onEditLocationCheckin: (id, address, time) => dispatch(actions.editLocationCheckin(id, address, time)),
    onFinishEditLocationCheckin: () => dispatch(actions.finishEditLocationCheckin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationCheckinHistory);