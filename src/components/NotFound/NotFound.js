import React from 'react';
import Typography from '@material-ui/core/Typography';

const notFound = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        style={{
          color: 'gray'
        }}
      >
        404</Typography>
      <Typography
        variant="h4"
        gutterBottom
      >
        Oops! Trang bạn cần không tìm thấy</Typography>
      <Typography
        variant="h5"
        gutterBottom
      >
        Vui lòng kiểm tra lại đường dẫn!</Typography>
    </div>
  );
}

export default notFound;