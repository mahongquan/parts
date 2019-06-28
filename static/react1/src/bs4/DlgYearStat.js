import React, { Component } from 'react';
import { Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import Client from './Client';
import {
  ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
class DlgStat extends Component {
  state = {
    showModal: false,
    error: '',
    baoxiang: '',
    data : []
  };
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    if (!this.props.showModal && nextProps.showModal) {
      this.open();
    } else if (this.props.showModal && !nextProps.showModal) {
    }
  }
  open = () => {
    this.setState({ showModal: true });
    this.loaddata('%');
  };
  loaddata = baoxiang => {
    var self = this;
    var data = { baoxiang: baoxiang };
    Client.get('/rest/year12', data, function(result) {
      console.log(result);
      let data1=[]
      for(var i=0;i<result.lbls.length;i++){
        data1.push({month:result.lbls[i],count:result.values[i]});
      }
      self.setState({ data:data1 });
    });
  };
  onClickBaoxiang = baoxiang => {
    this.setState({ baoxiang: baoxiang });
    this.loaddata(baoxiang);
  };
  logChange = val => {
    console.log('Selected: ' + JSON.stringify(val));
    if (val != null) {
      this.setState({ baoxiang: val.value });
      this.loaddata(val.value);
    } else {
      this.setState({ baoxiang: '%' });
      this.loaddata('%');
    }
  };
  render = () => {
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleClose} dialogClassName="custom-modal">
        <Modal.Header>年统计</Modal.Header>
        <Modal.Body>
          <DropdownButton title={this.state.baoxiang} >
            <Dropdown.Item onSelect={() => this.onClickBaoxiang('马红权')}>
              马红权
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onClickBaoxiang('陈旺')}>
              陈旺
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onClickBaoxiang('吴振宁')}>
              吴振宁
            </Dropdown.Item>
            <Dropdown.Item onSelect={() => this.onClickBaoxiang('%')}>*</Dropdown.Item>
          </DropdownButton>
      <div style={{ width: '700px', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={this.state.data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" barSize={90} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgStat;
