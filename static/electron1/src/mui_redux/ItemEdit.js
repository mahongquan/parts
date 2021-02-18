import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
import update from 'immutability-helper';
import Client from './Client';
import Button from '@material-ui/core/Button';
class ItemEdit extends Component {
  state = {
    showModal: false,
    packitem: {},
    hiddenPacks: true,
    bg: {},
    date_open: false,
  };
  close = () => {
    this.setState({ showModal: false });
  };

  open2 = (idx) => {
    this.setState({ showModal: true, bg: {} });
    this.index = idx;
    if (this.index == null) {
      this.old = {};
    } else {
      this.parent = this.props.parent;
      this.old = this.parent.state.items[this.index];
    }
    this.setState({ packitem: this.old });
  };
  handleSave = (data) => {
    var url = '/rest/Item';
    console.log(this.state.packitem);
    Client.postOrPut(url, this.state.packitem, (res) => {
      console.log(res);
      this.setState({ contact: res.data });
      this.parent.handlePackItemChange(this.index, res.data);
      this.old = res.data;
      this.close();
    });
  };
  quehuoChange = (e) => {
    var quehuo = this.state.packitem.quehuo;
    quehuo = !quehuo;
    if (this.old.quehuo === quehuo) {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.packitem, { quehuo: { $set: quehuo } });
    console.log(contact2);
    this.setState({ packitem: contact2 });
  };
  handleChange = (e) => {
    console.log('change');
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
    if (this.old[e.target.name] === e.target.value) {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.state.packitem, {
      [e.target.name]: { $set: e.target.value },
    });
    console.log(contact2);
    this.setState({ packitem: contact2 });
  };
  render = () => {
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
        <DialogTitle>编辑备件信息</DialogTitle>
        <DialogContent>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    readOnly={true}
                    disabled="disabled"
                    value={this.state.packitem.id}
                  />
                </td>
              </tr>
              <tr>
                <td>名称:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.name }}
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.packitem.name}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>规格:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.guige }}
                    type="text"
                    name="guige"
                    value={this.state.packitem.guige}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.bh }}
                    type="text"
                    id="bh"
                    name="bh"
                    value={this.state.packitem.bh}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>数量:</label>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ backgroundColor: this.state.bg.ct }}
                    id="ct"
                    name="ct"
                    value={this.state.packitem.ct}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>单位:</label>
                </td>
                <td>
                  <input
                    type="text"
                    style={{ backgroundColor: this.state.bg.danwei }}
                    id="danwei"
                    name="danwei"
                    value={this.state.packitem.danwei}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button
              color="primary"
              variant="contained"
              id="bt_save"
              onClick={this.handleSave}
            >
              保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default ItemEdit;
