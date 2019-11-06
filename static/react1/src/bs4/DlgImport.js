import React from 'react';
import { Alert, Modal,Table } from 'react-bootstrap';
import Client from './Client';
import update from 'immutability-helper';
class DlgImport extends React.Component {
  state = {
    error: '',
    packs: [],
    info: '',
    showA:true,
  };
  upload = () => {
    const file = this.fileUpload.files[0];
    console.log(file);
    var data1 = new FormData();
    data1.append('file', file);
    //console.log(data1)
    var self = this;
    Client.postForm('/rest/standard', data1, function(res) {
      if (res.result.length > 0) {
        const newFoods = update(self.state.packs, { $unshift: res.result });
        self.setState({ packs: newFoods });
      }
      self.setState({
        showalert: true,
        info: '导入了' + res.result.length + '个合同的标钢。',
      });
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow();
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = () => {
    this.open();
  };
  onHide = () => {};
  open = () => {
    var self = this;
    //this.setState({ showModal: true,showalert:false });
    var data = { limit: 10, search: 'xls' };
    Client.get('/rest/Pack', data, function(result) {
      console.info(result);
      // if (!result.success){
      //    self.setState({error:result.message});
      // }
      // else
      self.setState({ packs: result.data });
      console.log(result.data);
    });
  };
  handleDismiss = () => {
    console.log("onClose");
    this.setState({ showalert: false });
  };
  inputChange = () => {
    this.setState({ showalert: false });
  };
  render = () => {
    // console.log("render ImportStandard")
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td>{pack.id}</td>
        <td>{pack.name}</td>
      </tr>
    ));
    let alert;
    if (this.state.showalert) {
      alert = (
        <Alert variant="info" onClose={this.handleDismiss} dismissible>
          <p>{this.state.info}</p>
        </Alert>
      );
    }
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>导入标样</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            alert
// <Toast  show={this.state.showA} onClose={()=>{this.setState({showA:false});}}>
//   <Toast.Header>
//     <strong className="mr-auto">Bootstrap</strong>
//     <small>11 mins ago</small>
//   </Toast.Header>
//   <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
  // </Toast>
}
          <form ref="form1" encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.ms-excel"
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
            <Table className="table-bordered">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>名称</td>
                </tr>
              </thead>
              <tbody>{contactRows}</tbody>
            </Table>
          </div>
          <div>{this.state.error}</div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgImport;
