import React from 'react';

import classes from './Banner.module.css';
import bannerImage from '../../assets/images/banner-ver4.png';

const banner = (props) => (
  <div>
    <img src={bannerImage} alt="my-banner" className={classes.BannerImage} />
  </div>
);

export default banner;