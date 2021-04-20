import React from 'react';

import covidLogo from '../../assets/images/logo_web.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={covidLogo} alt="my-logo" />
  </div>
);

export default logo;