import React, { Component } from 'react';
import { Table,Modal, DropdownButton, Dropdown,Button } from 'react-bootstrap';
import Client from './Client';
var moment = require('moment');
class DlgItems extends Component {
  state = {
    items: [],
    items2: [],
    start: 0,
    total: 0,
    limit: 10,
    search: '',
    start_input: 1,
    baoxiang: '',
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal ) {
      this.open();
    } else if (prevProps.showModal && !this.props.showModal) {
      // this.onHide();
    }
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.showModal && !this.props.showModal) {
  //     this.open();
  //   }
  //   if (nextProps.contact_id) {
  //     this.load_data(nextProps.contact_id);
  //   }
  //   if (nextProps.baoxiang != null) {
  //     this.setState({ baoxiang: nextProps.baoxiang });
  //   }
  // }
  close = () => {
    console.log('close');
  };
  open = () => {
    this.loaddata();
  };
  loaddata = () => {
    var baoxiang = this.state.baoxiang;
    let end_date = moment();
    var start_date = moment().subtract(2, 'months');
    var start_date_s = start_date.format('YYYY-MM-DD');
    let end_date_s = end_date.format('YYYY-MM-DD');
    this.end_date = end_date;
    this.end_date_s = end_date_s;
    let cmd =
      "select * from parts_contact  where work_month IS NULL and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date_s +
      "' and '" +
      end_date_s +
      "'";
    Client.sql(cmd, contacts2 => {
      // console.log(contacts2);
      this.setState({
        items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
        total: contacts2.total,
      });
    });

    let current_str = end_date.format('YYYY-MM');
    this.current_str = current_str;
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "select * from parts_contact  where strftime('%Y-%m',work_month)='" +
      current_str +
      "' and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date_s +
      "' and '" +
      end_date_s +
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
      this.end_date_s +
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
            <DropdownButton
              title={'包箱:' + this.state.baoxiang}
              id="id_dropdown2"
            >
              <Dropdown.Item onSelect={() => this.onSelectBaoxiang('')}>*</Dropdown.Item>
              <Dropdown.Item onSelect={() => this.onSelectBaoxiang('马红权')}>
                马红权
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => this.onSelectBaoxiang('陈旺')}>
                陈旺
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => this.onSelectBaoxiang('吴振宁')}>
                吴振宁
              </Dropdown.Item>
            </DropdownButton>
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
              本月({this.current_str})工作量
              {right}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgItems;
