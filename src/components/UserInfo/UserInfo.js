import React from 'react';
import classes from './UserInfo.module.css';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

const userInfo = (props) => {
  return (
    <div className={classes.InfoContainer}>
      <div className={classes.Icon}>
        <PersonIcon
          fontSize='large'
          style={{ color: '#07627e', transform: 'scale(3.0)' }}
        />
      </div>
      <div className={classes.Info}>
        <h3 className={classes.UserName}>{localStorage.getItem('user')}</h3>
        <Typography variant="body1">{localStorage.getItem('email')}</Typography>
      </div>
    </div>
  );
}

export default userInfo;