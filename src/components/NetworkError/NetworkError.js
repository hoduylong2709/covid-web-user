import React from 'react';
import Typography from '@material-ui/core/Typography';

const NetworkError = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Oops!</Typography>
      <Typography
        variant="h5"
        gutterBottom
      >
        Có lỗi xảy ra do server hoặc đường truyền mạng. Vui lòng thử lại!</Typography>
    </div>
  );
}

export default NetworkError;