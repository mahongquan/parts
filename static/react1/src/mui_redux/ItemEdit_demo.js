import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import update from 'immutability-helper';
var _ = require('lodash');
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

  open2 = idx => {
    this.setState({ showModal: true, bg: {} });
    this.index = idx;
    if (this.index == null) {
      this.old = null;
    } else {
      this.parent = this.props.parent;
      this.old = this.parent.state.items[this.index];
    }
    this.setState({ packitem: this.old });
    if (this.old) this.old = _.clone(this.old.dataValues);
  };
  handleSave = data => {
    console.log(this.old);
    console.log(this.state.packitem);
    this.state.packitem.save();
    this.old = _.clone(this.state.packitem.dataValues);
    this.setState({ bg: {} });
    this.parent.handlePackItemChange(this.index, this.state.packitem);
  };
  quehuoChange = e => {
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
  handleChange = e => {
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
    );
  };
}
export default ItemEdit;
