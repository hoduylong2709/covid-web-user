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
      let updatedTestingRecords = this.props.testingRecords.slice().reverse().slice(0, 3);
      if (this.state.infoButtonClicked) {
        testingRecordsView = updatedTestingRecords.map(testingRecord => {
          return (
            <div className={classes.TestingBody_InfoRecords}>
              <div className={classes.InfoTestingContent}>
                <Typography variant="body1">
                  Ngày đăng ký xét nghiệm {moment(testingRecord.registerDate).format('DD-MM-YYYY')}
                </Typography>
                <Typography variant="body1">
                  Ngày xét nghiệm {moment(testingRecord.testingDate).format('DD-MM-YYYY')}
                </Typography>
                <Typography variant="body1">
                  Người đăng ký xét nghiệm ông/bà {localStorage.getItem('user')}
                </Typography>
                <Typography variant="body1">
                  Địa điểm xét nghiệm xxxxxxxx
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
                  <Typography variant="body1" style={{ padding: '5px 5px' }}>
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
                <Typography variant="body1">
                  Ngày xét nghiệm {moment(testingRecord.testingDate).format('DD-MM-YYYY')}
                </Typography>
                <Typography variant="body1">
                  Người đăng ký xét nghiệm ông/bà {localStorage.getItem('user')}
                </Typography>
                <Typography variant="body1">
                  Thanh toán chi phí: {testingRecord.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </Typography>
                <Typography variant="body1">
                  Kết quả xét nghiệm: {testingRecord.result}
                </Typography>
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
              <h3>Quản lý xét nghiệm</h3>
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