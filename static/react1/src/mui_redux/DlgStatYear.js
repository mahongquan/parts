import React, { Component } from 'react';
import DropdownButton from './DropdownButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Client from './Client';
import { Bar } from 'react-chartjs-2';
class DlgStatYear extends Component {
  state = {
    error: '',
    lbls: [],
    values: [],
    baoxiang: '',
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
    if (!this.props.open && nextProps.open) {
      this.onShow(nextProps);
    } else if (this.props.open && !nextProps.open) {
      this.onHide();
    }
  }
  onShow = () => {
    this.open();
  };
  onHide = () => {};
  close = () => {
    this.props.handleClose();
  };
  open = () => {
    this.loaddata('%');
  };
  loaddata = baoxiang => {
    var self = this;
    var data = { baoxiang: baoxiang };
    Client.get('/rest/year12', data, function(result) {
      self.setState({ lbls: result.lbls, values: result.values, baoxiang: '' });
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
    var bg = []; //values.length);
    for (var i = 0; i < this.state.values.length; i++) {
      bg.push('rgba(95, 192, 99, 1)');
    }
    var data = {
      labels: this.state.lbls,
      datasets: [
        {
          label: '调试台数',
          data: this.state.values,
          backgroundColor: bg,
          borderWidth: 2,
        },
      ],
    };
    //console.log(data);
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose}>
        <DialogTitle>统计</DialogTitle>
        <DialogContent>
          <DropdownButton title={this.state.baoxiang} id="id_dropdown2">
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
          <Bar data={data} options={options} width={600} height={300} />
        </DialogContent>
      </Dialog>
    );
  };
}
export default DlgStatYear;
