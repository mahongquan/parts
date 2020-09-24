import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
export default class DlgOkCancel extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = nextProps => {};
  onHide = () => {};
  ok = () => {
    this.props.closeModal(true);
  };
  cancel = () => {
    this.props.closeModal();
  };
  render = () => {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <h2>错误</h2>
        </Modal.Header>
        <Modal.Body>{this.props.description}</Modal.Body>
        <Modal.Footer>
          <button onClick={this.ok} className="btn save btn-primary">
            确定
          </button>
         {/* <button onClick={this.cancel} className="btn save btn-primary">
            取消
          </button>*/}
        </Modal.Footer>
      </Modal>
    );
  };
}
