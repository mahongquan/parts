import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Client from './Client';
import TextField from '@material-ui/core/TextField';
import SelectPack from './SelectPack';
// import myglobal from '../myglobal';
class DlgCopyPack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopped: true,
      error: '',
      auto_value: '',
      newname: '',
    };
    this.src_id = null;
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal) {
      this.onShow();
    } else if (prevProps.showModal && !this.props.showModal) {
      this.onHide();
    }
  }
  onShow = () => {
    this.open();
  };
  onHide = () => {};
  newnameChange = (event) => {
    this.setState({ newname: event.target.value });
  };
  copy_pack = () => {
    console.log(this.src_id + ' ' + this.state.newname);
    var self = this;
    var data1 = new FormData();
    this.setState({ stopped: false });
    data1.append('oldid', this.src_id);
    data1.append('newname', this.state.newname);
    Client.postForm(
      '/rest/copypack/',
      data1,
      (result) => {
        self.setState({ error: result.message });
        this.setState({ stopped: true });
      },
      (error) => {
        // myglobal.app.show_webview(error.response.url);
      }
    );
  };
  auto_select = (data) => {
    console.log('selected');
    console.log(data);
    this.src_id = data.id;
    //this.setState({ auto_items: [ item ] })
  };
  open = () => {
    this.setState({
      stopped: true,
      error: '',
      auto_value: '',
      newname: '',
    });
    this.src_id = null;
  };
  onChange = (event, { newValue }) => {
    console.log(newValue);
    this.setState({ auto_value: newValue });
  };
  render = () => {
    // console.log(this.state);
    return (
      <Dialog open={this.props.showModal} onClose={this.props.handleClose}>
        <DialogTitle>复制包</DialogTitle>
        <DialogContent>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>包名称:</label>
                </td>
                <td>
                  <SelectPack
                    value={this.state.auto_value}
                    onChange={this.auto_select}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>新包名称:</label>
                </td>
                <td>
                  <TextField
                    id="nameto"
                    type="text"
                    onChange={this.newnameChange}
                    size="medium"
                    value={this.state.newname}
                    maxLength="30"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    color="inherit"
                    variant="outlined"
                    style={{
                      display: this.state.stopped ? '' : 'none',
                    }}
                    onClick={this.copy_pack}
                  >
                    复制
                  </Button>
                  <div
                    align="center"
                    style={{
                      display: this.state.stopped ? 'none' : '',
                    }}
                  >
                    <CircularProgress color="secondary" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p>{this.state.error}</p>
          <div style={{ minHeight: '200px' }} />
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgCopyPack;
