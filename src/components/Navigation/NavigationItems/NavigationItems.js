import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Home</NavigationItem>
    <NavigationItem link="/#">Login</NavigationItem>
    <Button
      btnType="Success"
    >Create New Account</Button>
  </ul>
);

export default navigationItems;