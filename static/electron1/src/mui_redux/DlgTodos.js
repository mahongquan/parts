import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import CONTACTs from './CONTACTs';
class DlgItems extends Component {
  render = () => {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>待办事项</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CONTACTs />
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgItems;
