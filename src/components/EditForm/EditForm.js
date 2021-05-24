import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const editForm = (props) => {
  const inputFields = props.isEditForLocationCheckin ? (
    <div>
      <TextField
        id="datetime-local"
        label="Thời gian check-in"
        type="datetime-local"
        defaultValue={props.time}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ max: moment(new Date()).format().substring(0, 16) }}
        onChange={props.changeTime}
      />
      <TextField
        margin="dense"
        id="location"
        label="Địa điểm check-in"
        type="text"
        value={props.address}
        fullWidth
        onChange={props.changeLocation}
      />
      <DialogActions>
        <Button
          onClick={props.closeEditForm}
          color="primary"
        >
          Hủy
          </Button>
        <Button
          onClick={props.editLocationCheckin}
          color="primary"
          disabled={props.address === ''}
        >
          Xác nhận
          </Button>
      </DialogActions>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Địa điểm khởi hành*</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.departure}
          onChange={props.handleDepartureFieldChange}
          style={{ minWidth: '250px' }}
        >
          {props.cityList1}
        </Select>
      </FormControl>
      <TextField
        id="datetime-local"
        label="Thời gian khởi hành*"
        type="datetime-local"
        defaultValue={props.time}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ max: moment(new Date()).format().substring(0, 16) }}
        onChange={props.changeTime}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Địa điểm đến*</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.destination}
          onChange={props.handleDestinationFieldChange}
          style={{ minWidth: '250px' }}
        >
          {props.cityList2}
        </Select>
      </FormControl>
      <TextField
        id="datetime-local"
        label="Thời gian đến*"
        type="datetime-local"
        defaultValue={props.time}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ max: moment(new Date()).format().substring(0, 16) }}
        onChange={props.changeTime}
      />
      <TextField
        margin="dense"
        id="location"
        label="Số hiệu phương tiện*"
        type="text"
        value={props.address}
        fullWidth
        onChange={props.changeLocation}
      />
      <DialogActions>
        <Button
          onClick={props.closeEditForm}
          color="primary"
        >
          Hủy
          </Button>
        <Button
          onClick={props.editLocationCheckin}
          color="primary"
          disabled={props.address === ''}
        >
          Xác nhận
          </Button>
      </DialogActions>
    </div>
  );

  const errorView = (
    <DialogContent
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px'
      }}
    >
      <ErrorIcon
        style={{
          color: 'red'
        }}
      />
      <DialogContentText
        id="alert-dialog-description"
        style={{
          color: "black"
        }}
      >
        Xóa địa điểm check-in thất bại, xin vui lòng thử lại!
          </DialogContentText>
    </DialogContent>
  );

  return (
    <div>
      <Dialog
        open={props.openEditForm}
        onClose={props.closeEditForm}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='xs'
      >
        <DialogContent>
          <DialogContentText
            style={{
              fontWeight: '600'
            }}
          >
            {props.isEditForLocationCheckin ? 'Chỉnh sửa thông tin check-in' : 'Chỉnh sửa thông tin lịch trình'}
          </DialogContentText>
          {props.loading ?
            <CircularProgress style={{
              marginTop: '5px',
              marginLeft: '175px',
              marginBottom: '15px'
            }} /> : (props.hasError ? errorView : inputFields)}
        </DialogContent>
      </Dialog>
      <Dialog
        open={props.openVerifyTimeModal}
        onClose={props.closeVerifyTimeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContent
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px'
            }}
          >
            <ErrorIcon
              style={{
                color: 'red'
              }}
            />
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "black"
              }}
            >
              Thời gian check-in không hợp lệ, xin vui lòng chọn lại!
          </DialogContentText>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default editForm;