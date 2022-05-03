import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>Modal Header</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">Hello Modal Here</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
