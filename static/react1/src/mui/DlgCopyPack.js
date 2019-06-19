import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Client from './Client';
import TextField from '@material-ui/core/TextField';
import SelectPack from './SelectPack'
import Spinner from './react-spin';
import myglobal from '../myglobal';
class DlgCopyPack extends React.Component {
  state = {
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_items: [],
    auto_loading: false,
    stopped: true,
  };
  newnameChange = event => {
    this.setState({ newname: event.target.value });
  };
  copy_pack = () => {
    console.log(this.src_id + ' ' + this.state.newname);
    var self = this;
    var data1 = new FormData();
    this.setState({ stopped: false });
    data1.append('oldid', this.src_id);
    data1.append('newname', this.state.newname);
    Client.postForm('/rest/copypack/', data1, result => {
      self.setState({ error: result.message });
      this.setState({ stopped: true });
    },(error)=>{
      myglobal.app.show_webview(error.response.url);
    });
  };
  auto_select = ( data) => {
    console.log('selected');
    console.log(data);
    this.src_id = data.id;
    //this.setState({ auto_items: [ item ] })
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({
      showModal: true,
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
    const spinCfg = {
      lines: 8, // The number of lines to draw
      length: 5, // The length of each line
      width: 30, // The line thickness
      radius: 35, // The radius of the inner circle
      scale: 0.25, // Scales overall size of the spinner
      top: '85px', // Top position relative to parent
      left: '100px', // Left position relative to parent
      //position: 'realative' // Element positioning
    };
    let showbutton;
    if (this.state.stopped) {
      showbutton = 'block';
    } else {
      showbutton = 'none';
    }
    // console.log(this.state);
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
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
                  onChange={this.auto_select}/>
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
                    size="15"
                    value={this.state.newname}
                    maxLength="30"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <Button color="inherit" variant="outlined" style={{display:showbutton}} onClick={this.copy_pack}>复制</Button>
                    <Spinner config={spinCfg} stopped={this.state.stopped} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p>{this.state.error}</p>
           <div style={{minHeight:"200px"}}></div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgCopyPack;
