import React, { Component } from 'react';
import UsePacks2 from './UsePacks2';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import update from 'immutability-helper';
import Autosuggest from 'react-autosuggest';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import RichTextEditor from 'react-rte';
import { withStyles } from '@material-ui/core/styles';
import { types } from './reducers';
import MomentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
// var _ = require('lodash');
// var moment = require('moment');
// eslint-disable-next-line
var locale = require('moment/locale/zh-cn');
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class ContactEdit2New extends Component {
  state = {
    bg: {},
    editRich: false,
    rich: RichTextEditor.createEmptyValue(),
  };

  componentDidMount = () => {
    // console.log("ContactEdit2New mounted");
  };
  handleCopy = data => {
    console.log('copy');
    this.index = null;
    var contact2 = update(this.props.store.contact, { id: { $set: '' } });
    console.log(contact2);
    this.setState({ contact: contact2 });
    this.props.store.dispatch({ type: types.hiddenPacks });
    // this.setState({ hiddenPacks: true });
  };
  handleSave = () => {
    let dataSave = this.props.store.contact;
    dataSave.detail = this.state.rich.toString('html');
    this.props.store.actions.saveContact(dataSave, this.props.index, (res) => {
      this.open2(0)
    });
  };
  tiaoshi_date_change = value => {
    //this.state.yujifahuo_date=value;
    var e_target_name = 'tiaoshi_date';
    console.log(this.old[e_target_name]);
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM-DD');
    }
    console.log(t);
    if (this.old[e_target_name] === t) {
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      //console.log("not equal")
      //this.state.bg[e_target_name]="#8888ff";
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.props.store.contact, {
      [e_target_name]: { $set: t },
    });
    console.log(contact2);
    this.setState({ contact: contact2 });
  };

  yujifahuo_date_change = value => {
    //this.state.yujifahuo_date=value;
    var e_target_name = 'yujifahuo_date';
    console.log(this.old[e_target_name]);
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM-DD');
    }
    console.log(t);
    if (this.old[e_target_name] === t) {
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.props.store.contact, {
      [e_target_name]: { $set: t },
    });
    console.log(contact2);
    this.setState({ contact: contact2 });
  };
  channels_change = (event, { newValue }) => {
    this.change1(newValue);
  };
  channels_change_fetch = () => {};
  channels_select = (event, data) => {
    this.change1(data.suggestion);
  };
  change1 = item => {
    console.log('selected');
    console.log(item);
    if (this.old.channels === item) {
      const bg2 = update(this.state.bg, { channels: { $set: '#ffffff' } });
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, { channels: { $set: '#8888ff' } });
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.props.store.contact, { channels: { $set: item } });
    console.log(contact2);
    this.setState({ contact: contact2 });
  };
  yiqixinghao_change = (event, { newValue }) => {
    this.change2(newValue);
  };
  yiqixinghao_select = (event, data) => {
    this.change2(data.suggestion);
  };
  change2 = item => {
    console.log('selected');
    console.log(item);
    if (this.old.yiqixinghao === item) {
      const bg2 = update(this.state.bg, { yiqixinghao: { $set: '#ffffff' } });
      this.setState({ bg: bg2 });
    } else {
      const bg2 = update(this.state.bg, { yiqixinghao: { $set: '#8888ff' } });
      this.setState({ bg: bg2 });
    }
    const contact2 = update(this.props.store.contact, {
      yiqixinghao: { $set: item },
    });
    // console.log(contact2);
    this.setState({ contact: contact2 });
  };
  handleChange = e => {
    // console.log('change');
    // console.log(e);
    // console.log(e.target.value);
    // console.log(e.target.name);
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
    const contact2 = update(this.props.store.contact, {
      [e.target.name]: { $set: e.target.value },
    });
    // console.log(contact2);
    this.setState({ contact: contact2 });
  };
  matchStateToTerm = (state, value) => {
    return state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  };
  detailchange = value => {
    console.log(value);
    this.setState({ rich: value });
  };
  render = () => {
    return (
      <Dialog
        open={this.props.showModal}
        onClose={this.props.handleClose}
        fullScreen
      >
        <AppBar className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              
              onClick={this.props.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              
              className={this.props.classes.flex}
            >
              编辑仪器信息
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <table id="table_input" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    disabled="disabled"
                    value={this.props.store.contact.id||""}
                  />
                </td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.yonghu }}
                    type="text"
                    id="yonghu"
                    name="yonghu"
                    value={this.props.store.contact.yonghu||""}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.addr }}
                    type="text"
                    id="addr"
                    name="addr"
                    value={this.props.store.contact.addr||""}
                    onChange={this.handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'channels-autocomplete',
                      style: { backgroundColor: this.state.bg.channels },
                      value: this.props.store.contact.channels||"",
                      onChange: this.channels_change,
                    }}
                    suggestions={[
                      '1O(低氧)',
                      '1O(高氧)',
                      '1O(低氧)+2N',
                      '1C(低碳)+2S',
                      '1C(高碳)+2S',
                      '2C+1S(低硫)',
                      '2C+1S(高硫)',
                      '2C+2S',
                      '2O+2N',
                      '2O',
                    ]}
                    getSuggestionValue={item => item}
                    onSuggestionSelected={this.channels_select}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    renderSuggestion={item => <span>{item}</span>}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>仪器型号:</label>
                </td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'yiqixinghao-autocomplete',
                      style: { backgroundColor: this.state.bg.yiqixinghao },
                      value: this.props.store.contact.yiqixinghao||"",
                      onChange: this.yiqixinghao_change,
                    }}
                    suggestions={[
                      'CS-1011C',
                      'CS-2800',
                      'CS-3000',
                      'CS-3000G',
                      'HD-5',
                      'N-3000',
                      'O-3000',
                      'OH-3000',
                      'ON-3000',
                      'ON-4000',
                      'ONH-3000',
                    ]}
                    getSuggestionValue={item => item}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    onSuggestionSelected={this.yiqixinghao_select}
                    renderSuggestion={item => <span>{item}</span>}
                  />
                </td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.yiqibh }}
                    type="text"
                    id="yiqibh"
                    name="yiqibh"
                    value={this.props.store.contact.yiqibh||""}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.baoxiang }}
                    type="text"
                    id="baoxiang"
                    name="baoxiang"
                    value={this.props.store.contact.baoxiang||""}
                    onChange={this.handleChange}
                  />
                </td>
                <td>审核:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.shenhe }}
                    type="text"
                    id="shenhe"
                    name="shenhe"
                    value={this.props.store.contact.shenhe||""}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={this.props.store.contact.yujifahuo_date||""}
                    onChange={this.yujifahuo_date_change}
                    style={{ backgroundColor: this.state.bg.yujifahuo_date }}
                  />
                </td>
                <td>调试时间:</td>
                <td>
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ backgroundColor: this.state.bg.tiaoshi_date }}

                    value={this.props.store.contact.tiaoshi_date||""}
                    onChange={this.tiaoshi_date_change}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.hetongbh }}
                    type="text"
                    id="hetongbh"
                    name="hetongbh"
                    value={this.props.store.contact.hetongbh||""}
                    onChange={this.handleChange}
                  />
                </td>
                <td>方法:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.method }}
                    type="text"
                    id="method"
                    name="method"
                    disabled={true}
                    value={this.props.store.contact.method||""}
                  />
                </td>
              </tr>

              <tr>
                <td>电气:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.dianqi }}
                    type="text"
                    name="dianqi"
                    value={this.props.store.contact.dianqi||""}
                    onChange={this.handleChange}
                  />
                </td>
                <td>机械:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.jixie }}
                    type="text"
                    name="jixie"
                    onChange={this.handleChange}
                    value={this.props.store.contact.jixie||""}
                  />
                </td>
              </tr>
              <tr>
                <td>红外:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.hongwai }}
                    type="text"
                    name="hongwai"
                    value={this.props.store.contact.hongwai||""}
                    onChange={this.handleChange}
                  />
                </td>
                <td>热导:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.redao }}
                    type="text"
                    name="redao"
                    onChange={this.handleChange}
                    value={this.props.store.contact.redao||""}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      this.setState({ editRich: !this.state.editRich });
                    }}
                  >
                    备注:
                  </Button>
                </td>
                <td colSpan="3">
                  <RichTextEditor
                    disabled={!this.state.editRich}
                    value={
                      this.state.rich // this.props.store.contact.detail
                    }
                    onChange={this.detailchange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button
              variant="outlined"
              color="primary"
              id="bt_save"
              onClick={this.handleSave}
            >
              保存
            </Button>
            <Button variant="outlined" onClick={this.handleCopy}>
              复制
            </Button>
          </div>
          <div id="id_usepacks" hidden={this.props.store.hiddenPacks}>
            <UsePacks2
              store={this.props.store}
              contact_hetongbh={this.props.store.contact.hetongbh}
              contact_id={this.props.store.contact.id}
            />
          </div>
        </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(ContactEdit2New);
