import React from 'react';
import LoginFormComponent from './LoginFormComponent';
import { Modal } from 'react-bootstrap';
// import Client from './Client';
class DlgLogin extends React.Component {
  state = { showModal: false };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
    // Client.login_index((res)=>{
    //   console.log(res);
    // });
  };
  onLoginSubmit = data => {
    this.props.onLoginSubmit(data);
  };
  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginFormComponent
            onLoginSubmit={this.onLoginSubmit}
            dlgclose={this.close}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
export default DlgLogin;
