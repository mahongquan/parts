import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MyTextField from './MyTextField';
import Client from './Client';
import UsePacks from './UsePacks';
export default class DialogEdit extends React.Component {
  state = {
    open: false,
    contact: {},
  };
  // componentDidMount=()=> {
  //   console.log("mount");
  //   console.log(this.props.contact);
  //   this.setState({contact:this.props.contact});
  // };
  handleOpen = () => {
    console.log('open');
    var contact = this.props.contact;
    if (contact == null) {
      contact = {};
    }
    this.setState({ open: true, contact: contact });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = e => {
    console.log('change');
    // e.target.inputStyle={
    //   width: '50%',
    //   margin: '0 auto',
    //   border: '2px solid #FF9800',
    //   backgroundColor: '#ffd699',
    // };
    console.log(e.target.value);
    //e.target.style.backgroundColor="rgba(0x88,0x88,0xff,0)";
    //var contact1={};
    switch (e.target.name) {
      case 'baoxiang':
        this.state.contact.baoxiang = e.target.value;
        break;
      case 'yonghu':
        this.state.contact.yonghu = e.target.value;
        break;
      case 'addr':
        this.state.contact.addr = e.target.value;
        break;
      case 'channels':
        this.contact.channels = e.target.value;
        break;
      case 'yiqixinghao':
        this.contact.yiqixinghao = e.target.value;
        break;
      case 'yiqibh':
        this.contact.yiqibh = e.target.value;
        break;
      case 'shenhe':
        this.contact.shenhe = e.target.value;
        break;
      case 'yujifahuo_date':
        this.contact.yujifahuo_date = e.target.value;
        break;
      case 'tiaoshi_date':
        this.contact.tiaoshi_date = e.target.value;
        break;
      case 'hetongbh':
        this.contact.hetongbh = e.target.value;
        break;
      default:
        break;
    }
  };
  onLoginSubmit = data => {
    this.props.onLoginSubmit(data);
  };
  handleSave = data => {
    var url = '/rest/Contact';
    Client.postOrPut(url, this.state.contact, res => {
      console.log(res);
    });
  };
  render() {
    var contact = this.state.contact;
    //console.log(contact);
    return (
      <div>
        <RaisedButton label={this.props.title} onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <table id="table_TextField" className="table-condensed">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>
                  <TextField
                    type="text"
                    id="id"
                    name="id"
                    readOnly={true}
                    disabled={true}
                    value={contact.id}
                  />
                </td>
                <td>
                  <label>用户单位:</label>
                </td>
                <td>
                  <MyTextField
                    type="text"
                    id="yonghu"
                    name="yonghu"
                    value={contact.yonghu}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>客户地址:</td>
                <td>
                  <MyTextField
                    type="text"
                    id="addr"
                    name="addr"
                    value={contact.addr}
                    onChange={this.handleChange}
                  />
                </td>
                <td>通道配置:</td>
                <td>
                  <MyTextField
                    type="text"
                    id="channels"
                    name="channels"
                    value={contact.channels}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>仪器型号:</label>
                </td>
                <td>
                  <MyTextField
                    type="text"
                    id="yiqixinghao"
                    name="yiqixinghao"
                    value={contact.yiqixinghao}
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <label>仪器编号:</label>
                </td>
                <td>
                  <MyTextField
                    type="text"
                    id="yiqibh"
                    name="yiqibh"
                    value={contact.yiqibh}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>包箱:</label>
                </td>
                <td>
                  <MyTextField
                    type="text"
                    id="baoxiang"
                    name="baoxiang"
                    value={contact.baoxiang}
                    onChange={this.handleChange}
                    style={{
                      backgroundColor: this.state.bxbg,
                    }}
                  />
                </td>
                <td>审核:</td>
                <td>
                  <MyTextField
                    type="text"
                    id="shenhe"
                    name="shenhe"
                    value={contact.shenhe}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>入库时间:</label>
                </td>
                <td>
                  <MyTextField
                    type="text"
                    className="mydate"
                    id="yujifahuo_date"
                    name="yujifahuo_date"
                    value={contact.yujifahuo_date}
                    onChange={this.handleChange}
                  />
                </td>
                <td>调试时间:</td>
                <td>
                  <MyTextField
                    type="text"
                    className="mydate"
                    id="tiaoshi_date"
                    name="tiaoshi_date"
                    value={contact.tiaoshi_date}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>合同编号:</label>
                </td>
                <td>
                  <TextField
                    type="text"
                    id="hetongbh"
                    name="hetongbh"
                    value={contact.hetongbh}
                    onChange={this.handleChange}
                  />
                </td>
                <td>方法:</td>
                <td>
                  <TextField
                    type="text"
                    id="method"
                    name="method"
                    readOnly={true}
                    disabled={true}
                    value={contact.method}
                  />
                  <RaisedButton>选择文件</RaisedButton>
                  <RaisedButton>清除</RaisedButton>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            　
            <thead>
              　　
              <tr>
                　　　<td>ID</td>
                <td>包名称</td>
                <td hidden="true">合同</td>
                <td hidden="true">包</td>
                <td hidden="true">合同号</td>
                <td>操作</td>
                　　
              </tr>
              　
            </thead>
            <tbody id="usepack-list" />
          </table>
          <div>
            <RaisedButton onTouchTap={this.handleSave}>保存</RaisedButton>
            <RaisedButton onTouchTap={this.handleClear}>清除</RaisedButton>
            <RaisedButton onTouchTap={this.handleCopy}>复制</RaisedButton>
          </div>
        </Dialog>
        <UsePacks />
      </div>
    );
  }
}
