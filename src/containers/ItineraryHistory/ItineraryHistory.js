import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import classes from './ItineraryHistory.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import Button from '../../components/UI/Button/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ErrorIcon from '@material-ui/icons/Error';
import EditForm from '../../components/EditForm/EditForm';
import editForm from './../../components/EditForm/EditForm';

class ItineraryHistory extends Component {
  state = {
    itineraryList: [],
    openConfirmation: false,
    currentIdRecord: null,
    openEditForm: false
  }

  componentDidMount() {
    this.props.onGetItineraryHistory();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itineraryList !== this.props.itineraryList) {
      this.setState({ itineraryList: nextProps.itineraryList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.itineraryList.length !== prevState.itineraryList.length && this.props.errorDelete) {
      this.setState({ itineraryList: this.props.itineraryList });
    }
  }

  handleCloseConfirmation = () => {
    this.setState({ openConfirmation: false });
  }

  handleDeleteButton = (id) => {
    this.setState({ openConfirmation: true, currentIdRecord: id });
  }

  handleDeleteRecord = () => {
    const updatedList = this.state.itineraryList
      .filter(itineraryInfo => itineraryInfo.id !== this.state.currentIdRecord);
    this.setState({ itineraryList: updatedList, openConfirmation: false });
    setTimeout(() => {
      this.props.onDeleteItineraryHistory(this.state.currentIdRecord);
    }, 500);
  }

  handleCloseModal = () => {
    this.props.onCloseDeleteErrorModal();
  }

  handleEditButton = (id) => {
    this.setState({
      openEditForm: true,
      currentIdRecord: id
    });
  }

  handleCloseEditForm = () => {
    this.setState({ openEditForm: false });
    // setTimeout(() => {
    //   this.props.onFinishEditLocationCheckin();
    // }, 500);
  }

  render() {
    let itineraryListView = <Spinner />;

    if (this.state.itineraryList) {
      itineraryListView = this.state.itineraryList.slice().reverse().map(itineraryInfo => {
        return (
          <div className={classes.ItineraryRecords}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <div className={classes.ItineraryRecord_Content}>
                <div className={classes.Depature}>
                  <LocationCityIcon
                    style={{
                      fontSize: '30px'
                    }}
                  />
                  <p
                    style={{
                      margin: '0',
                      fontWeight: '400'
                    }}
                  >{itineraryInfo.departure}</p>
                </div>
                <div className={classes.Arrow}>
                  <p
                    style={{
                      margin: '0',
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: '15px',
                      letterSpacing: '-1px',
                      textAlign: 'center'
                    }}
                  >{moment(itineraryInfo.departureTime).format('MMMM Do YYYY, h:mm a')} - {moment(itineraryInfo.landingTime).format('MMMM Do YYYY, h:mm a')}</p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <hr style={{ height: '4px', backgroundColor: '#07627e', width: '100%' }} />
                    <ArrowForwardIosIcon style={{ color: '#07627e' }} />
                  </div>
                  <p
                    style={{
                      margin: '0',
                      fontFamily: "'Roboto Mono', monospace",
                      fontSize: '15px',
                      letterSpacing: '-1px',
                      textAlign: 'center'
                    }}
                  >Số hiệu phương tiện: {itineraryInfo.travelNo}</p>
                </div>
                <div className={classes.Destination}>
                  <EmojiTransportationIcon
                    style={{
                      fontSize: '30px'
                    }}
                  />
                  <p
                    style={{
                      margin: '0',
                      fontWeight: '400'
                    }}
                  >{itineraryInfo.destination}</p>
                </div>
              </div>
              <div className={classes.EditAndDelete}>
                <Button
                  anotherType='EditCheckinButton'
                  clicked={() => this.handleEditButton(itineraryInfo.id)}
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
                  clicked={() => this.handleDeleteButton(itineraryInfo.id)}
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
        <div className={classes.ItineraryWrapper}>
          <div className={classes.ItineraryHeader}>
            <h2>Lịch sử di chuyển</h2>
          </div>
          {itineraryListView}
          <ConfirmDelete
            openConfirmation={this.state.openConfirmation}
            closeConfirmation={this.handleCloseConfirmation}
            deleteRecord={this.handleDeleteRecord}
            confirmText="Bạn chắc chắn muốn xóa lịch trình di chuyển này?"
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
                Xóa lịch trình di chuyển thất bại, xin vui lòng thử lại!
          </DialogContentText>
            </DialogContent>
          </Dialog>
          <EditForm
            openEditForm={this.state.openEditForm}
            closeEditForm={this.handleCloseEditForm}
          // editLocationCheckin={
          //   () => this.handleEditForm(
          //     this.state.currentIdRecord,
          //     this.state.currentAddressRecord,
          //     this.state.currentTimeRecord
          //   )
          // }
          // changeLocation={this.handleLocationChange}
          // changeTime={this.handleTimeChange}
          // loading={this.props.loadingEdit}
          // hasError={this.props.errorEdit}
          // openVerifyTimeModal={this.state.openVerifyTimeModal}
          // closeVerifyTimeModal={this.handleCloseVerifyTimeModal}
          />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraryList: state.getItineraryHistory.itineraryList,
    isSuccess: state.getItineraryHistory.isSuccess,
    error: state.getItineraryHistory.error,
    loading: state.getItineraryHistory.loading,
    isSuccessDelete: state.deleteItineraryHistory.isSuccess,
    errorDelete: state.deleteItineraryHistory.error,
    loadingDelete: state.deleteItineraryHistory.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetItineraryHistory: () => dispatch(actions.getItineraryHistory()),
    onDeleteItineraryHistory: (itineraryId) => dispatch(actions.deleteItineraryHistory(itineraryId)),
    onCloseDeleteErrorModal: () => dispatch(actions.closeDeleteErrorModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryHistory);