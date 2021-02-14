import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from './Client';
import { Bar } from 'react-chartjs-2';
import UserDropDown from './UserDropDown';
class DlgStat extends Component {
  state = {
    error: '',
    lbls: [],
    values: [],
    baoxiang: '',
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal) {
      this.open();
    } else if (prevProps.showModal && !this.props.showModal) {
      // this.onHide();
    }
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //     //console.log(nextProps)
  //     if (!this.props.showModal && nextProps.showModal) {
  //       this.open();
  //     } else if (this.props.showModal && !nextProps.showModal) {
  //     }
  //   }
  close = () => {
    this.props.handleClose();
  };
  open = () => {
    this.setState({ baoxiang: '' });
    this.loaddata('%');
  };
  loaddata = (baoxiang) => {
    var self = this;
    var data = { limit: 10, search: 'xls', baoxiang: baoxiang };
    Client.get('/rest/month12', data, function (result) {
      self.setState({ lbls: result.lbls, values: result.values, baoxiang: '' });
    });
  };
  onSelectBaoxiang = (baoxiang) => {
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
      <Modal
        show={this.props.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>月统计</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserDropDown titile="" onSelect={this.onSelectBaoxiang} />
          <Bar data={data} options={options} width={600} height={300} />
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgStat;
