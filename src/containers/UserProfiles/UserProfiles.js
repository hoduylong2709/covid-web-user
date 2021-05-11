import React, { Component } from 'react';
import classes from './UserProfiles.module.css';
import Layout from './../../hoc/Layout/Layout';
import UserInfo from '../../components/UserInfo/UserInfo';
import ManageProfiles from './ManageProfiles/ManageProfiles';
import ChangePassword from './ChangePassword/ChangePassword';
import Logout from './Logout/Logout';

class UserProfiles extends Component {
  render() {
    return (
      <Layout>
        <div className={classes.ProfilesContainer}>
          <div className={classes.Components}>
            <UserInfo />
            <ManageProfiles />
            <ChangePassword />
            <Logout />
          </div>
        </div>
      </Layout>
    );
  }
}

export default UserProfiles;