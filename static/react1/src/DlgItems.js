import React, { Component } from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
import {NavItem,Table} from "react-bootstrap";
import ItemEdit from './ItemEdit'
import update from 'immutability-helper';
class DlgItems extends Component {
  mystate = {
    start:0,
    limit:5,
    baoxiang:"",
    logined: false,
    search:""
  }
   state = {
      items: [],
      user: "AnonymousUser",
      start:0,
      total:0,
      search:"",
      start_input:1,
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      newPackName: '',
      newname:"",
      auto_value: '',
      auto_items:[],
      auto_loading: false,
  }
  close=()=>{
    console.log("close");
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata();
  }
  loaddata=()=>{
   Client.get("/rest/Item",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        query:this.mystate.search,
      }, 
      (contacts2) => {
        var user=contacts2.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total:contacts2.total,
          start:this.mystate.start
        });
        this.mystate.total=contacts2.total;
    });
  }
  handlePrev = (e) => {
    this.mystate.start=this.mystate.start-this.mystate.limit;
    if(this.mystate.start<0) {this.mystate.start=0;}
    //this.setState({start:start});
    this.loaddata();
  };
  handlePackItemChange = (idx,contact) => {
    console.log(idx);
    const contacts2=update(this.state.items,{[idx]: {$set:contact}});
    console.log(contacts2);
    this.setState({items:contacts2});
  };
  handleNext = (e) => {
    this.mystate.start=this.mystate.start+this.mystate.limit;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  jump=()=>{
    this.mystate.start=parseInt(this.state.start_input,10)-1;
    if(this.mystate.start>this.mystate.total-this.mystate.limit) 
        this.mystate.start=this.mystate.total-this.mystate.limit;//total >limit
    if(this.mystate.start<0)
    {
      this.mystate.start=0;
    }
    this.loaddata();
  };
  handlePageChange= (e) => {
    this.setState({start_input:e.target.value});
  };
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  };
  search = (e) => {
    this.mystate.start=0;
    this.loaddata();
  };
  handleEdit=(idx)=>{
    this.refs.dlg.open2(idx);
  }
  mapfunc=(contact, idx) => {
      if (!contact.image || contact.image==="")
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td><a onClick={()=>this.handleEdit(idx)}>{contact.name}</a></td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td></td>
        </tr>);
      else
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td><a onClick={()=>this.handleEdit(idx)}>{contact.name}</a></td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td><img alt="no" src={"/media/"+contact.image} width="100" height="100"></img></td>
        </tr>);
  }
  render=()=>{
    const contactRows = this.state.items.map(this.mapfunc);
    var hasprev=true;
    var hasnext=true;
    let prev;
    let next;
    //console.log(this.mystate);
    //console.log(this.state);
    if(this.state.start===0){
      hasprev=false;
    }
    //console.log(this.state.start+this.mystate.limit>=this.state.total);
    if(this.state.start+this.mystate.limit>=this.state.total){

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
    return (
          <Modal show={this.state.showModal} onHide={this.close}  dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>备件</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ItemEdit ref="dlg" parent={this} />
              <input type="text" value={this.state.search}  placeholder="" onChange={this.handleSearchChange} />
              <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</button>
               <Table responsive bordered condensed><thead>
               <tr>
               <th>ID</th>
               <th>编号</th>
               <th>名称</th>
               <th>规格</th>
               <th>单位</th>
               <th>图片</th>
               </tr></thead><tbody id="contact-list">{contactRows}</tbody></Table>
              {prev}
              <label id="page">{this.state.start+1}../{this.state.total}</label>
              {next}
              <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
              <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
           </Modal.Body>
      </Modal>
    );
  }
};
export default DlgItems;