import React, { Component } from 'react';
import UsePacks2 from "./UsePacks2";
import update from 'immutability-helper';
import Client from './Client';
import Autocomplete from './Autocomplete';
import './react-datetime.css'
var moment = require('moment');
var locale=require('moment/locale/zh-cn');
var DateTime=require('react-datetime');
let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}
class RouteContactEdit  extends Component{
  state={ 
      showModal: false,
      contact:{
        yujifahuo_date:moment(),
        tiaoshi_date:moment(),
          },
      hiddenPacks:true,
      bg:{},
      date_open:false,
  }

  close=()=>{
    this.setState({ showModal: false });
  }
 // componentWillReceiveProps(nextProps) {
 //    this.setState({ showModal: nextProps.showModal });
 //    this.setState({bg:{}});
 //    this.parent=nextProps.parent;
 //    if (nextProps.index==null){
 //      this.old={
 //        yujifahuo_date:moment().format("YYYY-MM-DD"),
 //        tiaoshi_date:moment().format("YYYY-MM-DD"),
 //        addr:"",
 //        channels:"",
 //        baoxiang:"",
 //        hetongbh:"",
 //        shenhe:"",
 //        yonghu:"",
 //        yiqibh:"",
 //        yiqixinghao:""
 //      };
 //    }
 //    else{
 //      this.old=this.parent.state.contacts[nextProps.index];
 //      this.setState({hiddenPacks:false});
 //    }
 //    this.setState({contact:this.old});
 //  }
 componentDidMount=()=>{
    this.setState({ showModal: true });
    this.setState({bg:{}});
    console.log(this.props);
    this.parent=this.props.parent;
    this.index=this.props.idx;
    console.log(this.props);
    if (this.index==null){
      this.old={
        yujifahuo_date:moment().format("YYYY-MM-DD"),
        tiaoshi_date:moment().format("YYYY-MM-DD"),
        addr:"",
        channels:"",
        baoxiang:"",
        hetongbh:"",
        shenhe:"",
        yonghu:"",
        yiqibh:"",
        yiqixinghao:""
      };
    }
    else{
      this.old=this.parent.state.contacts[this.index];
      this.setState({hiddenPacks:false});
    }
    this.setState({contact:this.old});
  }
  handleCopy=(data)=> {
     console.log("copy");
     var contact2=update(this.state.contact,{id:{$set:""}});
     console.log(contact2);
     this.setState({contact:contact2});
  }
  handleSave=(data)=>{
    var url="/rest/Contact";
    Client.postOrPut(url,this.state.contact,(res) => {
      if(res.success){
        this.setState({contact:res.data});
        this.parent.handleContactChange(this.index,res.data);
        this.old=res.data;
        this.setState({bg:{}});
        this.setState({hiddenPacks:false});
      }
      else{
        alert(res.message);
      }
    });
  }
  tiaoshi_date_change=(value)=>{
    //this.state.yujifahuo_date=value;
    var e_target_name="tiaoshi_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
      //console.log("not equal")
      //this.state.bg[e_target_name]="#8888ff"; 
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
  }

  yujifahuo_date_change=(value)=>{
    //this.state.yujifahuo_date=value;
    var e_target_name="yujifahuo_date";
    console.log(this.old[e_target_name]);
    var t=null;
    if (typeof value==="string")
    {
      t=value;
    }
    else{
      t=value.format("YYYY-MM-DD");
    }
    console.log(t);
    if(this.old[e_target_name]===t)
    {
      const bg2=update(this.state.bg,{[e_target_name]:{$set:"#ffffff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    else{
     const bg2=update(this.state.bg,{[e_target_name]:{$set:"#8888ff"}})
      //this.state.bg[e_target_name]="#ffffff";
      //console.log("equal");
      this.setState({bg:bg2});
    }
    const contact2=update(this.state.contact,{[e_target_name]: {$set:t}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  channels_change=(event, value)=>{
    console.log("auto_change");
    //this.setState({ yiqixinghao_value:value, auto_loading: false });
    this.channels_select(null,value) 
  }
  channels_select=(value, item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.channels===item)
      {
       const bg2=update(this.state.bg,{channels:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{channels:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      const contact2=update(this.state.contact,{channels: {$set:item}});
      console.log(contact2);
      this.setState({contact:contact2});
  }
  yiqixinghao_change=(event, value)=>{
    console.log("auto_change");
    //this.setState({ yiqixinghao_value:value, auto_loading: false });
    this.yiqixinghao_select(null,value) 
  }
  yiqixinghao_select=(value, item)=>{
      console.log("selected");
      console.log(item);
      if(this.old.yiqixinghao===item)
      {
       const bg2=update(this.state.bg,{yiqixinghao:{$set:"#ffffff"}})
        this.setState({bg:bg2});
      }
      else{
        const bg2=update(this.state.bg,{yiqixinghao:{$set:"#8888ff"}})
        this.setState({bg:bg2});
      }
      const contact2=update(this.state.contact,{yiqixinghao: {$set:item}});
      console.log(contact2);
      this.setState({contact:contact2});
  }
  handleChange=(e)=>{
    console.log("change");
    console.log(e);
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
    const contact2=update(this.state.contact,{[e.target.name]: {$set:e.target.value}});
    console.log(contact2);
    this.setState({contact:contact2});
  }
  matchStateToTerm=(state, value)=>{
     return      state.toLowerCase().indexOf(value.toLowerCase()) !== -1 ;
  }
  render=()=>{
    return (
      <div>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    <input type="text" id="id" name="id" disabled="disabled"    value={this.state.contact.id} />
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.yonghu}}  type="text" id="yonghu" name="yonghu" value={this.state.contact.yonghu} onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.addr}}  type="text" id="addr" name="addr" value={this.state.contact.addr} onChange={this.handleChange} />
                </td>
                <td>
                    通道配置:
                </td>
                <td>
                  <Autocomplete
                      value={this.state.contact.channels}
                      inputProps={
                        { 
                          id: 'channels-autocomplete',
                          style:{backgroundColor:this.state.bg.channels}
                        }
                      }
                      items={[
                        "1O(低氧)",
                        "1O(高氧)",
                        "1O(低氧)+2N",
                        "1C(低碳)+2S",
                        "1C(高碳)+2S",
                        "2C+1S(低硫)",
                        "2C+1S(高硫)",
                        "2C+2S",
                        "2O+2N",
                        "2O",
                      ]}
                      getItemValue={(item) => item}
                      onSelect={this.channels_select}
                      onChange={this.channels_change}
                      shouldItemRender={this.matchStateToTerm}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={isHighlighted ? styles.highlightedItem : styles.item}
                          key={item}
                        >{item}</div>
                      )}
                    />
                </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>
                    <Autocomplete
                      value={this.state.contact.yiqixinghao}
                      inputProps={
                        { 
                          id: 'yiqixinghao-autocomplete',
                          style:{backgroundColor:this.state.bg.yiqixinghao}
                        }
                      }
                      items={[
                        "CS-1011C",
                        "CS-2800",
                        "CS-3000",
                        "CS-3000G",
                        "HD-5",
                        "N-3000",
                        "O-3000",
                        "OH-3000",
                        "ON-3000",
                        "ON-4000",
                        "ONH-3000"
                      ]}
                      getItemValue={(item) => item}
                      onSelect={this.yiqixinghao_select}
                      onChange={this.yiqixinghao_change}
                      shouldItemRender={this.matchStateToTerm}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={isHighlighted ? styles.highlightedItem : styles.item}
                          key={item}
                        >{item}</div>
                      )}
                    />
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.yiqibh}}  type="text" id="yiqibh" name="yiqibh" value={this.state.contact.yiqibh}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.baoxiang}} type="text" id="baoxiang" name="baoxiang" value={this.state.contact.baoxiang}  onChange={this.handleChange} />
                </td>
                <td>
                    审核:
                </td>
                <td>
                    <input style={{"backgroundColor":this.state.bg.shenhe}} type="text" id="shenhe" name="shenhe" value={this.state.contact.shenhe}  onChange={this.handleChange} />
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    <DateTime  ref="datetime1" timeFormat={false} 
                    inputProps={
                      {"style":
                        {"backgroundColor":this.state.bg.yujifahuo_date}
                      }
                    } 
                    id="yujifahuo_date" name="yujifahuo_date"  value={this.state.contact.yujifahuo_date} onChange={this.yujifahuo_date_change} />
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                <DateTime  ref="datetime2" timeFormat={false} 
                    inputProps={
                      {"style":
                        {"backgroundColor":this.state.bg.tiaoshi_date}
                      }
                    } 
                    name="tiaoshi_date"  value={this.state.contact.tiaoshi_date} onChange={this.tiaoshi_date_change} />
                </td>
            </tr><tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    <input  style={{"backgroundColor":this.state.bg.hetongbh}}  type="text" id="hetongbh" name="hetongbh" value={this.state.contact.hetongbh}  onChange={this.handleChange} />
                </td>
                <td>
                    方法:
                </td>
                <td>
                <input  style={{"backgroundColor":this.state.bg.method}}  type="text" id="method" name="method" disabled="true" defaultValue={this.state.contact.method} />
                {
                //<button className="btn" id="bt_file"><Glyphicon glyph="pencil" />
                //</button>
                //<button className="btn" id="bt_removefile"><Glyphicon glyph="remove" /></button>
                }
                </td>
            </tr>        
            </tbody>
            </table>
         <div> 
           <button className="btn btn-primary" id="bt_save" onClick={this.handleSave} >保存</button> 
           <button className="btn" style={{margin:"20px 20px 20px 20px"}} id="bt_clearid" onClick={this.handleCopy}>复制</button>
         </div>
          <div id="id_usepacks" hidden={this.state.hiddenPacks}>
           <UsePacks2  contact_id={this.state.contact.id}/>
          </div>
        </div>

    );
  }
};
export default RouteContactEdit;