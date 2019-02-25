import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from './Client';
class DlgUrl extends Component {
  state = {
    error: '',
  };
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = nextProps => {
    this.open(nextProps.url, nextProps.data, nextProps.callback);
  };
  onHide = () => {};
  open = (url, data, callback) => {
    var self = this;
    Client.get(url, data, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        callback(result.data);
        self.props.handleClose();
      }
    });
  };
  render = () => {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleClose}
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
