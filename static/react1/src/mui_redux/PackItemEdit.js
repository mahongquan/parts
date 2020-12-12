import React from 'react';
import { Modal } from 'react-bootstrap';
import update from 'immutability-helper';
import Client from './Client';
var createReactClass = require('create-react-class');
const PackItemEdit = createReactClass({
  getInitialState() {
    return {
      showModal: false,
      packitem: {},
      hiddenPacks: true,
      bg: {},
      date_open: false,
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
    if (this.props.index == null) {
      this.old = {};
    } else {
      this.parent = this.props.parent;
      this.old = this.parent.state.items[this.props.index];
    }
    this.setState({ packitem: this.old });
  },
  handleSave(data) {
    var url = '/rest/BothPackItem';
    Client.postOrPut(url, this.state.packitem, res => {
      this.setState({ contact: res.data });
      this.parent.handlePackItemChange(this.props.index, res.data);
      this.old = res.data;
      this.close();
    });
  },
  quehuoChange(e) {
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
  },
  handleChange(e) {
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
  },
  render() {
    return (
      <button onClick={this.open}>
        {this.props.title}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                      style={{ backgroundColor: this.state.bg.addr }}
                      type="text"
                      id="addr"
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
                      style={{ backgroundColor: this.state.bg.yiqixinghao }}
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
                      style={{ backgroundColor: this.state.bg.baoxiang }}
                      type="text"
                      id="baoxiang"
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
                      id="yujifahuo_date"
                      name="ct"
                      value={this.state.packitem.ct}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>缺货:</label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id="quehuo"
                      name="quehuo"
                      checked={this.state.packitem.quehuo}
                      onChange={this.quehuoChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button
                className="btn btn-primary"
                id="bt_save"
                onClick={this.handleSave}
              >
                保存
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </button>
    );
  },
});
export default PackItemEdit;
