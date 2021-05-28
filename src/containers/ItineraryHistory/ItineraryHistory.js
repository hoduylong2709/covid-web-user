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
import MenuItem from '@material-ui/core/MenuItem';
import MustTestingModal from '../../components/UI/Modal/TestingRegistrationModal/MustTestingModal';
import { isConflictItineray } from '../../store/utility';
import MyPagination from '../../components/UI/Pagination/Pagination';

class ItineraryHistory extends Component {
  state = {
    itineraryList: [],
    openConfirmation: false,
    currentIdRecord: null,
    openEditForm: false,
    depatureId: null,
    destinationId: null,
    departureTime: null,
    destinationTime: null,
    travelNo: null,
    openVerifyTimeModal: false,
    openConflictModal: false
  }

  componentDidMount() {
    this.props.onGetItineraryHistory();
    this.props.onGetCityList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itineraryList !== this.props.itineraryList) {
      this.setState({ itineraryList: nextProps.itineraryList });
    }
    if (nextProps.isSuccessEdit !== this.props.isSuccessEdit && nextProps.mustTesting === this.props.mustTesting) {
      window.location.reload();
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

  handleEditButton = (id, departureId, destinationId, departureTime, destinationTime, travelNo) => {
    this.setState({
      openEditForm: true,
      currentIdRecord: id,
      depatureId: departureId,
      destinationId: destinationId,
      departureTime: departureTime,
      destinationTime: destinationTime,
      travelNo: travelNo
    });
  }

  handleCloseEditForm = () => {
    this.setState({ openEditForm: false });
    setTimeout(() => {
      this.props.onFinishEditItineraryInfo();
    }, 500);
  }

  handleDepartureFieldChange = event => {
    console.log(event.target.value);
    this.setState({ depatureId: event.target.value });
  }

  handleDepartureTimeChange = (event) => {
    this.setState({ departureTime: event.target.value.substring(0, 16) });
  }

  handleDestinationFieldChange = event => {
    this.setState({ destinationId: event.target.value });
  }

  handleDestinationTimeChange = event => {
    this.setState({ destinationTime: event.target.value.substring(0, 16) });
  }

  handleEditForm = (
    id,
    departureCityId,
    destinationCityId,
    flyNo,
    departureTime,
    landingTime
  ) => {
    if (this.state.departureTime >= this.state.destinationTime) {
      this.setState({ openVerifyTimeModal: true });
      return;
    }
    const editItineraryInfo = {
      id,
      departureCityId,
      destinationCityId,
      flyNo,
      departureTime,
      landingTime
    };
    if (isConflictItineray(this.state.itineraryList, editItineraryInfo) === true) {
      this.setState({ openConflictModal: true });
      return;
    }
    this.props.onEditItineraryInfo(
      id,
      departureCityId,
      destinationCityId,
      flyNo,
      departureTime,
      landingTime
    );
  }

  handleCloseTimeModal = () => {
    this.setState({ openVerifyTimeModal: false });
  }

  handleCloseConflictModal = () => {
    this.setState({ openConflictModal: false });
  }

  handleTravelNoChange = event => {
    this.setState({ travelNo: event.target.value })
  }

  render() {
    let pagination = null;

    if (this.props.itineraryList) {
      pagination = <MyPagination
        totalPages={this.props.totalPages}
        isPaginationForItinerary={true}
        pageSize={4}
      />
    }

    let itineraryListView = <Spinner />;

    let cityList1 = null;

    let cityList2 = null;

    if (this.props.cities) {
      cityList1 = this.props.cities.map(city => {
        return (
          <MenuItem
            key={city.id}
            value={city.id}
            disabled={this.state.destinationId !== null && city.id === this.state.destinationId}
          >
            {city.name}
          </MenuItem>
        );
      });
      cityList2 = this.props.cities.map(city => {
        return (
          <MenuItem
            key={city.id}
            value={city.id}
            disabled={this.state.depatureId !== null && city.id === this.state.depatureId}
          >
            {city.name}
          </MenuItem>
        );
      });
    }

    if (this.state.itineraryList) {
      itineraryListView = this.state.itineraryList.slice().reverse().map(itineraryInfo => {
        return (
          <div className={classes.ItineraryRecords}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
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
                  clicked={
                    () => this.handleEditButton(
                      itineraryInfo.id,
                      itineraryInfo.departureCityId,
                      itineraryInfo.destinationCityId,
                      itineraryInfo.departureTime.substring(0, 16),
                      itineraryInfo.landingTime.substring(0, 16),
                      itineraryInfo.travelNo
                    )
                  }
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

    let mainView = (
      <EditForm
        openEditForm={this.state.openEditForm}
        closeEditForm={this.handleCloseEditForm}
        cityList1={cityList1}
        cityList2={cityList2}
        handleDepartureFieldChange={this.handleDepartureFieldChange}
        handleDestinationFieldChange={this.handleDestinationFieldChange}
        idRecord={this.state.currentIdRecord}
        departure={this.state.depatureId}
        destination={this.state.destinationId}
        departureTime={this.state.departureTime}
        destinationTime={this.state.destinationTime}
        travelNo={this.state.travelNo}
        editItineraryInfo={
          () => this.handleEditForm(
            this.state.currentIdRecord,
            this.state.depatureId,
            this.state.destinationId,
            this.state.travelNo,
            this.state.departureTime,
            this.state.destinationTime
          )
        }
        changeDepartureTime={this.handleDepartureTimeChange}
        changeDestinationTime={this.handleDestinationTimeChange}
        changeTravelNo={this.handleTravelNoChange}
        loading={this.props.loadingEdit}
        hasErrorItinerary={this.props.errorEdit}
        openVerifyTimeItinerary={this.state.openVerifyTimeModal}
        closeTimeModalItinerary={this.handleCloseTimeModal}
        openConflictModal={this.state.openConflictModal}
        closeConflictModal={this.handleCloseConflictModal}
      />
    );

    if (this.props.mustTesting) {
      mainView = (
        <MustTestingModal
          mustTesting={this.props.showModalEdit && this.props.mustTesting}
          closeModal={() => this.props.onCloseMustTestingModal()}
          isEditItinerary={true}
        ></MustTestingModal>
      );
    }

    return (
      <Layout>
        <div className={classes.ItineraryWrapper}>
          <div className={classes.ItineraryHeader}>
            <h2>Thông tin di chuyển</h2>
          </div>
          {itineraryListView}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '0 225px',
              justifyContent: 'space-around'
            }}
          >
            <a href="/itinerary" style={{ marginTop: '21px' }}>Quay lại</a>
            {pagination}
          </div>
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
          {mainView}

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
    cities: state.cityList.cities,
    isSuccessEdit: state.editItineraryInfo.isSuccess,
    errorEdit: state.editItineraryInfo.error,
    loadingEdit: state.editItineraryInfo.loading,
    showModalEdit: state.editItineraryInfo.showModal,
    mustTesting: state.editItineraryInfo.mustTesting,
    pageSize: state.getItineraryHistory.pageSize,
    totalPages: state.getItineraryHistory.totalPages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetItineraryHistory: () => dispatch(actions.getItineraryHistory()),
    onDeleteItineraryHistory: (itineraryId) => dispatch(actions.deleteItineraryHistory(itineraryId)),
    onCloseDeleteErrorModal: () => dispatch(actions.closeDeleteErrorModal()),
    onGetCityList: () => dispatch(actions.getCityList()),
    onEditItineraryInfo: (
      id,
      departureCityId,
      destinationCityId,
      flyNo,
      departureTime,
      landingTime
    ) => dispatch(actions.editItineraryInfo(
      id,
      departureCityId,
      destinationCityId,
      flyNo,
      departureTime,
      landingTime
    )),
    onFinishEditItineraryInfo: () => dispatch(actions.finishEditItineraryInfo()),
    onCloseMustTestingModal: () => dispatch(actions.closeMustTestingModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryHistory);