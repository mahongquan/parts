import React, { Component } from 'react';
import { Table,Modal, Button } from 'react-bootstrap';
import Client from './Client';
import Datetime from 'react-datetime';
import UserDropDown from "./UserDropDown";
var moment = require('moment');
function lastDay(m){
  var m1=moment([m.year(),m.month(),1]);
  m1.add(1,"months");
  // console.log(m.format('YYYY-MM-DD'))
  m1.subtract(1,"days");
  // console.log(m.format('YYYY-MM-DD'))
  return m1;
}
class DlgItems extends Component {
  constructor(){
    super();
    this.state={
      month:moment(),
      items: [],
      items2: [],
      start: 0,
      total: 0,
      limit: 10,
      search: '',
      start_input: 1,
      baoxiang: '',
    }
  }
  prev=()=>{
    //m.subtract(2, 'months')
    var m=this.state.month.clone();
    m.subtract(1, 'months');
    this.setState({month:m},()=>{
       this.loaddata();
    })
    console.log(this.state);
  }
  next=()=>{
    var m=this.state.month.clone();
    m.add(1, 'months');
    this.setState({month:m},()=>{
       this.loaddata();
    })
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal ) {
      this.open();
    } else if (prevProps.showModal && !this.props.showModal) {
      // this.onHide();
    }
  }
  yujifahuo_date_change = value => {
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM');
    }
    this.setState({ month:moment(t)},()=>{
      this.loaddata();
    });
  };
  close = () => {
    console.log('close');
  };
  open = () => {
    this.loaddata();
  };
  loaddata = () => {
    // window.m=this.state.month;
    // window.moment=moment;
    var baoxiang = this.state.baoxiang;
    let end_date = lastDay(this.state.month);
    var start_date = end_date.clone();
    start_date.subtract(2, 'months');
    // var start_date_s = start_date.format('YYYY-MM-DD');
    // let end_date_s = end_date.format('YYYY-MM-DD');
    // this.end_date = end_date;
    // this.end_date_s = end_date_s;
    let cmd =
      "select * from parts_contact  where work_month IS NULL and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date.format('YYYY-MM-DD') +
      "' and '" +
       end_date.format('YYYY-MM-DD') +
      "'";
    Client.sql(cmd, contacts2 => {
      // console.log(contacts2);
      this.setState({
        items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
        total: contacts2.total,
      });
    });

    // let current_str = end_date.format('YYYY-MM');
    // this.current_str = current_str;
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "select * from parts_contact  where strftime('%Y-%m',work_month)='" +
      end_date.format('YYYY-MM') +
      "' and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date.format('YYYY-MM-DD') +
      "' and '" +
      end_date.format('YYYY-MM-DD')  +
      "'";
    Client.sql(cmd2, contacts2 => {
      // console.log(contacts2);
      this.setState({
        items2: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
      });
    });
  };
  jump = () => {
    this.state.items.forEach((one, idx) => {
      console.log(idx);
      this.handleEdit(idx);
    });
  };
  handleEdit = idx => {
    let contact = this.state.items[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "update parts_contact set work_month='" +
      this.state.month.format("YYYY-MM-DD") +
      "' where id=" +
      contact.id;
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      this.loaddata();
    });
  };
  handleEdit2 = idx => {
    let contact = this.state.items2[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 = 'update parts_contact set work_month=NULL where id=' + contact.id;
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      this.loaddata();
    });
  };
  mapfunc = (contact, idx) => {
    return (
      <tr key={idx}>
        <td>{contact.tiaoshi_date}</td>
        <td>
          <Button variant="primary" onClick={() => this.handleEdit(idx)}>
            {contact.yiqibh}
          </Button>
        </td>
        <td>{contact.yonghu}</td>
      </tr>
    );
  };
  mapfunc2 = (contact, idx) => {
    return (
      <tr key={idx}>
        <td>{contact.hetongbh}</td>
        <td>
          <Button 
              variant="info" onClick={() => this.handleEdit2(idx)}>
            {contact.yiqibh}
          </Button>
        </td>
        <td>{contact.yonghu}</td>
        <td>{contact.yiqixinghao}</td>
        <td>{contact.channels}</td>
      </tr>
    );
  };
  onSelectBaoxiang = e => {
    this.setState({ baoxiang: e }, () => {
      this.loaddata();
    });
  };
  render = () => {
    const contactRows = this.state.items.map(this.mapfunc);
    const contactRows2 = this.state.items2.map(this.mapfunc2);
    let right = (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>合同号</td>
              <td>仪器号</td>
              <td>用户</td>
              <td>仪器型号</td>
              <td>通道</td>
            </tr>
          </thead>
          <tbody id="contact-list">{contactRows2}</tbody>
        </Table>
      </div>
    );
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleClose} dialogClassName="custom-modal">
          <Modal.Header>
              工作量
          </Modal.Header>
          <Modal.Body>
          <div>
            
        <div style={{ display: 'flex', alignItems: 'center'}}>
 <UserDropDown titile="" onSelect={this.onSelectBaoxiang} />
        <Datetime
                    inputProps={{
                      style: { width:"120px" },
                    }}
                    dateFormat="YYYY-MM"
                    viewMode="months"
                    timeFormat={false}
                    value={this.state.month}
                    onChange={this.yujifahuo_date_change}
                  />
        </div>
        </div>
          <div style={{ display: 'flex',width:"100%" }}>
            <div style={{ border: 'solid 1px'}}>
              未报工作量仪器
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <td>日期</td>
                    <td>仪器号</td>
                    <td>用户</td>
                  </tr>
                </thead>
                <tbody id="contact-list">{contactRows}</tbody>
              </Table>
              <Button
                variant="secondary"
                onClick={this.jump}
              >
                全部
              </Button>
            </div>
            <div style={{ border: 'solid 1px'}}>
              {right}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgItems;
