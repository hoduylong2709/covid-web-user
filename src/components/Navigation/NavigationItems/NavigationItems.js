import React, { Component } from 'react';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

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
        <NavigationItem link="/#" exact>Xét nghiệm</NavigationItem>
        <div className={classes.ProfileContainer}>
          <AccountCircleOutlinedIcon className={classes.ProfileIcon}></AccountCircleOutlinedIcon>
          <NavigationItem link="/#">{localStorage.getItem('user')}</NavigationItem>
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