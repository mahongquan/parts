import React, { Component } from 'react';
import DropdownButton from './DropdownButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Client from './Client';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
class DlgStat extends Component {
  state = {
    error: '',
    baoxiang: '',
    data: [],
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.open();
    } else if (this.props.open && !nextProps.open) {
    }
  }
  close = () => {
    // this.setState({ showModal: false });
  };
  open = () => {
    this.loaddata('%');
  };
  loaddata = (baoxiang) => {
    var self = this;
    var data = { baoxiang: baoxiang };
    Client.get('/rest/month12', data, function (result) {
      console.log(result);
      let data1 = [];
      for (var i = 0; i < result.lbls.length; i++) {
        data1.push({ month: result.lbls[i], count: result.values[i] });
      }
      self.setState({ data: data1 });
    });
  };
  onClickBaoxiang = (baoxiang) => {
    this.setState({ baoxiang: baoxiang });
    this.loaddata(baoxiang);
  };
  logChange = (val) => {
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
      <Dialog open={this.props.open} onClose={this.props.handleClose}>
        <DialogTitle>月统计</DialogTitle>
        <DialogContent>
          <DropdownButton title={this.state.baoxiang}>
            <MenuItem onClick={() => this.onClickBaoxiang('马红权')}>
              马红权
            </MenuItem>
            <MenuItem onClick={() => this.onClickBaoxiang('陈旺')}>
              陈旺
            </MenuItem>
            <MenuItem onClick={() => this.onClickBaoxiang('吴振宁')}>
              吴振宁
            </MenuItem>
            <MenuItem onClick={() => this.onClickBaoxiang('%')}>*</MenuItem>
          </DropdownButton>
          <div style={{ width: '500px', height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={this.state.data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" barSize={20} fill="#413ea0" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgStat;
