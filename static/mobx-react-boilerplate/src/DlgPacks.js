import React, { Component } from 'react';
import {Modal} from "react-bootstrap";
import Client from './Client';
import {Table} from "react-bootstrap";
import PackEdit from './PackEdit';
var _ = require('lodash');
class DlgPacks extends Component {
  mystate = {
    start:0,
    limit:5,
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
  shouldComponentUpdate(nextProps, nextState) {
    // if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
    //     return false
    // }
    // return true;
    if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
       return true
    } else {
       return false
    }
  }
  close=()=>{
    this.setState({ showModal: false });
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata();
  }
  loaddata=()=>{
   Client.get("/rest/Pack",
      { start:this.mystate.start,
        limit:this.mystate.limit,
        search:this.mystate.search,
      }, 
      (contacts2) => {
        var user=contacts2.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
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
   handleEdit=(pack_id)=>{
    //this.setState({currentIndex:idx,showModal:true});
    this.refs.edit1.open(pack_id);
  }
  mapfunc=(contact, idx) => {
    if (contact.name)
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td><a onClick={()=>this.handleEdit(contact.id)}>{contact.name}</a></td>
        </tr>);
   else
        return (<tr key={idx} >
          <td>{contact.id}</td>
          <td><a onClick={()=>this.handleEdit(contact.id)}>[NONAME]</a></td>
        </tr>);

  }
  render=()=>{
    const contactRows = this.state.contacts.map(this.mapfunc);
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
            <Modal.Title>包</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <PackEdit ref="edit1" title="编辑"  />
          <input type="text" value={this.state.search}  placeholder="" onChange={this.handleSearchChange} />
          <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</button>
           <Table responsive bordered condensed><thead>
           <tr>
           <th>ID</th>
           <th>名称</th>
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
export default DlgPacks;