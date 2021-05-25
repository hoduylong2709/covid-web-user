import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from './../../hoc/Layout/Layout';
import classes from './ItineraryInfo.module.css';
import TextField from '@material-ui/core/TextField';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import Grid from '@material-ui/core/Grid';
import Button from './../../components/UI/Button/Button';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as actions from '../../store/actions/index';
import CheckinLocationModal from '../../components/UI/Modal/TestingRegistrationModal/CheckinLocationModal';
import MustTestingModal from './../../components/UI/Modal/TestingRegistrationModal/MustTestingModal';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class ItineraryInfo extends Component {
  state = {
    depatureId: null,
    depatureTime: null,
    destinationId: null,
    destinationTime: null,
    transportIdentify: null,
    openVerifyTimeModal: false,
    openConflictItineraryModal: false
  };

  componentDidMount() {
    this.props.onGetCityList();
    this.props.onGetItineraryHistory();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleDepartureFieldChange = event => {
    this.setState({ depatureId: event.target.value });
  }

  handleDestinationFieldChange = event => {
    this.setState({ destinationId: event.target.value });
  }

  handleDepatureTimeChange = event => {
    this.setState({ depatureTime: event.target.value });
  }

  handleDestinationTimeChange = event => {
    this.setState({ destinationTime: event.target.value });
  }

  handleTransportIdentifyChange = event => {
    this.setState({ transportIdentify: event.target.value })
  }

  handleSubmitButton = () => {
    if (this.state.depatureTime >= this.state.destinationTime) {
      this.setState({ openVerifyTimeModal: true });
      return;
    }
    if (
      this.props.itineraryList &&
      this.state.depatureTime <= this.props.itineraryList[this.props.itineraryList.length - 1].landingTime
    ) {
      this.setState({ openConflictItineraryModal: true });
      return;
    }
    this.props.onSubmitItineraryInfo(
      this.state.depatureId,
      this.state.destinationId,
      this.state.transportIdentify,
      this.state.depatureTime,
      this.state.destinationTime
    );
  }

  handleCloseTimeModal = () => {
    this.setState({ openVerifyTimeModal: false });
  }

  handleCloseConflictItineraryModal = () => {
    this.setState({ openConflictItineraryModal: false });
  }

  handleItineraryHistoryButton = () => {
    this.props.history.push("/itinerary-history");
  }

  render() {
    let cityList = null;

    let cityList2 = null;

    if (this.props.cities) {
      cityList = this.props.cities.map(city => {
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

    let modal = (
      <CheckinLocationModal
        showCheckinModal={this.props.showModalSubmit}
        showSuccessIcon={this.props.isSuccessSubmit}
        checkinLocationResult={
          this.props.isSuccessSubmit ? 'Khai báo lịch trình y tế thành công' : this.props.error
        }
        hasError={this.props.errorSubmit}
        closeModal={() => this.props.onCloseModalItineraryInfo()}
      ></CheckinLocationModal>
    );

    if (this.props.mustTesting) {
      modal = (
        <MustTestingModal
          mustTesting={this.props.showModalSubmit && this.props.mustTesting}
          closeModal={() => this.props.onCloseModalItineraryInfo()}
        ></MustTestingModal>
      );
    }

    return (
      <Layout>
        <div className={classes.ItineraryContainer}>
          <div className={classes.ItineraryContent}>
            <div className={classes.ItineraryHeader}>
              <h2 className={classes.ItineraryTitle}>Thông tin lịch trình</h2>
              <div className={classes.ItineraryHistoryButton}>
                <Button
                  anotherType="RegisterButton-Next"
                  clicked={this.handleItineraryHistoryButton}
                >Lịch sử di chuyển</Button>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                borderRadius: '36px'
              }}
            >
              <div className={classes.ItineraryBody}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                    <EmojiTransportationIcon style={{ color: '#07627e', marginTop: '20px' }} />
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Địa điểm khởi hành*</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleDepartureFieldChange}
                        style={{ minWidth: '250px' }}
                      >
                        {cityList}
                      </Select>

                    </FormControl>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                    <LocationCityIcon style={{ color: '#07627e', marginTop: '20px' }} />
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Địa điểm đến*</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={this.handleDestinationFieldChange}
                        style={{ minWidth: '250px' }}
                      >
                        {cityList2}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <DepartureBoardIcon style={{ color: '#07627e' }} />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="input-with-icon-grid"
                          label="Số hiệu phương tiện*"
                          onChange={this.handleTransportIdentifyChange}
                          style={{ minWidth: '250px' }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px'
                  }}
                >
                  <form noValidate>
                    <TextField
                      id="datetime-local"
                      label="Thời gian khởi hành*"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleDepatureTimeChange}
                      inputProps={{ max: this.state.destinationTime }}
                    />
                  </form>
                  <form noValidate>
                    <TextField
                      id="datetime-local"
                      label="Thời gian đến*"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleDestinationTimeChange}
                      inputProps={{ min: this.state.depatureTime }}
                    />
                  </form>
                </div>
              </div>
              <div className={classes.Buttons}>
                <div className={classes.SubmitButton}>
                  <Button
                    anotherType="RegisterButton-Next"
                    clicked={this.handleSubmitButton}
                    disabled={
                      this.state.depatureId === null ||
                      this.state.destinationId === null ||
                      this.state.depatureTime === null ||
                      this.state.destinationTime === null ||
                      this.state.transportIdentify === null
                    }
                  >Xác nhận</Button>
                </div>
              </div>
            </div>
          </div>
          {modal}
          <Dialog
            open={this.state.openVerifyTimeModal}
            onClose={this.handleCloseTimeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "black"
                }}
              >
                Thời gian di chuyển không hợp lệ, xin vui lòng chọn lại!
          </DialogContentText>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.openConflictItineraryModal}
            onClose={this.handleCloseConflictItineraryModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "black"
                }}
              >
                Thời gian di chuyển xung đột với lịch trình trước đó, vui lòng vào lịch sử di chuyển để kiểm tra!
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
    cities: state.cityList.cities,
    isSuccess: state.cityList.isSuccess,
    error: state.cityList.error,
    loading: state.cityList.loading,
    isSuccessSubmit: state.itineraryInfo.isSuccess,
    errorSubmit: state.itineraryInfo.error,
    loadingSubmit: state.itineraryInfo.loading,
    showModalSubmit: state.itineraryInfo.showModal,
    mustTesting: state.itineraryInfo.mustTesting,
    itineraryList: state.getItineraryHistory.itineraryList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCityList: () => dispatch(actions.getCityList()),
    onSubmitItineraryInfo: (
      departureCityId, destinationCityId, flyNo, departureTime, landingTime
    ) => dispatch(actions.submitItineraryInfo(departureCityId, destinationCityId, flyNo, departureTime, landingTime)),
    onCloseModalItineraryInfo: () => dispatch(actions.closeModalItineraryInfo()),
    onGetItineraryHistory: () => dispatch(actions.getItineraryHistory())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItineraryInfo));