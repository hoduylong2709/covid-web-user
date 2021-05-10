import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './CheckInMap.module.css';

import * as actions from '../../store/actions/index';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Button from '../UI/Button/Button';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from 'react-geocode';
import CheckinLocationModal from '../UI/Modal/TestingRegistrationModal/CheckinLocationModal';
import moment from 'moment';

Geocode.setApiKey("AIzaSyBEj_N2fFz4FxUACprRCtZIBp21_r4LHu8");

class CheckInMap extends Component {
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0
    },
    markerPosition: {
      lat: 0,
      lng: 0
    }
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          mapPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          markerPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }, () => {
          Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
            .then(response => {
              console.log(response);
              const address = response.results[0].formatted_address;
              const addressArray = response.results[0].address_components;
              const city = this.getCity(addressArray);
              const area = this.getArea(addressArray);
              const state = this.getState(addressArray);
              this.setState({
                address: address ? address : '',
                city: city ? city : '',
                area: area ? area : '',
                state: state ? state : ''
              });
            })
            .catch(error => {
              console.log('error', error);
            });
        });
      });
    }
  }

  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  }

  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  }

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  }

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;
        const city = this.getCity(addressArray);
        const area = this.getArea(addressArray);
        const state = this.getState(addressArray);
        this.setState({
          address: address ? address : '',
          city: city ? city : '',
          area: area ? area : '',
          state: state ? state : '',
          mapPosition: {
            lat: newLat,
            lng: newLng
          },
          markerPosition: {
            lat: newLat,
            lng: newLng
          }
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  onPlaceSelected = (place) => {
    console.log('plc', place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    console.log('latvalue', latValue)
    console.log('lngValue', lngValue)

    // Set these values in the state.
    this.setState({
      address: (address) ? address : '',
      area: (area) ? area : '',
      city: (city) ? city : '',
      state: (state) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };

  handleCheckin = (event) => {
    event.preventDefault();
    this.props.onCheckinLocation(this.state.address, moment(new Date()).format());
    console.log(this.state.address);
  }

  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={this.state.zoom}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        >
          <InfoWindow>
            <div>
              <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ));

    return (
      <div className={classes.CheckInMap}>
        <div className={classes.CheckInMap_Container}>
          <div className={classes.CheckInMap_Title}>
            <h2 className={classes.CheckInMap_Title_h2}>Check-in địa điểm</h2>
            <div className={classes.HistoryCheckinButton}>
              <Button
                btnType="Success"
                anotherType="HistoryCheckinButton"
                clicked={() => this.props.history.push("/check-in-history")}
              >
                Xem lịch sử check-in
              </Button>
            </div>
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
                  clicked={this.handleCheckin}
                >Check-in
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.CheckInMap_Map}>
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEj_N2fFz4FxUACprRCtZIBp21_r4LHu8&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
        <CheckinLocationModal
          showCheckinModal={this.props.showModal}
          showSuccessIcon={this.props.isSuccess}
          checkinLocationResult={
            this.props.isSuccess ? 'Check-in địa điểm hiện tại của bạn thành công' : this.props.error
          }
          hasError={this.props.error}
          closeModal={false}
        ></CheckinLocationModal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.locationCheckin.isSuccess,
    error: state.locationCheckin.error,
    loading: state.locationCheckin.loading,
    showModal: state.locationCheckin.showModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckinLocation: (address, time) => dispatch(actions.checkinLocation(address, time))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckInMap));