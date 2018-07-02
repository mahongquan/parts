import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { observable } from "mobx";//, action, computed
import { observer } from "mobx-react";
import {Table,Modal,DropdownButton,MenuItem} from "react-bootstrap";
import Client from './Client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export class ItemStore {
    @observable todos = [];
    @observable start=0;
    @observable total=0;
    @observable showModal=false;
    @observable packitem={};
    @observable bg={};
    @observable search="";
    @observable baoxiang="";
    @observable start_input=1;
    limit=10;
    old={};
    constructor(){
      this.loaddata({
        search:this.search
        ,start:this.start
        ,limit:this.limit
        ,baoxiang:this.baoxiang});
    }
    loaddata=(data)=>{
        console.log(data);
            Client.contacts(
              data
              ,(res)=>{
                this.todos=res.data;
                this.total=res.total;
                this.start=data.start;
              }
            );
    }
    handleItemSave=(data)=>{
      var url="/rest/Contact";
      Client.postOrPut(url,this.packitem,(res) => {
        console.log(res);
          this.packitem=res.data;
          this.old=res.data;
          this.showModal=false;
      });
    }
    handleItemChange=(e)=>{
      console.log("change");
      if(this.old[e.target.name]===e.target.value)
      {
        this.bg[e.target.name]="#ffffff"
      }
      else{
        this.bg[e.target.name]="#8888ff"
      }
      this.packitem[e.target.name]=e.target.value;
    }
}
@observer
export class ItemEdit extends Component{
  close=()=>{
    this.props.store.showModal=false;
  }
  
  handleSave=(data)=>{
    this.props.store.handleItemSave(data);
  }
  handleChange=(e)=>{
    this.props.store.handleItemChange(e);
  }
  render=()=>{
    console.log("render==========");
    return (
        <Modal show={this.props.store.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>编辑备件信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody> 
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.props.store.packitem.id} />
                </td>
            </tr><tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.props.store.bg.name}}  type="text" id="name" name="name" value={this.props.store.packitem.name} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.props.store.bg.guige}} type="text"  name="guige" 
                    value={this.props.store.packitem.guige}  onChange={this.handleChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.props.store.bg.bh}} type="text" id="bh" name="bh" value={this.props.store.packitem.bh}  onChange={this.handleChange} />
                </td>
            </tr>
           
            <tr>
                <td>
                    <label>单位:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.props.store.bg.danwei}}
                    id="danwei" name="danwei"  value={this.props.store.packitem.danwei} onChange={this.handleChange} />
                </td>
            </tr> 
            </tbody>
            </table>
       <div> 
       <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
       </div>
                </Modal.Body>
        </Modal>
    );
  }
}
@observer
export class Items extends Component {
  componentDidMount=()=>{
    console.log("mount");
    
    //this.loaddata();

  }

  componentWillUnmount=()=> {
  }
  loaddata=()=>{
      this.props.store.loaddata({
           search:this.props.store.search,
           start:this.props.store.start,
           limit:this.props.store.limit,
           baoxiang:this.props.store.baoxiang,
      });
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
  handleEdit=(idx)=>{
    //myredux.ItemActionCreators.showEdit(idx);
    this.props.store.showModal=true;
    this.props.store.packitem=this.props.store.todos[idx];
    this.props.store.old=this.props.store.packitem;
    this.props.store.bg={};
  }
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
          <div>
              <input type="text" value={this.props.store.search}  placeholder="" onChange={this.handleSearchChange} />
              <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</button>
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
          </div>
    );
  }
};
// const store = new ItemStore();
// ReactDOM.render(
//     <div>
//       <Items store={store} />
//       <ItemEdit store={store} />
//     </div>
//     ,document.getElementById('root')
//   );