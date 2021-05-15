import React from 'react';

import classes from './Banner.module.css';
import covid1 from '../../assets/images/covid_background.jpg';

const banner = (props) => (
  <div>
    <h1
      style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        zIndex: '1',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: "'Roboto Mono', monospace",
        height: 'fit-content',
        fontWeight: 'bolder',
        fontSize: 'xxx-large',
        textAlign: 'center',
        width: 'fit-content',
        wordSpacing: '-13px'
      }}
    >HỆ THỐNG QUẢN LÝ Y TẾ PHÒNG CHỐNG DỊCH COVID-19</h1>
    <img
      src={covid1}
      alt="my-banner"
      className={classes.BannerImage}
    />
  </div>
);

export default banner;