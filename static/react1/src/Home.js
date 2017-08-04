import React, { Component } from 'react';
import {MenuItem,DropdownButton} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';
import ExampleModal from './ExampleModal';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import DlgFolder from './DlgFolder';
import DlgFolder2 from './DlgFolder2';
import DlgImport from './DlgImport';
import DlgCheck from './DlgCheck'
import DlgUrl from './DlgUrl';
var host="";
class Home extends Component {
  mystate = {
    start:0,
    limit:10,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
    contacts: [],
    user: "AnonymousUser",
    start:0,
    total:0,
    search:"",
    start_input:1,
    currentIndex:null,
  }
  componentDidMount=() => {
    console.log("Home mount");
    Client.contacts(
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
        baoxiang:this.mystate.baoxiang,
      }, 
      (contacts) => {
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts.total,
          start:this.mystate.start
        });
        this.mystate.total=contacts.total;
    });
  };
  handleContactChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.contacts,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({contacts:contacts2});
  };
  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.setState({
        logined: false
      });
    } else {
      this.setState({
        logined: true
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.componentDidMount();
  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.setState({
        logined: false,
        user: "AnonymousUser",
        total:0,
        start:0,
      });
      this.handleUserChange(this.state.user);
    });
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
    //this.componentDidMount();
  };
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    //this.setState({start:start});
    this.componentDidMount();
  };
  search = (e) => {
    this.mystate.start=0;
    this.componentDidMount();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.componentDidMount();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };

  onDetailClick=(contactid)=>{
    console.log(contactid);
    window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
  }
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.componentDidMount();
  };
  onSelectBaoxiang=(e) => {
    this.mystate.baoxiang=e;
    this.componentDidMount();
    console.log(e);
  }
  auto_change=(event, value)=>{
    console.log("auto_change");
    if (value.length>1)
    {
      this.setState({ auto_value:value, auto_loading: true });
      Client.get("/rest/Pack",{search:value} ,(items) => {
          this.setState({ auto_items: items.data, auto_loading: false })
      });
    }
    else{
      this.setState({ auto_value:value, auto_loading: false });
    };
  }
  onLoginSubmit= (data) => {
    console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  handleEdit=(idx)=>{
    //this.setState({currentIndex:idx});
    this.refs.contactedit.open2(idx);
    // router.push({
    //   pathname: '/users/12',
    //   query: { modal: true },
    //   state: { fromDashboard: true }
    // })
  }
  render() {
    const contactRows = this.state.contacts.map((contact, idx) => (
      <tr key={idx} >
        <td>{contact.id}</td>
        <td>{contact.yonghu}</td>
        <td>{contact.addr}</td>
        <td>{contact.channels}</td>
        <td>{contact.yiqixinghao}</td>
        <td>
          <a onClick={()=>this.handleEdit(idx)}>{contact.yiqibh}</a>
        </td>
        <td>{contact.baoxiang}</td>
        <td>{contact.shenhe}</td>
        <td>{contact.yujifahuo_date}</td>
        <td>{contact.tiaoshi_date}</td>
        <td>{contact.hetongbh}</td>
        <td>{contact.method}</td>
        <td><a className="contact_detail" data={contact.id} onClick={() => this.onDetailClick(contact.id)}>详细</a>
         <DlgUrl url="/rest/updateMethod" parent={this} index={idx} data={{id:contact.id}} title="更新方法" />
         <DlgWait contact_id={contact.id} title="全部文件" />
         <DlgCheck contact_id={contact.id} title="核对备料计划" />
        <DlgFolder contact_id={contact.id} title="资料文件夹" />
        <DlgFolder2 contact_id={contact.id} initpath={"仪器资料/"+contact.yiqibh} title="资料文件夹2" />
        </td>
      </tr>
    ));
    return (
    <div id="todoapp" className="table-responsive">
    <ContactEdit2New ref="contactedit" parent={this}   index={this.state.currentIndex} title="编辑"  />
    <table>
    <tbody>
    <tr>
   <td>
     <DropdownButton title={this.state.user} id="id_dropdown1">
        <li hidden={this.state.user!=="AnonymousUser"}>
          <ExampleModal onLoginSubmit={this.onLoginSubmit} title="登录" />
        </li>
        <li  hidden={this.state.user==="AnonymousUser"} >
          <a onClick={this.handleLogout}>注销</a>
        </li>
     </DropdownButton>
  </td>
  <td>
        <input type="text" value={this.state.search}  placeholder="合同 or 仪器编号" onChange={this.handleSearchChange} />
        <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
  </td>
  <td>
       <a onClick={()=>this.handleEdit(null)}>新仪器</a>
  </td>
   <td>
        <DlgImport/>
  </td>
   <td>
    <DropdownButton title="过滤" id="id_dropdown2">
      <MenuItem onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("")}>*</MenuItem>
    </DropdownButton>
  </td>
  </tr>
  </tbody>
 </table>
<table className="table-bordered"><thead><tr><th>ID</th><th>用户单位</th><th>客户地址</th><th>通道配置</th><th>仪器型号</th><th>仪器编号</th><th>包箱</th><th>审核</th>
<th>入库时间</th><th>调试时间</th><th>合同编号</th><th>方法</th><th>操作</th></tr></thead><tbody id="contact-list">{contactRows}</tbody>
</table>
      <a onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}/{this.state.total}</label>
      <a onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
  </div>
    );
  }
}
export default Home;
