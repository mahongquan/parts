import React, { Component } from 'react';
import {Modal,DropdownButton,MenuItem} from "react-bootstrap";
import Client from './Client';
import {Bar} from "react-chartjs-2";
//import Select from 'react-select';
//import 'react-select/dist/react-select.css';
// var _ = require('lodash');
class DlgStat extends Component {
  state={
      showModal: false,
      error:"",
      lbls:[],
      values:[],
      baoxiang:"",
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
  //      return true
  //   } else {
  //      return false
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    if(!this.props.showModal && nextProps.showModal){
      this.onShow(nextProps);
    }
    else if(this.props.showModal && !nextProps.showModal)
    {
      this.onHide();
    }
  }
  onShow=()=>{
    this.open();
  }
  onHide=()=>{

  }
  close=()=>{
    this.props.handleClose();
  }
  open=()=>{
   this.setState({ showModal: true });
   this.loaddata('%');
  }
  loaddata=(baoxiang)=>{
   var self=this;
   var data= { limit:10,search:"xls",baoxiang:baoxiang};
   Client.get("/rest/year12",data, function(result){
          self.setState({lbls:result.lbls,values:result.values,baoxiang:""});
   })
  }
  onSelectBaoxiang=(baoxiang)=>{
    this.setState({baoxiang:baoxiang});
    this.loaddata(baoxiang);
  }
logChange=(val)=> {
  console.log("Selected: " + JSON.stringify(val));
  if (val!=null){
      this.setState({baoxiang:val.value});
      this.loaddata(val.value);
  }
  else{
     this.setState({baoxiang:"%"});
      this.loaddata("%"); 
  }
}
  render=()=>{
    var bg=[];//values.length);
    for(var i=0;i<this.state.values.length;i++){
      bg.push('rgba(95, 192, 99, 1)');
    }
    var data= {
          labels:this.state.lbls,
          datasets: [{
              label: '调试台数',
              data: this.state.values,
              backgroundColor:bg,
              borderWidth:2
          }]
      };
      //console.log(data);
      var options= {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    return (
        <Modal show={this.props.showModal} onHide={this.close}  dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>统计</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <DropdownButton title={this.state.baoxiang} id="id_dropdown2">
      <MenuItem onSelect={() => this.onSelectBaoxiang("马红权")}>马红权</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("陈旺")}>陈旺</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("吴振宁")}>吴振宁</MenuItem>
      <MenuItem onSelect={() => this.onSelectBaoxiang("%")}>*</MenuItem>
    </DropdownButton>
          <Bar data={data} options={options} width={600} height={300} />
          </Modal.Body>
        </Modal>
    );
  }
}
export default DlgStat;