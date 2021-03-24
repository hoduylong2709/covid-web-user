import React from "react";

import classes from './Footer.module.css';

const footer = (props) => (
  <div className={classes.FooterContainer}>
    <div className={classes.FooterItems}>
      <div className={classes.LeftSideItems}>
        <p>Copyright C Covid Web</p>
      </div>
      <div className={classes.RightSideItems}>
        <p>Terms of Service and Privacy Policy</p>
      </div>
    </div>
  </div>
);


export default footer;