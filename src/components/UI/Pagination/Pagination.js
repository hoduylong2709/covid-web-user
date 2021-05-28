import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import * as actions from '../../../store/actions/index';

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

  const clickPaginationHandle = (event, currentPage) => {
    event.preventDefault();
    if (props.isPaginationForItinerary) {
      props.onSetPaginationItineraryHistory(currentPage, props.pageSize);
    } else {
      props.onSetPagination(currentPage, 10);
    }
  };

  return (
    <div className={classes.root}>
      <Pagination count={props.totalPages} defaultPage={1} color="primary" onChange={(event, currentPage) => clickPaginationHandle(event, currentPage)} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSetPagination: (pageNumber, pageSize) => dispatch(actions.setPagination(pageNumber, pageSize)),
    onSetPaginationItineraryHistory: (pageNumber, pageSize) => dispatch(actions.setPaginationItineraryHistory(pageNumber, pageSize))
  };
};

export default connect(null, mapDispatchToProps)(MyPagination);