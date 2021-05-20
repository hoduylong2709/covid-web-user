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

class ItineraryHistory extends Component {
  componentDidMount() {
    this.props.onGetItineraryHistory();
  }

  render() {
    let itineraryListView = <Spinner />;

    if (this.props.itineraryList) {
      itineraryListView = this.props.itineraryList.slice().reverse().map(checkinInfo => {
        return (
          <div className={classes.ItineraryRecords}>
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
                >{checkinInfo.departure}</p>
              </div>
              <div className={classes.Arrow}>
                <p
                  style={{
                    margin: '0',
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: '15px',
                    letterSpacing: '-1px'
                  }}
                >{moment(checkinInfo.departureTime).format('MMMM Do YYYY, h:mm a')} - {moment(checkinInfo.landingTime).format('MMMM Do YYYY, h:mm a')}</p>
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
                    letterSpacing: '-1px'
                  }}
                >Số hiệu phương tiện: {checkinInfo.travelNo}</p>
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
                >{checkinInfo.destination}</p>
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
    loading: state.getItineraryHistory.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetItineraryHistory: () => dispatch(actions.getItineraryHistory())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryHistory);