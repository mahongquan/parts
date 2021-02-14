import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Client from './Client';
import myglobal from '../myglobal';
class DlgImportHT extends React.Component {
  state = {
    showModal: false,
    show: false,
    error: '',
    packs: [],
    info: '',
  };
  close = () => {
    this.setState({ showModal: false });
  };
  upload = () => {
    const file = this.fileUpload.files[0];
    console.log(file);
    var data1 = new FormData();
    data1.append('file', file);
    Client.postForm(
      '/rest/ht',
      data1,
      (res) => {
        if (res.success) {
          this.props.parent.handleContactChange(null, res.data);
          this.setState({ showModal: false });
        } else {
          this.setState({ showalert: true, info: res.message });
        }
      },
      (error) => {
        myglobal.app.show_webview(error.response.url);
      }
    );
  };
  open = () => {
    this.setState({ showModal: true, showalert: false });
    var data = { limit: 10, search: 'docx' };
    Client.get(
      '/rest/Contact',
      data,
      function (result) {
        console.info(result);
        this.setState({ packs: result.data });
        console.log(result.data);
      },
      (error) => {
        myglobal.app.show_webview(error.response.url);
      }
    );
  };
  handleDismiss = () => {
    // this.setState({ showalert: false });
  };
  inputChange = () => {
    // this.setState({ showalert: false });
  };
  render = () => {
    const contactRows = this.state.packs.map((pack, idx) => (
      <tr key={idx}>
        <td>{pack.id}</td>
        <td>{pack.yiqibh}</td>
      </tr>
    ));
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
        <DialogTitle>导入合同</DialogTitle>
        <DialogContent>
          {this.state.info}
          <form ref="form1" encType="multipart/form-data">
            <input
              style={{ margin: '10px 10px 10px 10px' }}
              id="file"
              accept="application/vnd.ms-word"
              type="file"
              name="file"
              ref={(ref) => (this.fileUpload = ref)}
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
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgImportHT;
