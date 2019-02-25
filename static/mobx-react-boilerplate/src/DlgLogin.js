import React from 'react';
import LoginFormComponent from './LoginFormComponent';
import { Modal } from 'react-bootstrap';

class DlgLogin extends React.Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginFormComponent
            onLoginSubmit={this.props.onLoginSubmit}
            dlgclose={this.props.handleClose}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
export default DlgLogin;
