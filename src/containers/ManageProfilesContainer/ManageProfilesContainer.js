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

class ManageProfilesContainer extends Component {
  componentDidMount() {
    this.props.onGetUserProfiles();
  }

  render() {
    let phoneNumber = 'N/A';
    let dateOfBirth = 'N/A';
    let gender = 'N/A';
    let idNo = 'N/A';
    let nationality = 'N/A';
    let address = 'N/A';

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
                <Typography variant="body1">{localStorage.getItem('user')}</Typography>
              </div>
              <Divider style={{ marginLeft: '35px', marginRight: '35px' }} />
              <div className={[classes.SectionItem, classes.SectionItem1].join(' ')}>
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
              </div>
              <div className={classes.SectionItem}>
                <div className={classes.DateOfBirth}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Ngày sinh</Typography>
                  <Typography variant="body1">{dateOfBirth}</Typography>
                </div>
                <div className={classes.Gender}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Giới tính</Typography>
                  <Typography variant="body1">{gender}</Typography>
                </div>
              </div>
              <div className={classes.SectionItem}>
                <div className={classes.IDNo}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>CMND</Typography>
                  <Typography variant="body1">{idNo}</Typography>
                </div>
                <div className={classes.Nationality}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Quốc tịch</Typography>
                  <Typography variant="body1">{nationality}</Typography>
                </div>
              </div>
              <div className={classes.SectionItem}>
                <div className={classes.Address}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Địa chỉ</Typography>
                  <Typography variant="body1">{address}</Typography>
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