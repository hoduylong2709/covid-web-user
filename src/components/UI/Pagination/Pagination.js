import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      float: "right",
      marginRight: "68px"
    },
    '& .Mui-selected': {
      backgroundColor: '#07627e',
    },
  },
}));

const MyPagination = (props) => {
  const classes = useStyles();

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log('You changed pagination');
  };

  return (
    <div className={classes.root}>
      <Pagination count={props.totalPages} defaultPage={1} color="primary" onChange={handleOnChange} />
    </div>
  );
};

export default MyPagination;