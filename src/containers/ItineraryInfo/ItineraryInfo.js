import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class ItineraryInfo extends Component {
  state = {
    depature: null,
    depatureTime: null,
    destination: null,
    destinationTime: null,
    transportIdentify: null
  };

  componentDidMount() {
    this.props.onGetCityList();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleDepartureFieldChange = event => {
    this.setState({ depature: event.target.value });
  }

  handleDestinationFieldChange = event => {
    this.setState({ destination: event.target.value });
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
    console.log(this.state);
  }

  render() {
    let cityList = null;

    if (this.props.cities) {
      cityList = this.props.cities.map(city => {
        return (
          <MenuItem
            key={city.id}
            value={city.name}
          >
            {city.name}
          </MenuItem>
        );
      });
    }

    return (
      <Layout>
        <div className={classes.ItineraryContainer}>
          <div className={classes.ItineraryContent}>
            <div className={classes.ItineraryHeader}>
              <h2 className={classes.ItineraryTitle}>Thông tin lịch trình</h2>
            </div>
            <div className={classes.ItineraryBody}>
              <div className={classes.DepatureInfo}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  <EmojiTransportationIcon style={{ color: '#07627e', marginTop: '20px' }} />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Địa điểm khởi hành</InputLabel>
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
                <form noValidate>
                  <TextField
                    id="datetime-local"
                    label="Thời gian khởi hành"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleDepatureTimeChange}
                  />
                </form>
              </div>
              <div className={classes.DestinationInfo}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  <LocationCityIcon style={{ color: '#07627e', marginTop: '20px' }} />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Địa điểm đến</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={this.handleDestinationFieldChange}
                      style={{ minWidth: '250px' }}
                    >
                      {cityList}
                    </Select>
                  </FormControl>
                </div>
                <form noValidate>
                  <TextField
                    id="datetime-local"
                    label="Thời gian đến"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleDestinationTimeChange}
                  />
                </form>
              </div>
              <div className={classes.TransportIdentify}>
                <div>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <DepartureBoardIcon style={{ color: '#07627e' }} />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        label="Số hiệu phương tiện"
                        onChange={this.handleTransportIdentifyChange}
                        style={{ minWidth: '250px' }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.StyleDiv}></div>
              </div>
              <div className={classes.Buttons}>
                <div className={classes.CancelButton}>
                  <Button
                    anotherType="RegisterButton-Cancel"
                  >Xóa dữ liệu</Button>
                </div>
                <div className={classes.SubmitButton}>
                  <Button
                    anotherType="RegisterButton-Next"
                    clicked={this.handleSubmitButton}
                  >Xác nhận</Button>
                </div>
              </div>
            </div>
          </div>
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
    loading: state.cityList.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCityList: () => dispatch(actions.getCityList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryInfo);