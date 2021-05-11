import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Logout.module.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Logout extends Component {
  handleClickEvent = (event) => {
    event.preventDefault();
    localStorage.clear();
    setTimeout(() => {
      this.props.history.push("/");
    }, 1000);
  }

  render() {
    return (
      <a
        id="log-out"
        className={classes.LogoutContainer}
        href="/#"
        onClick={this.handleClickEvent}
      >
        <div className={classes.Icon}>
          <ExitToAppIcon
            fontSize='large'
            style={{ color: '#07627e', transform: 'scale(1.2)' }}
          />
        </div>
        <div className={classes.Title}>
          <h3>Đăng xuất</h3>
        </div>
      </a>
    );
  }
}

export default withRouter(Logout);