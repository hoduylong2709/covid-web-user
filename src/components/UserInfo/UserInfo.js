import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './UserInfo.module.css';
import Typography from '@material-ui/core/Typography';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import * as actions from '../../store/actions/index';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    loading: false,
    openCheckSizeImageModal: false
  }

  componentDidMount() {
    this.props.onGetProfileImage();
  }

  handleChangeImage = (event) => {
    if (event.target.files[0].size > 5000000) {
      this.setState({ openCheckSizeImageModal: true });
      return;
    }
    this.props.onUploadProfileImage(event.target.files[0]);
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.onGetProfileImage();
      this.setState({ loading: false });
    }, 500);
  }

  handleCloseCheckSizeImageModal = () => {
    this.setState({ openCheckSizeImageModal: false });
  }

  render() {
    let profileImage = <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" id="img" className={classes.UploadImage} />;

    if (this.props.profileImage) {
      profileImage = <img src={this.props.profileImage + `?a=${Math.random()}`} alt="" id="img" className={classes.UploadImage} />;
    }

    if (this.state.loading) {
      profileImage = <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" id="img" className={classes.UploadImage} />;
    }

    return (
      <div className={classes.InfoContainer}>
        <div className={classes.Icon}>
          {profileImage}
        </div>
        <div className={classes.Info}>
          <h3 className={classes.UserName}>{localStorage.getItem('user')}</h3>
          <Typography variant="body1">{localStorage.getItem('email')}</Typography>
        </div>
        <button
          className={classes.UploadImageButton}
          onClick={() => this.myRef.current.click()}
        >
          <AddAPhotoIcon
            style={{ color: '#07627e', transform: 'scale(1.5)' }}
          />
        </button>
        <input
          type="file" accept="image/*"
          name="image-upload"
          id="image-upload"
          style={{ display: 'none' }}
          ref={this.myRef}
          onChange={this.handleChangeImage}
        />
        <Dialog
          open={this.state.openCheckSizeImageModal}
          onClose={this.handleCloseCheckSizeImageModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "black"
              }}
            >
              Kích thước ảnh quá lớn, vui lòng chọn lại!
          </DialogContentText>
          </DialogContent>
        </Dialog>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: state.uploadProfileImage.isSuccess,
    error: state.uploadProfileImage.error,
    loading: state.uploadProfileImage.loading,
    profileImage: state.setProfileImage.profileImage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUploadProfileImage: (imgFile) => dispatch(actions.uploadProfileImage(imgFile)),
    onGetProfileImage: () => dispatch(actions.getProfileImage())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);