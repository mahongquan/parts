import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from './Client';
class DlgUrl extends Component {
  state = {
    showModal: false,
    error: '',
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = (url, data, callback) => {
    //this.parent=parent;
    //this.index=idx;
    var self = this;
    this.setState({ showModal: true });
    Client.get(url, data, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        callback(result.data);
        self.close();
      }
    });
  };
  render = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>请等待。。。</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgUrl;
