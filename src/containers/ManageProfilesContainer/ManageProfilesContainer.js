import React, { Component } from 'react';
import classes from './ManageProfilesContainer.module.css';
import Layout from './../../hoc/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import Button from '../../components/UI/Button/Button';

class ManageProfilesContainer extends Component {
  render() {
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
              <div className={classes.SectionItem}>
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
                  <Typography variant="body1">0837416509</Typography>
                </div>
              </div>
              <div className={classes.SectionItem}>
                <div className={classes.DateOfBirth}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Ngày sinh</Typography>
                  <Typography variant="body1">19/05/1999</Typography>
                </div>
                <div className={classes.Gender}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Giới tính</Typography>
                  <Typography variant="body1">Nam</Typography>
                </div>
              </div>
              <div className={classes.SectionItem}>
                <div className={classes.IDNo}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>CMND</Typography>
                  <Typography variant="body1">27091999</Typography>
                </div>
                <div className={classes.Nationality}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Quốc tịch</Typography>
                  <Typography variant="body1">Việt Nam</Typography>
                </div>
              </div>
              <div className={classes.SectionItem}>
                <div className={classes.Address}>
                  <Typography variant="body1" style={{ fontWeight: '600' }}>Địa chỉ</Typography>
                  <Typography variant="body1">54 Nguyen Luong Bang, Hoa Khanh Ward, Lien Chieu District, Danang City, Vietnam</Typography>
                </div>
              </div>
              <div className={classes.Buttons}>
                <Button
                  anotherType="RegisterButton-Next"
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

export default ManageProfilesContainer;