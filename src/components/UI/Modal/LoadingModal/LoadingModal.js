import React, { Component } from 'react';

import classes from './LoadingModal.module.css';
import Aux from '../../../../hoc/Auxx/Auxx';
import Backdrop from '../../Backdrop/Backdrop';
import { BeatLoader } from 'react-spinners';

class LoadingModal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.LoadingModal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          <div className={classes.BeatLoader}>
            <BeatLoader loading size={30} color="#0e2f44" />
          </div>
        </div>
      </Aux>
    );
  }
}

export default LoadingModal;