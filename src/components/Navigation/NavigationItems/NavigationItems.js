import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Home</NavigationItem>
    <NavigationItem link="/login">Login</NavigationItem>
    {/* <Button
      btnType="Success"
      clicked={props.navigateToSignupPage}
    >Create New Account</Button> */}
    <NavigationItem link="/signup">Signup</NavigationItem>
  </ul>
);

export default navigationItems;