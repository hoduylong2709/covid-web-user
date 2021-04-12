import React from 'react';

import Modal from '../Modal';
import Button from '../../Button/Button';
import classes from './VerifyModal.module.css';

const verifyModal = (props) => (
  <Modal
    show={props.showVerifyModal}
  >
    <div className={classes.VerifyModal}>
      <h4 className={classes.VerifyHeader}>Vui lòng kiểm tra Email và nhập mã code</h4>
      <input className={classes.VerifyInput} type="text" name="code-number" placeholder="Code" />
      <div className={classes.Button}>
        <div className={classes.SubmitButton}>
          <Button btnType="Success">Submit</Button>
        </div>
        <div className={classes.CancelButton}>
          <Button btnType="Danger">Cancel</Button>
        </div>
      </div>
    </div>
  </Modal>
);

export default verifyModal;