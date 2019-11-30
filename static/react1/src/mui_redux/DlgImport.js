import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Client from './Client';
import update from 'immutability-helper';
var _ = require('lodash');
class DlgImport extends React.Component {
  state = {
    error: '',
    packs: [],
    info: '',
  };

  // close=()=>{
  //   this.setState({ showModal: false });
  // }
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
  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props.showModal, nextProps.showModal)) {
      console.log(this.props);
      console.log(nextProps);
      console.log('props not eq');
      return true;
    }
    if (!_.isEqual(this.state, nextState)) {
      console.log('state not eq');
      return true;
    }
    return false;
  }
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
    // let alert;
    // if (this.state.showalert) {
    //   alert = (
    //     <Alert bsStyle="info" onDismiss={this.handleDismiss}>
    //       <p>{this.state.info}</p>
    //     </Alert>
    //   );
    // }
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>导入标样</DialogTitle>
        <DialogContent>
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
            <Button
              style={{ margin: '10px 10px 10px 10px' }}
              className="btn btn-primary"
              onClick={this.upload}
              type="button"
            >
              上传
            </Button>
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
export default DlgImport;
