import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Client from './Client';
import UsePacks from './UsePacks';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import update from 'immutability-helper';
let DateTimeFormat;
if (areIntlLocalesSupported( ['zh-Hans'])) {
  var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  DateTimeFormat = global.Intl.DateTimeFormat;
  console.log(new DateTimeFormat('zh-Hans').format(date));
} else {
  console.log("intl");
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh-Hans');
}
console.log(DateTimeFormat());
function toDateStr(d){
  var m=d.getMonth()+1;
  return d.getFullYear()+"-"+m+"-"+d.getDate()
}
export default class ContactEdit extends React.Component {
  state = {
    open: false,
    shenhe:null,
    yiqixinghao:null,
    hetongbh:null,
    id:null,
    baoxiang:null,
    yonghu:null,
    tiaoshi_date:null,
    channels:null,
    yiqibh:null,
    addr:null,
    yujifahuo_date:null,

    yiqixinghao_items:["CS-2800","ON-3000"],
    channels_items:["2C+1S","2O"],
    bg:{},
  };
  yiqixinghao_change=(value)=>{
  };
  yiqixinghao_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({yiqixinghao:data});
  }
  channels_change=(value)=>{
  };
  channels_select=(data) => {
      console.log("selected");
      console.log(data);
      //this.addrow(data.value);
      this.setState({channels:data});
  }
  setdata=(contact)=>{
    console.log(contact);
    var arr2 = contact.yujifahuo_date.split("-");
    var date2 = new Date(arr2[0],parseInt(arr2[1],10)-1,arr2[2]); 
    arr2 = contact.tiaoshi_date.split("-");
    var date1 = new Date(arr2[0],parseInt(arr2[1],10)-1,arr2[2]); 
    this.old=contact;
    this.setState({
        open:true,
        yujifahuo_date:date2,
        yonghu:contact.yonghu,
        yiqixinghao:contact.yiqixinghao,
        addr:contact.addr,
        hetongbh:contact.hetongbh,
        shenhe:contact.shenhe,
        tiaoshi_date:date1,
        id:contact.id,
        yiqibh:contact.yiqibh,
        baoxiang:contact.baoxiang,
        channels:contact.channels,
    })
  }
  handleOpen = () => {
    console.log("open");
    this.contact_idx=this.props.contact;
    this.parent=this.props.parent;
    var contact=this.parent.state.contacts[this.contact_idx];
    if (contact==null){
        contact={}
    }
    this.setdata(contact);
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleChange = (e) => {
    console.log("change");
    // e.target.inputStyle={
    //   width: '50%',
    //   margin: '0 auto',
    //   border: '2px solid #FF9800',
    //   backgroundColor: '#ffd699',
    // };
    console.log(e.target.value);
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2}); 
    }
    switch(e.target.name)
    {
        case "baoxiang":
            this.setState({baoxiang:e.target.value});
            break;
        case "yonghu":
            this.setState({yonghu:e.target.value});
            break;
        case "addr":
            this.setState({addr:e.target.value});
            break;
        case "channels":
            this.setState({channels:e.target.value});
            break;
        case "yiqixinghao":
            this.setState({yiqixinghao:e.target.value});
            break;
        case "yiqibh":
            this.setState({yiqibh:e.target.value});
            break;
        case "shenhe":
            this.setState({shenhe:e.target.value});
            break;
        case "yujifahuo_date":
            this.setState({yujifahuo_date:e.target.value});
            break;
        case "tiaoshi_date":
            this.setState({tiaoshi_date:e.target.value});
            break;
        case "hetongbh":
            this.setState({hetongbh:e.target.value});
            break;
        default:
            break;
    }
  };
  handleSave= (data) => {
    var url="/rest/Contact";
    let newdate;
    let newdate2
    newdate=toDateStr(this.state.yujifahuo_date);
    newdate2=toDateStr(this.state.tiaoshi_date);
    var data1=update(this.state,{tiaoshi_date:{$set:newdate2},yujifahuo_date:{$set:newdate}});

    Client.postOrPut(url,data1,(res) => {
        this.setdata(res.data);
        this.setState({bg:{}});
        this.parent.handleContactChange(this.contact_idx,res.data);
    });
  };
  handleClear= () => {
    console.log("clear");
    this.setState({
        yujifahuo_date:"",
        yonghu:"",
        yiqixinghao:"",
        addr:"",
        hetongbh:"",
        shenhe:"",
        tiaoshi_date:"",
        id:"",
        yiqibh:"",
        baoxiang:"",
        channels:"",
    })
  };
  handleCopy= () => {
    console.log("clear");
    this.setState({
        id:"",
    })
  };
  tiaoshi_date_change=(e,d)=>{
    this.setState({tiaoshi_date:d});
  }
  yujifahuo_date_change=(e,d)=>{
    this.setState({yujifahuo_date:d});
  }

  render() {
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    //var m1 = new Date(this.state.yujifahuo_date.replace(/-/,"/"));
    //var m2 = new Date(this.state.tiaoshi_date.replace(/-/,"/"));
    return (
      <div>
        <RaisedButton label={this.props.title} onTouchTap={this.handleOpen} />
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
        >
            <table>
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <TextField type="text" id="id" name="id"  disabled={true}    value={this.state.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <TextField type="text" id="yonghu" name="yonghu" value={this.state.yonghu}  
                    onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <TextField type="text" id="addr" name="addr" value={this.state.addr}  onChange={this.handleChange} /> 
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                    <AutoComplete name="channels"
                      openOnFocus={true}
                      searchText={this.state.channels}
                      onUpdateInput={this.channels_change}
                      dataSource={this.state.channels_items}
                      onNewRequest={this.channels_select}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                    <AutoComplete name="yiqixinghao"
                      openOnFocus={true}
                      searchText={this.state.yiqixinghao}
                      onUpdateInput={this.yiqixinghao_change}
                      dataSource={this.state.yiqixinghao_items}
                      onNewRequest={this.yiqixinghao_select}
                    />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <TextField type="text" 
                    id="yiqibh" name="yiqibh" 
                    value={this.state.yiqibh} onChange={this.handleChange} 
                    inputStyle={{
                      backgroundColor: this.state.bg.yiqibh,
                    }}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <TextField type="text" id="baoxiang" name="baoxiang" value={this.state.baoxiang}  
                    onChange={this.handleChange} 
                    inputStyle={{
                      backgroundColor: this.state.bg.baoxiang,
                    }}
                    />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <TextField  id="shenhe" 
                    name="shenhe" value={this.state.shenhe} onChange={this.handleChange}  
                    inputStyle={{
                      backgroundColor: this.state.bg.shenhe,
                    }}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <DatePicker  DateTimeFormat={DateTimeFormat} 
                    locale="zh-Hans" hintText="yujifahuo_date" 
                    onChange={this.yujifahuo_date_change} value={this.state.yujifahuo_date}
                    />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                    <DatePicker   
                    DateTimeFormat={DateTimeFormat} locale="zh-Hans" hintText="tiaoshi_date" 
                    onChange={this.tiaoshi_date_change} 
                    value={this.state.tiaoshi_date}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <TextField type="text" id="hetongbh" name="hetongbh" value={this.state.hetongbh} onChange={this.handleChange}  />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <TextField type="text" id="method" name="method"   disabled={true} value={this.state.method} />
                </td>
            </tr>        
            </tbody>
            </table>
           <div> 
           <RaisedButton onTouchTap={this.handleSave} >保存</RaisedButton> 
           <RaisedButton  onTouchTap={this.handleClear} >清除</RaisedButton> 
           <RaisedButton onTouchTap={this.handleCopy} >复制</RaisedButton>
           <UsePacks contact_id={this.state.id}/>
           </div>
        </Dialog>
        </div>
    );
  }
}