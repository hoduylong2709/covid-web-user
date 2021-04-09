import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Trang chủ</NavigationItem>
    <NavigationItem link="/login">Đăng nhập</NavigationItem>
    {/* <NavigationItem link="/signup">Signup</NavigationItem> */}
  </ul>
);

export default navigationItems;