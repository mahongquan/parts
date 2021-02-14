import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
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
// import Datetime from 'react-datetime';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
var _ = require('lodash');
var moment = require('moment');
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
// class ContactEdit2New extends Component {
function ContactEdit2New(props) {
  const dispatch = useDispatch();
  var hiddenPacks = useSelector((state) => state.parts.hiddenPacks);
  var contact = useSelector((state) => state.parts.contact);
  var bg = useSelector((state) => state.parts.bg);
  const [state, setState] = React.useState({
    editRich: false,
    rich: RichTextEditor.createEmptyValue(),
  });
  // state = {
  //   openCollapse: false,
  //   showModal: false,
  //   contact: {
  //     yujifahuo_date: moment(),
  //     tiaoshi_date: moment(),
  //   },
  //   hiddenPacks: true,
  //   bg: {},
  //   date_open: false,
  //   editRich: false,
  //   rich: RichTextEditor.createEmptyValue(),
  // };

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   //console.log(nextProps)
  //   if (!props.showModal && nextProps.showModal) {
  //     onShow(nextProps.index);
  //   } else if (props.showModal && !nextProps.showModal) {
  //     onHide();
  //   }
  // }
  // onShow = idx => {
  //   open2(idx);
  // };
  // onHide = () => {};
  // open2 = idx => {
  //   setState({ bg: {} });
  //   index = idx;
  //   if (index == null) {
  //     old = {
  //       yujifahuo_date: moment().format('YYYY-MM-DD'),
  //       tiaoshi_date: moment().format('YYYY-MM-DD'),
  //       addr: '',
  //       channels: '',
  //       baoxiang: '',
  //       hetongbh: '',
  //       shenhe: '',
  //       yonghu: '',
  //       yiqibh: '',
  //       yiqixinghao: '',
  //     };
  //     setState({ hiddenPacks: true });
  //   } else {
  //     old = _.clone(props.store.contacts[index]);
  //     setState({ hiddenPacks: false });
  //   }
  //   old.dianqi = old.dianqi || '';
  //   old.jixie = old.jixie || '';
  //   old.redao = old.redao || '';
  //   old.hongwai = old.hongwai || '';
  //   old.channels = old.channels || '';
  //   old.detail = old.detail || '';
  //   old.addr = old.addr || '';
  //   var val1 = RichTextEditor.createValueFromString(old.detail, 'html');
  //   setState({ rich: val1 });
  //   setState({ contact: old });
  // };
  const handleCopy = (data) => {
    console.log('copy');
    index = null;
    var contact2 = update(state.contact, { id: { $set: '' } });
    console.log(contact2);
    setState({ contact: contact2 });
    props.store.dispatch({ type: types.hiddenPacks });
    // setState({ hiddenPacks: true });
  };
  const handleSave = () => {
    let dataSave = state.contact;
    dataSave.detail = state.rich.toString('html');
    props.store.actions.saveContact(dataSave, props.index, (res) => {
      open2(0);
    });
  };
  const tiaoshi_date_change = (value) => {
    //state.yujifahuo_date=value;
    var e_target_name = 'tiaoshi_date';
    console.log(old[e_target_name]);
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM-DD');
    }
    console.log(t);
    if (old[e_target_name] === t) {
      const bg2 = update(state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      setState({ bg: bg2 });
    } else {
      //console.log("not equal")
      //state.bg[e_target_name]="#8888ff";
      const bg2 = update(state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      setState({ bg: bg2 });
    }
    const contact2 = update(state.contact, {
      [e_target_name]: { $set: t },
    });
    console.log(contact2);
    setState({ contact: contact2 });
  };

  const yujifahuo_date_change = (value) => {
    //state.yujifahuo_date=value;
    var e_target_name = 'yujifahuo_date';
    console.log(old[e_target_name]);
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM-DD');
    }
    console.log(t);
    if (old[e_target_name] === t) {
      const bg2 = update(state.bg, {
        [e_target_name]: { $set: '#ffffff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      setState({ bg: bg2 });
    } else {
      const bg2 = update(state.bg, {
        [e_target_name]: { $set: '#8888ff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      setState({ bg: bg2 });
    }
    const contact2 = update(state.contact, {
      [e_target_name]: { $set: t },
    });
    console.log(contact2);
    setState({ contact: contact2 });
  };
  const channels_change = (event, { newValue }) => {
    change1(newValue);
  };
  const channels_change_fetch = () => {};
  const channels_select = (event, data) => {
    change1(data.suggestion);
  };
  const change1 = (item) => {
    console.log('selected');
    console.log(item);
    if (old.channels === item) {
      const bg2 = update(state.bg, { channels: { $set: '#ffffff' } });
      setState({ bg: bg2 });
    } else {
      const bg2 = update(state.bg, { channels: { $set: '#8888ff' } });
      setState({ bg: bg2 });
    }
    const contact2 = update(state.contact, { channels: { $set: item } });
    console.log(contact2);
    setState({ contact: contact2 });
  };
  const yiqixinghao_change = (event, { newValue }) => {
    change2(newValue);
  };
  const yiqixinghao_select = (event, data) => {
    change2(data.suggestion);
  };
  const change2 = (item) => {
    console.log('selected');
    console.log(item);
    if (old.yiqixinghao === item) {
      const bg2 = update(state.bg, { yiqixinghao: { $set: '#ffffff' } });
      setState({ bg: bg2 });
    } else {
      const bg2 = update(state.bg, { yiqixinghao: { $set: '#8888ff' } });
      setState({ bg: bg2 });
    }
    const contact2 = update(state.contact, {
      yiqixinghao: { $set: item },
    });
    // console.log(contact2);
    setState({ contact: contact2 });
  };
  const handleChange = (e) => {
    // console.log('change');
    // console.log(e);
    // console.log(e.target.value);
    // console.log(e.target.name);
    if (old[e.target.name] === e.target.value) {
      const bg2 = update(state.bg, {
        [e.target.name]: { $set: '#ffffff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      setState({ bg: bg2 });
    } else {
      const bg2 = update(state.bg, {
        [e.target.name]: { $set: '#8888ff' },
      });
      //state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      setState({ bg: bg2 });
    }
    const contact2 = update(state.contact, {
      [e.target.name]: { $set: e.target.value },
    });
    // console.log(contact2);
    setState({ contact: contact2 });
  };
  const matchStateToTerm = (state, value) => {
    return state.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  };
  const detailchange = (value) => {
    console.log(value);
    setState({ rich: value });
  };
  return (
    <Dialog open={props.showModal} onClose={props.handleClose} fullScreen>
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton onClick={props.handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={props.classes.flex}>
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
                    value={contact.id}
                  />
                </td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.yonghu }}
                    type="text"
                    id="yonghu"
                    name="yonghu"
                    value={contact.yonghu}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.addr }}
                    type="text"
                    id="addr"
                    name="addr"
                    value={contact.addr}
                    onChange={handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'channels-autocomplete',
                      style: { backgroundColor: bg.channels },
                      value: contact.channels,
                      onChange: channels_change,
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
                    getSuggestionValue={(item) => item}
                    onSuggestionSelected={channels_select}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    renderSuggestion={(item) => <span>{item}</span>}
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
                      style: { backgroundColor: bg.yiqixinghao },
                      value: contact.yiqixinghao,
                      onChange: yiqixinghao_change,
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
                    getSuggestionValue={(item) => item}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    onSuggestionSelected={yiqixinghao_select}
                    renderSuggestion={(item) => <span>{item}</span>}
                  />
                </td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.yiqibh }}
                    type="text"
                    id="yiqibh"
                    name="yiqibh"
                    value={contact.yiqibh}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.baoxiang }}
                    type="text"
                    id="baoxiang"
                    name="baoxiang"
                    value={contact.baoxiang}
                    onChange={handleChange}
                  />
                </td>
                <td>审核:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.shenhe }}
                    type="text"
                    id="shenhe"
                    name="shenhe"
                    value={contact.shenhe}
                    onChange={handleChange}
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
                    value={contact.yujifahuo_date}
                    onChange={yujifahuo_date_change}
                    style={{ backgroundColor: bg.yujifahuo_date }}
                  />
                </td>
                <td>调试时间:</td>
                <td>
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ backgroundColor: bg.tiaoshi_date }}
                    value={contact.tiaoshi_date}
                    onChange={tiaoshi_date_change}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: bg.hetongbh }}
                    type="text"
                    id="hetongbh"
                    name="hetongbh"
                    value={contact.hetongbh}
                    onChange={handleChange}
                  />
                </td>
                <td>方法:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.method }}
                    type="text"
                    id="method"
                    name="method"
                    disabled={true}
                    value={contact.method}
                  />
                </td>
              </tr>

              <tr>
                <td>电气:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.dianqi }}
                    type="text"
                    name="dianqi"
                    value={contact.dianqi}
                    onChange={handleChange}
                  />
                </td>
                <td>机械:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.jixie }}
                    type="text"
                    name="jixie"
                    onChange={handleChange}
                    value={contact.jixie}
                  />
                </td>
              </tr>
              <tr>
                <td>红外:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.hongwai }}
                    type="text"
                    name="hongwai"
                    value={contact.hongwai}
                    onChange={handleChange}
                  />
                </td>
                <td>热导:</td>
                <td>
                  <input
                    style={{ backgroundColor: bg.redao }}
                    type="text"
                    name="redao"
                    onChange={handleChange}
                    value={contact.redao}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setState({ editRich: !state.editRich });
                    }}
                  >
                    备注:
                  </Button>
                </td>
                <td colSpan="3">
                  <RichTextEditor
                    disabled={!state.editRich}
                    value={
                      state.rich // state.contact.detail
                    }
                    onChange={detailchange}
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
              onClick={handleSave}
            >
              保存
            </Button>
            <Button variant="outlined" onClick={handleCopy}>
              复制
            </Button>
          </div>
          <div id="id_usepacks" hidden={hiddenPacks}>
            <UsePacks2
              contact_hetongbh={contact.hetongbh}
              contact_id={contact.id}
            />
          </div>
        </MuiPickersUtilsProvider>
      </DialogContent>
    </Dialog>
  );
}
export default withStyles(styles)(ContactEdit2New);
