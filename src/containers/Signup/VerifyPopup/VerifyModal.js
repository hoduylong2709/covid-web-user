import React from 'react';
import Popup from 'reactjs-popup';

// import classes from './VerifyModal.module.css';
import 'reactjs-popup/dist/index.css';

const contentStyle = {
  maxWidth: "500px",
  width: "80%"
};

const verifyModal = () => (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    contentStyle={contentStyle}
  >
    {(close) => (
      <div className="modal">
        <div className="header"> Verify Your Account </div>
        <div className="content">
          {" "}
          Please check your email and confirm the code
          <div>
            <input type="text" name="code" placeholder="Your code here" />
          </div>
        </div>
        <div className="actions">
          <button className="button custom-button">Submit</button>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default verifyModal;