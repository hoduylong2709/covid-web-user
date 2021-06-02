import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Testing.module.css';

import Layout from '../../hoc/Layout/Layout';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonIcon from '@material-ui/icons/Person';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LoopIcon from '@material-ui/icons/Loop';
import PaymentIcon from '@material-ui/icons/Payment';
import AssignmentIcon from '@material-ui/icons/Assignment';

class Testing extends Component {
  state = {
    infoButtonClicked: true,
    historyButtonClicked: false
  };

  componentDidMount() {
    this.props.onGetTestingInfo();
  }

  handleInfoButtonClick = () => {
    this.setState({ infoButtonClicked: true, historyButtonClicked: false });
  }

  handleHistoryButtonClick = () => {
    this.setState({ infoButtonClicked: false, historyButtonClicked: true });
  }

  render() {
    let testingRecordsView = <Spinner />;

    if (this.props.testingRecords) {
      let updatedTestingRecords = this.props.testingRecords.slice(0, 3);
      if (this.state.infoButtonClicked) {
        testingRecordsView = updatedTestingRecords.map(testingRecord => {
          return (
            <div className={classes.TestingBody_InfoRecords}>
              <div className={classes.InfoTestingContent}>
                <div className={classes.InfoWrapper}>
                  <EventNoteIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Ngày đăng ký xét nghiệm: {moment(testingRecord.registerDate).format('DD-MM-YYYY')}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <EventNoteIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Ngày xét nghiệm: {moment(testingRecord.testingDate).format('DD-MM-YYYY')}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <PersonIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Người đăng ký xét nghiệm ông/bà: {localStorage.getItem('user')}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <LocalHospitalIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Địa điểm xét nghiệm: {testingRecord.testingLocation.name}
                  </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
                  <Typography variant="body1" style={{ padding: '5px 5px', fontWeight: '800' }}>
                    Đã đăng ký
                </Typography>
                </div>
              </div>
            </div>
          );
        });
      }
      if (this.state.historyButtonClicked) {
        testingRecordsView = updatedTestingRecords.map(testingRecord => {
          return (
            <div className={classes.TestingBody_InfoRecords}>
              <div className={classes.InfoTestingContent}>
                <div className={classes.InfoWrapper}>
                  <EventNoteIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Ngày xét nghiệm: {moment(testingRecord.testingDate).format('DD-MM-YYYY')}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <PersonIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Người đăng ký xét nghiệm ông/bà: {localStorage.getItem('user')}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <LoopIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Tình trạng: {testingRecord.testingState}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <PaymentIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Phí xét nghiệm: {testingRecord.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </Typography>
                </div>
                <div className={classes.InfoWrapper}>
                  <AssignmentIcon style={{ color: '#07627e' }} />
                  <Typography variant="body1">
                    Kết quả xét nghiệm: {testingRecord.result === 'Positive' ? 'Dương tính' : 'Âm tính'}
                  </Typography>
                </div>
              </div>
            </div>
          );
        });
      }
    }

    return (
      <Layout>
        <div className={classes.TestingContainer}>
          <div className={classes.TestingHeader}>
            <div className={classes.TestingTitle}>
              <h2>Quản lý xét nghiệm</h2>
            </div>
            <div>
              <Button
                btn="Success"
                anotherType="Custom"
                clicked={() => this.props.history.push('/register-testing-date-location')}
              >
                Đăng ký xét nghiệm
              </Button>
            </div>
          </div>
          <div className={classes.TestingBody}>
            <div className={classes.TestingBody_Navbar}>
              <div className={classes.TestingBody_Navbar_Button}>
                <button
                  className={classes.Button}
                  autoFocus
                  onClick={this.handleInfoButtonClick}
                >Thông tin xét nghiệm</button>
                <button
                  className={classes.Button}
                  onClick={this.handleHistoryButtonClick}
                >Lịch sử xét nghiệm</button>
              </div>
            </div>
            <div className={classes.TestingBody_Records}>
              {testingRecordsView}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    testingRecords: state.testingInfo.testingRecords,
    isSuccess: state.testingInfo.isSuccess,
    error: state.testingInfo.error,
    loading: state.testingInfo.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTestingInfo: () => dispatch(actions.getTestingInfo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Testing);