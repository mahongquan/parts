import React, { Component } from 'react';
import {Modal} from "react-bootstrap";
import Todos from './todos';
class DlgItems extends Component {
  render=()=>{
    return (
          <Modal show={this.props.showModal} onHide={this.props.close}  dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title><strong>待办事项</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <Todos />
           </Modal.Body>
      </Modal>
    );
  }
};
export default DlgItems;