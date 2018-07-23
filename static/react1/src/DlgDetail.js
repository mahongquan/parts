import React from 'react';
import {Modal,Table} from "react-bootstrap";
import Client from './Client';
// import update from 'immutability-helper';
var _ = require('lodash');
class DlgDetail extends React.Component{
  state={ 
      error:"",
      packs:[],
      info:"",
      contact:{},
      items:[],
      items2:[],
      totalct:0,
      totalid:0,
  }


  loaddata=(contactid)=>{
    if(!contactid) return;
    var data1={id:contactid}
    console.log(data1);
    Client.get("/rest/showcontact",data1,(res)=>{
       console.log(res);
       if(!res.items2) res.items2=[];
       this.setState({contact:res.contact
        ,items:res.items,items2:res.items2,totalid:res.totalid,totalct:res.totalct})
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props.showModal, nextProps.showModal)) {
       console.log(this.props);
       console.log(nextProps);
       console.log("props not eq");
       return true;
    }
    if (!_.isEqual(this.state, nextState)) {
      console.log("state not eq");
      return true;
    }
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if(!this.props.showModal && nextProps.showModal){
      this.onShow(nextProps.contactid);
    }
    else if(this.props.showModal && !nextProps.showModal)
    {
      this.onHide();
    }
  }
  onShow=(contactid)=>{
    this.open(contactid);
  }
  onHide=()=>{

  }
  open=(contactid)=>{
    this.loaddata(contactid);
  }
  handleDismiss=()=>{
    this.setState({ showalert: false });
  }
  inputChange=()=>{
   this.setState({ showalert: false }); 
  }
    mapfunc=(contact, idx) => {
      if (contact.leijia){
        return (<tr key={idx} >
          <td><u><b>{contact.id}</b></u></td>
          <td><u>{contact.bh}</u></td>
          <td><u>{contact.name}</u></td>
          <td><u>{contact.guige}</u></td>
          <td><u>{contact.ct}</u></td>
          <td><u>{contact.danwei}</u></td>
        </tr>);
      }
    else{
      return (<tr key={idx} >
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td>{contact.name}</td>
          <td>{contact.guige}</td>
          <td>{contact.ct}</td>
          <td>{contact.danwei}</td>
        </tr>);
    }
  }

  render=()=>{
    // console.log("render ImportStandard")
    // let alert;
    // if (this.state.showalert) {
    //     alert=(<Alert bsStyle="info" onDismiss={this.handleDismiss}>
    //       <p>
    //         {this.state.info}
    //       </p>
    //     </Alert>
    //   );
    // }
    const contactRows = this.state.items.map(this.mapfunc);
    let contactRows2,quehuo;
    if(this.state.items2.length>0){
        contactRows2 = this.state.items2.map(this.mapfunc);

        quehuo=(<div><h2>缺货清单</h2>
            <Table responsive bordered condensed><thead>
               <tr>
               <th>ID</th>
               <th>编号</th>
               <th>名称</th>
               <th>规格</th>
               <th>数量</th>
               <th>单位</th>
               
               </tr></thead>
               <tbody id="contact-list">{contactRows2}</tbody>
            </Table></div>);
    }
    return (
        <Modal show={this.props.showModal} onHide={this.props.handleClose}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>详细</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table id="table_input" className="table-condensed" >
            <tbody>
            <tr >
                <td >
                    ID:
                </td>
                <td >
                    {this.state.contact.id} 
                </td>
                <td>
                    <label>用户单位:</label>
                </td>
                <td>
                    {this.state.contact.yonghu}
                </td>
            </tr><tr>
                <td>
                    客户地址:
                </td>
                <td>
                    {this.state.contact.addr}
                </td>
                <td>
                    通道配置:
                </td>
                <td>{this.state.contact.channels}             </td>
            </tr><tr>
                <td>
                    <label>仪器型号:</label>
                </td>
                <td>{this.state.contact.yiqixinghao}
                </td>
                <td>
                    <label>仪器编号:</label>
                </td>
                <td>
                    {this.state.contact.yiqibh}
                </td>
            </tr><tr>
                <td>
                    <label>包箱:</label>
                </td>
                <td>
                    {this.state.contact.baoxiang}
                </td>
                <td>
                    审核:
                </td>
                <td>
                    {this.state.contact.shenhe}
                </td>
            </tr><tr>
                <td>
                    <label>入库时间:</label>
                </td>
                <td>
                    {this.state.contact.yujifahuo_date}
                </td>
                <td>
                    调试时间:
                </td>
                <td>
                {this.state.contact.tiaoshi_date}
                </td>
            </tr>
            <tr>
                <td>
                    <label>合同编号:</label>
                </td>
                <td>
                    {this.state.contact.hetongbh}
                </td>
                <td>
                    方法:
                </td>
                <td>
                {this.state.contact.method}
                </td>
            </tr>

            </tbody>
            </table>
            <h2>备件清单</h2>
            <Table responsive bordered condensed><thead>
               <tr>
               <th>ID</th>
               <th>编号</th>
               <th>名称</th>
               <th>规格</th>
               <th>数量</th>
               <th>单位</th>
               
               </tr></thead><tbody id="contact-list">{contactRows}</tbody>
            </Table>
            <p>共{this.state.totalid}项{this.state.totalct}个。</p>
            {quehuo}
                         </Modal.Body>
        </Modal>
    );
  }
}
export default DlgDetail;