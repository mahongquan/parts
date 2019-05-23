import React from 'react';
import { Modal } from 'react-bootstrap';
import Client from './Client';
var _ = require('lodash');
class DlgFolder extends React.Component {
  state = {
    showModal: false,
    hiddenPacks: true,
    error: '',
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    ) {
      return true;
    } else {
      return false;
    }
  }
  close = () => {
    this.setState({ showModal: false });
  };

  open(contact_id) {
    var self = this;
    this.setState({ showModal: true });
    Client.get('/rest/folder/', { id: contact_id }, function(result) {
      console.info(result);
      if (!result.success) {
        self.setState({ error: result.message });
      } else {
        self.close();
      }
    });
  }
  render() {
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
  }
}
export default DlgFolder;
