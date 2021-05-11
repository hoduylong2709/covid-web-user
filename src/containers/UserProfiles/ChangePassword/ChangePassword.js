import React, { Component } from 'react';
import classes from './ChangePassword.module.css';
import LockIcon from '@material-ui/icons/Lock';

class ChangePassword extends Component {
  handleClickEvent = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <a
        className={classes.ChangePasswordContainer}
        href="/#"
        onClick={this.handleClickEvent}
      >
        <div className={classes.Icon}>
          <LockIcon
            fontSize='large'
            style={{ color: '#07627e', transform: 'scale(1.2)' }}
          />
        </div>
        <div className={classes.Title}>
          <h3>Thay đổi mật khẩu</h3>
        </div>
      </a>
    );
  }
}

export default ChangePassword;