import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { observable,action,autorun } from "mobx";//, action, computed
import { observer } from "mobx-react";
import {Table,Modal,DropdownButton,MenuItem} from "react-bootstrap";
import Client from './Client';
import DlgLogin from './DlgLogin';
import DlgDetail from './DlgDetail';
import ContactEdit from './ContactEdit';
import DlgImport from './DlgImport';
import DlgUrl from './DlgUrl';

export class ItemStore {
    url=null;
    data=null;
    @observable showDlgUrl =false;
    @observable showDlgLogin =false;
    @observable showDlgImport=false;
    @observable showDlgEdit=false;
    @observable showDlgDetail=false;
    @observable contactid=null;
    @observable currentIndex=null;
    @observable todos = [];
    @observable start=0;
    @observable total=0;
    @observable showModal=false;
    @observable packitem={};
    @observable bg={};
    @observable search="";
    @observable user="AnonymousUser";
    @observable baoxiang="";
    @observable start_input=1;
    @observable showDlgDetail=false;
    limit=10;
    old={};
    constructor(){
      console.log("constructor");
      autorun(() => console.log(this));
      this.loaddata();
    }
    @action
    show_DlgLogin=()=>{
      console.log("showDlgLogin")
      this.showDlgLogin=true;
    }
    @action setdata(res){
          this.todos=res.data;
          this.total=res.total;
          this.user=res.user;
          if(this.user===undefined){
            this.user="AnonymousUser";
          }
    }
    loaddata=()=>{
      var data={
        search:this.search
        ,start:this.start
        ,limit:this.limit
        ,baoxiang:this.baoxiang};
      Client.contacts(
        data
        ,(res)=>{
          this.setdata(res);
        }
      );
    }
}


class Items extends Component {
  constructor(){
    super();
  }
  handleEdit=(idx)=>{
    this.props.store.showDlgEdit=true;
    this.props.store.currentIndex=idx;
  }
  opendlgurl=(url,parent,idx,data)=>{
    console.log("opendlgurl");
    this.props.store.currentIndex=idx;
    this.props.store.showDlgUrl=true;
    this.props.store.url=url;
    this.props.store.data=data;
  }
  onDetailClick=(contactid)=>{
    this.props.store.showDlgDetail=true;
    this.props.store.contactid=contactid;
  }
  componentDidMount=()=>{
    console.log("mount");
    //this.loaddata();

  }

  componentWillUnmount=()=> {
  }
  loaddata=()=>{
      this.props.store.loaddata();
  }
  handleSearchChange = (e) => {
    this.props.store.search=e.target.value;
  }
  search = (e) => {
    console.log(this.props.store.search);
    this.props.store.start=0;
    this.loaddata();
  };
  handlePrev = (e) => {
    this.props.store.start=this.props.store.start-this.props.store.limit;
    if(this.props.store.start<0) {
      this.props.store.start=0;
    }
    this.loaddata();
  };

  handleNext = (e) => {
    this.props.store.start=this.props.store.start+this.props.store.limit;
    if(this.props.store.start>this.props.store.total-this.props.store.limit)
    { 
        this.props.store.start=this.props.store.total-this.props.store.limit;//total >limit
    }
    if(this.props.store.start<0)
    {
      this.props.store.start=0;
    }
    this.loaddata();
  };
  componentWillReact() {
        console.log("I will re-render, since the todo has changed!")
  }
  onSelectBaoxiang=(e) => {
    console.log(this);

    this.props.store.start=0;
    this.props.store.baoxiang=e;
    this.loaddata();
  }
  jump=()=>{
    this.props.store.start=parseInt(this.props.store.start_input,10)-1;
    if(this.props.store.start>this.props.store.total-this.props.store.limit) 
        this.props.store.start=this.props.store.total-this.props.store.limit;//total >limit
    if(this.props.store.start<0)
    {
      this.props.store.start=0;
    }
    this.loaddata();
  };
  handlePageChange= (e) => {
    this.props.store.start_input=e.target.value;
  };

  handleUserChange = (user) => {
    if (user === "AnonymousUser") {
      this.props.store.logined=false;
    } else {
      this.props.store.logined=true;
    }
    this.props.store.todos=[];
    this.props.store.loaddata();
  };
  onLoginSubmit= (data) => {
    // console.log(data);
    Client.login(data.username, data.password, (res) => {
      if (res.success) {
        this.props.store.logined=true;
        this.props.store.user=data.username
        this.handleUserChange(this.props.store.user);
      }
    });
  };
  handleContactChange = (idx,contact) => {
    this.props.store.todos[idx]=contact;
  };
  handleLogout = () => {
    console.log("logout");
    Client.logout((data) => {
      console.log("logout" + data);
      this.props.store.user= "AnonymousUser";
      this.props.store.total=0;
      this.props.store.start=0;
      this.handleUserChange(this.props.store.user);
    });
  };

  mapfunc=(contact, idx) => {
      if (!contact.image || contact.image==="")
        return (      <tr key={idx} >
        <td>{contact.id}</td>
        
        <td>
          {contact.yonghu}
        </td>
        <td>{contact.addr}</td>
        <td>{contact.hetongbh}</td>
        <td>
          <a onClick={()=>this.handleEdit(idx)}>{contact.yiqibh}</a>
          <DropdownButton title="" id="id_dropdown3">
            <MenuItem onSelect={() => this.onDetailClick(contact.id)}>详细</MenuItem>
            <MenuItem onSelect={()=>this.opendlgurl("/rest/updateMethod",this,idx,{id:contact.id})}>更新方法</MenuItem>
            <MenuItem onSelect={()=>this.opendlgwait(contact.id)}>全部文件</MenuItem>
            <MenuItem onSelect={()=>this.opendlgcheck(contact.id,contact.yiqibh)}>核对备料计划</MenuItem>
            <MenuItem onSelect={()=>this.opendlgfolder(contact.id)}>资料文件夹</MenuItem>
            
          </DropdownButton>
        </td>
        <td>{contact.yiqixinghao}</td><td>{contact.channels}</td>
        <td>{contact.baoxiang}</td>
        <td>{contact.yujifahuo_date}</td>
        
        <td>{contact.method}</td>
       </tr>);
  }
  render=()=>{
    console.log(this);

    var hasprev=true;
    var hasnext=true;
    let prev;
    let next;
    //console.log(this.props.store);
    if(this.props.store.start===0){
      hasprev=false;
    }

    if(this.props.store.start+this.props.store.limit>=this.props.store.total){

      hasnext=false;
    }
    if (hasprev){
      prev=(<a onClick={this.handlePrev}>前一页</a>);
    }
    else{
      prev=null;
    }
    if(hasnext){
      next=(<a onClick={this.handleNext}>后一页</a>);
    }
    else{
      next=null;
    }
    //console.log(this.props.store);
    const itemRows = this.props.store.todos.map(this.mapfunc);
    return (
  <div  id="todoapp" className="table-responsive">
    <div style={{display:"flex",alignItems:"center"}}>
       <DropdownButton title={this.props.store.user} id="id_dropdown1">
          <li hidden={this.props.store.user!=="AnonymousUser"}>
          <a onClick={()=>{
            this.props.store.show_DlgLogin();
          }}>登录</a>
          </li>
          <li  hidden={this.props.store.user==="AnonymousUser"} >
            <a onClick={this.handleLogout}>注销</a>
          </li>
       </DropdownButton>
       <div className="input-group" style={{width:"250px"}}>
     
          <input type="text" className="form-control" value={this.props.store.search}  placeholder="" onChange={this.handleSearchChange} />
           <span className="input-group-btn">
            <button className="btn btn-info" type="button" onClick={this.search}>搜索<span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
          </span>
        </div>
      
       <button  style={{margin:"0px 10px 0px 10px"}}  className="btn btn-primary" onClick={()=>this.handleEdit(null)}>新仪器</button>
       <button className="btn btn-info" onClick={()=>{this.props.store.showDlgImport=true;}}>导入标样</button>
       <button  style={{margin:"0px 10px 0px 10px",display:"none"}}  className="btn btn-primary" onClick={this.openDlgImportHT}>导入合同</button>
    </div>
    <table className="table-condensed table-bordered"><thead><tr><th>ID</th>
        <th><span onClick={this.handleClickFilter}>客户单位</span>
        </th>
        <th>客户地址</th><th>合同编号</th>
        <th><span onClick={this.handleClickFilter}>仪器编号</span></th>
        <th>仪器型号</th><th>通道配置</th>
        <th>包箱<DropdownButton title="" id="id_dropdown2">
              <MenuItem onSelect={() => this.onSelectBaoxiang("")}>*</MenuItem>
              <MenuItem onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
              <MenuItem onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
              <MenuItem onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
            </DropdownButton>
        </th>
        <th>入库时间</th><th>方法</th></tr></thead><tbody id="contact-list">{itemRows}</tbody>
    </table>
    {prev}
    <label id="page">{this.props.store.start+1}../{this.props.store.total}</label>
    {next}
    <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.props.store.start_input} />
    <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
    <div style={{minHeight:"200px"}}></div>
    <DlgLogin showModal={this.props.store.showDlgLogin}
     onLoginSubmit={this.onLoginSubmit}
     handleClose={()=>{
        this.props.store.showDlgLogin =false;
    }}/>
    <DlgDetail  contactid={this.props.store.contactid} showModal={this.props.store.showDlgDetail} 
      handleClose={()=>{
        this.props.store.showDlgDetail=false;
    }} />
    <ContactEdit showModal={this.props.store.showDlgEdit} 
      handleClose={()=>{
        this.props.store.showDlgEdit=false;
      }}
      parent={this}  store={this.props.store} index={this.props.store.currentIndex} title="编辑"  />
    <DlgImport showModal={this.props.store.showDlgImport} handleClose={()=>{
      this.props.store.showDlgImport=false;
    }} />
    <DlgUrl showModal={this.props.store.showDlgUrl}
      url={this.props.store.url}
      data={this.props.store.data}
      callback={this.handleContactChange}
      handleClose={()=>{
      this.props.store.showDlgUrl=false;
    }} />
  </div>
    );
  }
};
export default observer(Items);