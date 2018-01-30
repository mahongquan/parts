import React, { Component } from 'react';
//import Client from './Client';
import myredux from './MyRedux';
import {Table} from "react-bootstrap";
//import ItemEdit from './ItemEdit';
import update from 'immutability-helper';
class Items extends Component {
  
   constructor(){
     super();
     this.state = {
      items: [],
      start:0,
      total:0,
      limit:10,
      search:"",
      start_input:1,
      error:"",
     }
     this.mystate=this.state;
   }
  componentDidMount=()=>{
    console.log(myredux.ItemStore);
    this.unsubscribe=myredux.ItemStore.subscribe(this._onChange);
    this.loaddata();
  }

  componentWillUnmount=()=> {
     this.unsubscribe();
  }
   _onChange=()=> {
      console.log("_onChange");
      let state1   =myredux.ItemStore.getState();
      //console.log(state1);
      this.setState(state1);
      this.mystate=this.state;
  }
  loaddata=()=>{
      myredux.ItemActionCreators.getItems({
          query:this.mystate.search,
          start:this.mystate.start,
          limit:this.mystate.limit
      });
  }
  handleSearchChange = (e) => {
    this.mystate.search=e.target.value;
    this.setState({search:this.mystate.search});
  }
  search = (e) => {
    console.log(this.state.search);
    this.mystate.start=0;
    this.loaddata();
  };
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
  handleEdit=(idx)=>{
    myredux.ItemActionCreators.showEdit(idx);
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
    const itemRows = this.state.items.map(this.mapfunc);
    return (
          <div>
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
           </tr></thead><tbody id="item-list">{itemRows}</tbody></Table>
      {prev}
              <label id="page">{this.state.start+1}../{this.state.total}</label>
              {next}
              <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
              <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
          </div>
    );
  }
};
export default Items;