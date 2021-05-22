import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';

const editForm = (props) => {
  const inputFields = (
    <div>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue={props.time}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
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
            Chỉnh sửa thông tin check-in
          </DialogContentText>
          {props.loading ?
            <CircularProgress style={{
              marginTop: '5px',
              marginLeft: '175px',
              marginBottom: '15px'
            }} /> : (props.hasError ? errorView : inputFields)}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default editForm;