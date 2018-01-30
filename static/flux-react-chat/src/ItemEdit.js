import React, { Component } from 'react';
import {Modal} from "react-bootstrap";
import update from 'immutability-helper';
//import Client from './Client';
import myflx from './MyFlux';
class ItemEdit extends Component{
  state={ 
      showModal: false,
      packitem:{},
      bg:{}
  }
  componentDidMount=()=>{
    myflx.ItemStore.eventEmitter.on("showedit", this._showedit);
    myflx.ItemStore.eventEmitter.on("editChange", this._editChange);
    //editError
    myflx.ItemStore.eventEmitter.on("editError", this._editError);
  }

  componentWillUnmount=()=> {
     myflx.ItemStore.eventEmitter.removeListener(this._showedit);
     myflx.ItemStore.eventEmitter.removeListener(this._editChange);
     myflx.ItemStore.eventEmitter.removeListener(this._editError);
  }
  _editError=()=>{
    alert(myflx.ItemStore.getError());
  }
  _showedit=()=> {

    console.log("_on showedit");
    this.setState({ showModal: true,bg:{}});
    this.old=myflx.ItemStore.getCurrent();
    this.setState({packitem:this.old});
    // let items,total,start;
    // [items,total,start]=myflx.ItemStore.getAll();
    // console.log(items);
    // this.setState({items:items,total:total});
    // this.setState({start:start});
    // this.mystate.total=total;
  }
  _editChange=()=> {
      console.log("_on showedit");
      this.setState({ showModal: true,bg:{}});
      this.old=myflx.ItemStore.getCurrent();
      this.setState({packitem:this.old});
  }
  close=()=>{
    this.setState({ showModal: false });
  }

  open2=(idx)=>{
    this.setState({ showModal: true,bg:{}});
    this.index=idx;
    if (this.index==null){
      this.old={};
    }
    else{
      this.parent=this.props.parent;
      this.old=this.parent.state.items[this.index];
    }
    this.setState({packitem:this.old});
  }
  
  handleSave=(data)=>{
    myflx.ItemActionCreators.updateItem(this.state.packitem);
    //var url="/rest/Item";
    //console.log(this.state.packitem);
    // Client.postOrPut(url,this.state.packitem,(res) => {
    //   console.log(res);
    //     this.setState({contact:res.data});
    //     this.parent.handlePackItemChange(this.index,res.data);
    //     this.old=res.data;
    //     this.close();
    // });
  }
  quehuoChange=(e)=>{
    var quehuo=this.state.packitem.quehuo;
    quehuo=!quehuo;
    if(this.old.quehuo===quehuo)
    {
      const bg2=update(this.state.bg,{[e.target.name]:{$set:"#ffffff"}})
      this.setState({bg:bg2});
    }
    else{
       const bg2=update(this.state.bg,{[e.target.name]:{$set:"#8888ff"}})
      this.setState({bg:bg2}); 
    }
    const contact2=update(this.state.packitem,{quehuo: {$set:quehuo}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.name);
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
    const contact2=update(this.state.packitem,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({packitem:contact2});
  }
  render=()=>{
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
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
                    <input type="text" id="id" name="id" readOnly="true"  disabled="disabled"    defaultValue={this.state.packitem.id} />
                </td>
            </tr><tr>
                <td>
                    名称:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.name}}  type="text" id="name" name="name" value={this.state.packitem.name} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>规格:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.guige}} type="text"  name="guige" 
                    value={this.state.packitem.guige}  onChange={this.handleChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>编号:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.bh}} type="text" id="bh" name="bh" value={this.state.packitem.bh}  onChange={this.handleChange} />
                </td>
            </tr>
           
            <tr>
                <td>
                    <label>单位:</label>
                </td>
                <td>
                    <input type="text" style={{"backgroundColor":this.state.bg.danwei}}
                    id="danwei" name="danwei"  value={this.state.packitem.danwei} onChange={this.handleChange} />
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
export default ItemEdit;
