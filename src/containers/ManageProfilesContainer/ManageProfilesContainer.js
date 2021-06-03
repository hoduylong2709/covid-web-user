import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classes from './ManageProfilesContainer.module.css';
import Layout from './../../hoc/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import qrCodeImage from '../../assets/images/qrcode.png';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import QRCode from "react-qr-code";

class ManageProfilesContainer extends Component {
  state = {
    openQRCodeModal: false
  }

  componentDidMount() {
    this.props.onGetUserProfiles();
  }

  handleClickQRCodeButton = () => {
    this.setState({ openQRCodeModal: true });
  }

  closeQRCodeModal = () => {
    this.setState({ openQRCodeModal: false });
  }

  render() {
    let phoneNumber = 'N/A';
    let dateOfBirth = 'N/A';
    let gender = 'N/A';
    let idNo = 'N/A';
    let nationality = 'N/A';
    let address = 'N/A';

    let qrData = JSON.stringify({ email: localStorage.getItem('email') });

    if (this.props.userProfiles) {
      if (this.props.userProfiles['firstName']) {
        localStorage.setItem('firstName', this.props.userProfiles['firstName']);
      }

      if (this.props.userProfiles['lastName']) {
        localStorage.setItem('lastName', this.props.userProfiles['lastName']);
      }

      if (this.props.userProfiles['phoneNumber']) {
        phoneNumber = this.props.userProfiles['phoneNumber'];
        localStorage.setItem('phoneNumber', phoneNumber);
      }

      if (this.props.userProfiles['dateOfBirth'].substring(0, 4) !== '0001') {
        dateOfBirth = moment(this.props.userProfiles['dateOfBirth']).format('DD/MM/YYYY');
        localStorage.setItem('dateOfBirth', this.props.userProfiles['dateOfBirth']);
      }

      if (this.props.userProfiles['idNo']) {
        idNo = this.props.userProfiles['idNo'];
        localStorage.setItem('idNo', idNo);
      }

      if (this.props.userProfiles['nationality']) {
        nationality = this.props.userProfiles['nationality'];
        localStorage.setItem('nationality', nationality);
      }

      if (this.props.userProfiles['address']) {
        address = this.props.userProfiles['address'];
        localStorage.setItem('address', address);
      }

      if (this.props.userProfiles['gender']) {
        gender = this.props.userProfiles['gender'];
        localStorage.setItem('gender', gender);
      }
    }

    return (
      <Layout>
        <div className={classes.MPWrapper}>
          <div className={classes.MPContainer}>
            <div className={classes.MPContainer_Header}>
              <h2>Quản lý hồ sơ</h2>
            </div>
            <div className={classes.MPContainer_Body}>
              <div className={classes.UserName}>
                <Typography variant="h6">{localStorage.getItem('user')}</Typography>
                <button
                  className={classes.QRCodeButton}
                  onClick={this.handleClickQRCodeButton}
                >
                  <Avatar
                    variant="square"
                    src={qrCodeImage}
                  >
                  </Avatar>
                </button>
              </div>
              <Divider style={{ marginLeft: '35px', marginRight: '35px' }} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: '25px 0'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  <div className={classes.Email}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>Email</Typography>
                    <div className={classes.EmailBody}>
                      <Typography variant="body1">{localStorage.getItem('email')}</Typography>
                      <div
                        style={{
                          background: '#07627e',
                          marginLeft: '14px',
                          borderRadius: '5px',
                          padding: '3px',
                          color: 'white',
                          marginTop: '-3px'
                        }}
                      >
                        <Typography variant="body1">{localStorage.getItem('isVerified') === 'true' ? 'Đã xác minh' : 'Chưa xác minh'}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.Phone}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>Số điện thoại</Typography>
                    <Typography variant="body1">{phoneNumber}</Typography>
                  </div>
                  <div className={classes.DateOfBirth}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>Ngày sinh</Typography>
                    <Typography variant="body1">{dateOfBirth}</Typography>
                  </div>
                  <div className={classes.Gender}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>Giới tính</Typography>
                    <Typography variant="body1">{gender}</Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  <div className={classes.IDNo}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>CMND</Typography>
                    <Typography variant="body1">{idNo}</Typography>
                  </div>
                  <div className={classes.Nationality}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>Quốc tịch</Typography>
                    <Typography variant="body1">{nationality}</Typography>
                  </div>
                  <div className={classes.Address}>
                    <Typography variant="body1" style={{ fontWeight: '600' }}>Địa chỉ</Typography>
                    <Typography variant="body1">{address}</Typography>
                  </div>
                </div>
              </div>
              <Divider style={{ marginLeft: '35px', marginRight: '35px' }} />
              <div className={classes.Buttons}>
                <Button
                  anotherType="RegisterButton-Next"
                  clicked={() => this.props.history.push('/edit-profiles')}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>
          <Dialog
            open={this.state.openQRCodeModal}
            onClose={this.closeQRCodeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "black",
                  textAlign: 'center'
                }}
              >
                Đây là mã QR Code của bạn. Bạn có thể sử dụng nó để xác nhận lịch trình di chuyển tại sân bay
          </DialogContentText>
              <div
                style={{
                  width: 'fit-content',
                  margin: '15px auto'
                }}
              >
                <QRCode
                  value={qrData}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.getUserProfiles.isSuccess,
    userProfiles: state.getUserProfiles.userProfiles,
    error: state.getUserProfiles.error,
    loading: state.getUserProfiles.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetUserProfiles: () => dispatch(actions.getUserProfiles())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageProfilesContainer));