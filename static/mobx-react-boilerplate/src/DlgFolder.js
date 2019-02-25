import React from 'react';
import { Modal } from 'react-bootstrap';
import Client from './Client';
var _ = require('lodash');
class DlgFolder extends React.Component {
  state = {
    error: '',
  };
  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = nextProps => {
    this.open(nextProps.contactid);
  };
  onHide = () => {};

  open(contact_id) {
    var self = this;
    this.setState({ showModal: true });
    Client.get('/rest/folder/', { id: contact_id }, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        self.props.handleClose();
      }
    });
  }
  render() {
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
  }
}
export default DlgFolder;
