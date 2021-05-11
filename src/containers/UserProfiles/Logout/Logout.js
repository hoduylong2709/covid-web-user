import React, { Component } from 'react';
import classes from './Logout.module.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Logout extends Component {
  render() {
    return (
      <div className={classes.LogoutContainer}>
        <div className={classes.Icon}>
          <ExitToAppIcon
            fontSize='large'
            style={{ color: '#07627e', transform: 'scale(1.2)' }}
          />
        </div>
        <div className={classes.Title}>
          <h3>Đăng xuất</h3>
        </div>
      </div>
    );
  }
}

export default Logout;