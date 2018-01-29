import React, { Component } from 'react';
//import Client from './Client';
import myflx from './MyFlux';
import {Table} from "react-bootstrap";
import ItemEdit from './ItemEdit';
console.log(myflx);
class Items extends Component {
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
      limit:10,
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
  componentDidMount=()=>{
    myflx.ItemStore.addChangeListener(this._onChange);
    this.loaddata();
  }

  componentWillUnmount=()=> {
    myflx.ItemStore.removeChangeListener(this._onChange);
  }
   _onChange=()=> {
    console.log("_onChange");
    let items,total;
    [items,total]=myflx.ItemStore.getAll();
    console.log(items);
    this.setState({items:items,total:total});
  }
  loaddata=()=>{
    myflx.ItemActionCreators.getItems({
      search:this.state.search,
      start:this.mystate.start,
      limit:this.mystate.limit
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
  mapfunc=(item, idx) => {
      if (item.image==="")
        return (<tr key={idx} >
          <td>{item.id}</td>
          <td>{item.bh}</td>
          <td>{item.name}</td>
          <td>{item.guige}</td>
          <td>{item.danwei}</td>
          <td></td>
        </tr>);
      else
        return (<tr key={idx} >
          <td>{item.id}</td>
          <td>{item.bh}</td>
          <td>{item.name}</td>
          <td>{item.guige}</td>
          <td>{item.danwei}</td>
          <td><img alt="no" src={"/media/"+item.image} width="100" height="100"></img></td>
        </tr>);
  }
  render=()=>{
    const itemRows = this.state.items.map(this.mapfunc);
    return (
          <div>
          <p>items</p>
           <Table responsive bordered condensed><thead>
           <tr>
           <th>ID</th>
           <th>编号</th>
           <th>名称</th>
           <th>规格</th>
           <th>单位</th>
           <th>图片</th>
           </tr></thead><tbody id="item-list">{itemRows}</tbody></Table>
      <a onClick={this.handlePrev}>前一页</a> 
      <label id="page">{this.state.start+1}/{this.state.total}</label>
      <a onClick={this.handleNext}>后一页</a>
      <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
      <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
          </div>
    );
  }
};
export default Items;