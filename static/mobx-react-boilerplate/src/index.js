import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { observable } from "mobx";//, action, computed
import { observer } from "mobx-react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Table} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import update from 'immutability-helper';
import Client from './Client';

class ItemStore {
    @observable todos = [];
    @observable start=0;
    @observable total=0;
    @observable showModal=false;
    @observable packitem={};
    @observable bg={};
    @observable search="";
    @observable start_input=1;
    limit=10;
    old={};
    constructor(){
      this.loaddata({query:this.search,start:this.start,limit:this.limit});
    }
    loaddata=(data)=>{
        console.log(data);
            Client.items(
              data
              ,(res)=>{
                this.todos=res.data;
                this.total=res.total;
                this.start=data.start;
              }
            );
    }
}
@observer
class ItemEdit extends Component{
  close=()=>{
    this.props.store.showModal=false;
  }
  
  handleSave=(data)=>{
    var url="/rest/Item";
    Client.postOrPut(url,this.props.store.packitem,(res) => {
      console.log(res);
        this.props.store.packitem=res.data;
        this.props.store.old=res.data;
        this.close();
    });
  }
  quehuoChange=(e)=>{
    var quehuo=this.props.store.packitem.quehuo;
    quehuo=!quehuo;
    if(this.props.store.old.quehuo===quehuo)
    {
      const bg2=update(this.props.store.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.props.store.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.props.store.packitem,{quehuo: {$set:quehuo}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    if(this.props.store.old[e.target.name]===e.target.value)
    {
      this.props.store.bg[e.target.name]="#ffffff"
    }
    else{
      this.props.store.bg[e.target.name]="#8888ff"
    }
    this.props.store.packitem[e.target.name]=e.target.value;
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
class Items extends Component {
  componentDidMount=()=>{
    console.log("mount");
    
    //this.loaddata();

  }

  componentWillUnmount=()=> {
  }
  loaddata=()=>{
      this.props.store.loaddata({
           query:this.props.store.search,
           start:this.props.store.start,
           limit:this.props.store.limit
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
              <label id="page">{this.props.store.start+1}../{this.props.store.total}</label>
              {next}
              <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.props.store.start_input} />
              <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
          </div>
    );
  }
};
const store = new ItemStore();
ReactDOM.render(
    <div>
      <Items store={store} /><Items store={store} />
      <ItemEdit store={store} />
    </div>
    ,document.getElementById('root')
  );