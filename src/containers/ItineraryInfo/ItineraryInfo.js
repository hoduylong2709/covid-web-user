import React, { Component } from 'react';
import Layout from './../../hoc/Layout/Layout';
import classes from './ItineraryInfo.module.css';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

class ItineraryInfo extends Component {

  handleDepartureFieldChange = (event) => {
    // console.log(event.target.value);
  }

  render() {
    return (
      <Layout>
        <div className={classes.ItineraryContainer}>
          <div className={classes.ItineraryContent}>
            <div className={classes.ItineraryHeader}>
              <h2 className={classes.ItineraryTitle}>Thông tin lịch trình</h2>
            </div>
            <div className={classes.ItineraryBody}>
              <div>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="Địa điểm khởi hành"
                      onChange={this.handleDepartureFieldChange}
                    />
                  </Grid>
                </Grid>
              </div>
              <form className={classes.container} noValidate>
                <TextField
                  id="datetime-local"
                  label="Thời gian khởi hành"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ItineraryInfo;