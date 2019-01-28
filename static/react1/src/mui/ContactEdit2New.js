import React, { Component } from 'react';
import UsePacks2 from './UsePacks2';
import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import update from 'immutability-helper';
import Client from './Client';
// import TextField from '@material-ui/core/TextField';
import Autosuggest from 'react-autosuggest';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import RichTextEditor from 'react-rte';
import { withStyles } from '@material-ui/core/styles';
// var _ = require('lodash');
var moment = require('moment');
// eslint-disable-next-line
var locale = require('moment/locale/zh-cn');
var DateTime = require('react-datetime');
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};
// class MyStatefulEditor extends Component {
//   static propTypes = {
//     onChange: PropTypes.func
//   };

//   state = {
//     value: RichTextEditor.createEmptyValue()
//   }

//   onChange = (value) => {
//     this.setState({value});
//     if (this.props.onChange) {
//       // Send the changes up to the parent component as an HTML string.
//       // This is here to demonstrate using `.toString()` but in a real app it
//       // would be better to avoid generating a string on each change.
//       this.props.onChange(
//         value.toString('html')
//       );
//     }
//   };

//   render () {
//     return (
//       <RichTextEditor
//         value={this.state.value}
//         onChange={this.onChange}
//       />
//     );
//   }
// }

class ContactEdit2New extends Component {
  state = {
    openCollapse: false,
    showModal: false,
    contact: {
      yujifahuo_date: moment(),
      tiaoshi_date: moment(),
    },
    hiddenPacks: true,
    bg: {},
    date_open: false,
    editRich: false,
    rich: RichTextEditor.createEmptyValue(),
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!_.isEqual(this.props.showModal, nextProps.showModal)) {
  //     // console.log(this.props);
  //     // console.log(nextProps);
  //     // console.log("props not eq");
  //     return true;
  //   }
  //   if (!_.isEqual(this.state, nextState)) {
  //     // console.log("state not eq");
  //     return true;
  //   }
  //   return false;
  // }
  componentDidMount = () => {
    // console.log("ContactEdit2New mounted");
  };

  close = () => {
    console.log('close');
    this.setState({ showModal: false });
  };
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    if (!this.props.showModal && nextProps.showModal) {
      this.onShow(nextProps.index);
    } else if (this.props.showModal && !nextProps.showModal) {
      this.onHide();
    }
  }
  onShow = idx => {
    this.open2(idx);
  };
  onHide = () => {};
  open2 = idx => {
    this.setState({ showModal: true });
    this.setState({ bg: {} });
    this.parent = this.props.parent;
    this.index = idx;
    if (this.index == null) {
      this.old = {
        yujifahuo_date: moment().format('YYYY-MM-DD'),
        tiaoshi_date: moment().format('YYYY-MM-DD'),
        addr: '',
        channels: '',
        baoxiang: '',
        hetongbh: '',
        shenhe: '',
        yonghu: '',
        yiqibh: '',
        yiqixinghao: '',
      };
      this.setState({ hiddenPacks: true });
    } else {
      this.old = this.parent.state.contacts[this.index];
      this.setState({ hiddenPacks: false });
    }
    this.old.dianqi = this.old.dianqi || '';
    this.old.jixie = this.old.jixie || '';
    this.old.redao = this.old.redao || '';
    this.old.hongwai = this.old.hongwai || '';
    this.old.channels = this.old.channels || '';
    this.old.detail = this.old.detail || '';
    this.old.addr = this.old.addr || '';
    var val1 = RichTextEditor.createValueFromString(this.old.detail, 'html');
    // console.log(val1);

    this.setState({ rich: val1 });
    this.setState({ contact: this.old });
  };
  // open=()=>{
  //   this.setState({ showModal: true });
  //   this.setState({bg:{}});
  //   this.parent=this.props.parent;
  //   if (this.index==null){
  //     this.old={
  //       yujifahuo_date:moment().format("YYYY-MM-DD"),
  //       tiaoshi_date:moment().format("YYYY-MM-DD"),
  //       addr:"",
  //       channels:"",
  //       baoxiang:"",
  //       hetongbh:"",
  //       shenhe:"",
  //       yonghu:"",
  //       yiqibh:"",
  //       yiqixinghao:""
  //     };
  //   }
  //   else{
  //     this.old=this.parent.state.contacts[this.index];
  //     this.setState({hiddenPacks:false});
  //   }
  //   this.setState({contact:this.old});
  // }
  // handleClear (data) {
  //   console.log("clear");
  //   var contact2={id:"",hetongbh:"",name:"",addr:""};
  //   console.log(contact2);
  //   this.setState({contact:contact2});
  // },
  handleCopy = data => {
    console.log('copy');
    this.index = null;
    var contact2 = update(this.state.contact, { id: { $set: '' } });
    console.log(contact2);
    this.setState({ contact: contact2 });
    this.setState({ hiddenPacks: true });
  };
  handleSave = data => {
    var url = '/rest/Contact';
    var dataSave = this.state.contact;
    dataSave.detail = this.state.rich.toString('html');
    Client.postOrPut(url, dataSave, res => {
      if (res.success) {
        this.setState({ contact: res.data });
        //console.log("after save======================")
        //console.log(this.index);
        this.parent.handleContactChange(this.index, res.data);
        if (this.index) {
          //console.log("true");
        } else {
          //console.log("false");
          this.index = 0;
        }
        console.log(this.index);
        this.old = res.data;
        this.setState({ bg: {} });
        this.setState({ hiddenPacks: false });
      } else {
        alert(res.message);
      }
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
    const contact2 = update(this.state.contact, {
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
    const contact2 = update(this.state.contact, {
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
    const contact2 = update(this.state.contact, { channels: { $set: item } });
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
    const contact2 = update(this.state.contact, {
      yiqixinghao: { $set: item },
    });
    console.log(contact2);
    this.setState({ contact: contact2 });
  };
  handleChange = e => {
    console.log('change');
    console.log(e);
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
    const contact2 = update(this.state.contact, {
      [e.target.name]: { $set: e.target.value },
    });
    console.log(contact2);
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
              color="inherit"
              onClick={this.props.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={this.props.classes.flex}
            >
              编辑仪器信息
            </Typography>
          </Toolbar>
        </AppBar>
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
                    disabled="disabled"
                    value={this.state.contact.id}
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
                    value={this.state.contact.yonghu}
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
                    value={this.state.contact.addr}
                    onChange={this.handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <Autosuggest
                    inputProps={{
                      id: 'channels-autocomplete',
                      style: { backgroundColor: this.state.bg.channels },
                      value: this.state.contact.channels,
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
                      value: this.state.contact.yiqixinghao,
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
                    value={this.state.contact.yiqibh}
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
                    value={this.state.contact.baoxiang}
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
                    value={this.state.contact.shenhe}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>
                  <DateTime
                    ref="datetime1"
                    timeFormat={false}
                    inputProps={{
                      style: { backgroundColor: this.state.bg.yujifahuo_date },
                    }}
                    id="yujifahuo_date"
                    name="yujifahuo_date"
                    value={this.state.contact.yujifahuo_date}
                    onChange={this.yujifahuo_date_change}
                  />
                </td>
                <td>调试时间:</td>
                <td>
                  <DateTime
                    ref="datetime2"
                    timeFormat={false}
                    inputProps={{
                      style: { backgroundColor: this.state.bg.tiaoshi_date },
                    }}
                    name="tiaoshi_date"
                    value={this.state.contact.tiaoshi_date}
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
                    value={this.state.contact.hetongbh}
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
                    disabled="true"
                    defaultValue={this.state.contact.method}
                  />
                  {
                    //<Button className="btn" id="bt_file"><Glyphicon glyph="pencil" />
                    //</Button>
                    //<Button className="btn" id="bt_removefile"><Glyphicon glyph="remove" /></Button>
                  }
                </td>
              </tr>

              <tr>
                <td>电气:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.dianqi }}
                    type="text"
                    name="dianqi"
                    value={this.state.contact.dianqi}
                    onChange={this.handleChange}
                  />
                </td>
                <td>机械:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.jixie }}
                    type="text"
                    name="jixie"
                    value={this.state.contact.jixie}
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
                    value={this.state.contact.hongwai}
                    onChange={this.handleChange}
                  />
                </td>
                <td>热导:</td>
                <td>
                  <input
                    style={{ backgroundColor: this.state.bg.redao }}
                    type="text"
                    name="redao"
                    value={this.state.contact.redao}
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
                      this.state.rich // this.state.contact.detail
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
          <div id="id_usepacks" hidden={this.state.hiddenPacks}>
            <UsePacks2
              contact_hetongbh={this.state.contact.hetongbh}
              contact_id={this.state.contact.id}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(ContactEdit2New);
