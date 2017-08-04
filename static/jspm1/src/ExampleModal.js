import React from 'react';
import LoginFormComponent from "./LoginFormComponent";
import {Modal} from "react-bootstrap";
class  ExampleModal extends React.Component{
   constructor() {
    super();
    this.state={ showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  onLoginSubmit (data)  {
    this.props.onLoginSubmit(data);
  }
  render() {
    return (
        <a onClick={()=>this.open()}>{this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginFormComponent onLoginSubmit={(data)=>this.onLoginSubmit(data)} dlgclose={()=>this.close()}/>
        </Modal.Body>

        </Modal>
        </a>
    );
  }
}
export default ExampleModal;