import React, { Component } from 'react';
import classes from './ManageProfiles.module.css';
import DescriptionIcon from '@material-ui/icons/Description';

class ManageProfiles extends Component {
  handleClickEvent = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <a
        className={classes.ManageProfilesContainer}
        href="/#"
        onClick={this.handleClickEvent}
      >
        <div className={classes.Icon}>
          <DescriptionIcon
            fontSize='large'
            style={{ color: '#07627e', transform: 'scale(1.2)' }}
          />
        </div>
        <div className={classes.Title}>
          <h3>Quản lý hồ sơ</h3>
        </div>
      </a>
    );
  }
}

export default ManageProfiles;