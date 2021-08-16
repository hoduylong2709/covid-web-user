import React from 'react';

import covidLogo from '../../assets/images/logo_web.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={covidLogo} alt="my-logo" />
    <h3
      style={{
        fontFamily: "'Roboto Mono', monospace",
        wordSpacing: '-6px'
      }}
    >HỆ THỐNG QUẢN LÝ Y TẾ PHÒNG CHỐNG DỊCH COVID-19</h3>
  </div>
);

export default logo;