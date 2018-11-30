import React from 'react';
import { Modal } from 'react-bootstrap';
import Browser from './Browser';
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
      <button onClick={this.open}>
        {this.props.title}
        <Modal
          show={this.state.showModal}
          onHide={this.close}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>文件浏览</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Browser initpath={this.props.initpath} />
          </Modal.Body>
        </Modal>
      </button>
    );
  },
});
export default DlgFolder2;
