import React from 'react';
import { Alert, Modal } from 'react-bootstrap';
import Client from './Client';
var _ = require('lodash');
class DlgImportHT extends React.Component {
  state = {
    showModal: false,
    show: false,
    error: '',
    packs: [],
    info: '',
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
  upload = () => {
    const file = this.fileUpload.files[0];
    console.log(file);
    var data1 = new FormData();
    data1.append('file', file);
    //console.log(data1)
    var self = this;
    Client.postForm('/rest/ht', data1, function(res) {
      if (res.success) {
        self.props.parent.handleContactChange(null, res.data);
        self.setState({ showModal: false });
      } else {
        self.setState({ showalert: true, info: res.message });
      }
    });
  };
  open = () => {
    var self = this;
    this.setState({ showModal: true, showalert: false });
    var data = { limit: 10, search: 'docx' };
    Client.get('/rest/Contact', data, function(result) {
      console.info(result);
      self.setState({ packs: result.data });
      console.log(result.data);
    });
  };
  handleDismiss = () => {
    this.setState({ showalert: false });
  };
  inputChange = () => {
    this.setState({ showalert: false });
  };
  render = () => {
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td>{pack.id}</td>
        <td>{pack.yiqibh}</td>
      </tr>
    ));
    let alert;
    if (this.state.showalert) {
      alert = (
        <Alert bsStyle="info" onDismiss={this.handleDismiss}>
          <p>{this.state.info}</p>
        </Alert>
      );
    }
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>导入合同</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
          <form ref="form1" encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.ms-word"
              type="file"
              name="file"
              ref={ref => (this.fileUpload = ref)}
              onChange={this.inputChange}
            />
            <button
              style={{ margin: '10px 10px 10px 10px' }}
              className="btn btn-primary"
              onClick={this.upload}
              type="button"
            >
              上传
            </button>
          </form>
          <div style={{ minHeight: '200px' }}>
            <table className="table-bordered">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>名称</td>
                </tr>
              </thead>
              <tbody>{contactRows}</tbody>
            </table>
          </div>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgImportHT;
