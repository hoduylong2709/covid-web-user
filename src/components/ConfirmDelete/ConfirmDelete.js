import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const confirmDelete = (props) => {
  return (
    <div>
      <Dialog
        open={props.openConfirmation}
        onClose={props.closeConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa địa điểm và thời gian check-in?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={props.deleteRecord}
          >
            Xóa
          </Button>
          <Button
            color="primary"
            onClick={props.closeConfirmation}
            autoFocus
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default confirmDelete;
