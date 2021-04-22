import React, { Component } from 'react';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
  render() {
    let navigationItems = (<ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>Trang chủ</NavigationItem>
      <NavigationItem link="/login">Đăng nhập</NavigationItem>
    </ul>);

    if (localStorage.getItem('token') !== null) {
      navigationItems = (<ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Trang chủ</NavigationItem>
        <NavigationItem link="/testing" exact>Xét nghiệm</NavigationItem>
        <div className={classes.ProfileContainer}>
          <AccountCircleRoundedIcon
            className={classes.ProfileIcon}
            style={{ color: '#07627e' }}
          >
          </AccountCircleRoundedIcon>
          <NavigationItem link="/profile">{localStorage.getItem('user')}</NavigationItem>
        </div>
      </ul>);
    }

    return (
      <div>
        {navigationItems}
      </div>
    );
  }
}

export default NavigationItems;