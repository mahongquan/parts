import React from 'react';
import { Modal } from 'react-bootstrap';
import Browser from './Browser2';
var createReactClass = require('create-react-class');
const DlgFolder2 = createReactClass({
  getInitialState() {
    return {
      showModal: false,
      hiddenPacks: true,
      error: '',
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },
  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>文件浏览</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Browser initpath={this.props.initpath} />
        </Modal.Body>
      </Modal>
    );
  },
});
export default DlgFolder2;
