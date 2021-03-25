import React from 'react';

import classes from './Banner.module.css';
import bannerImage from '../../assets/images/danang.jpg';

const banner = (props) => (
  <div>
    <img src={bannerImage} alt="my-banner" />
  </div>
);

export default banner;