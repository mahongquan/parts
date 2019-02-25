import React, { Component } from 'react';
import Client from './Client';
import { Bar } from 'react-chartjs-2';
class Stat extends Component {
  state = {
    showModal: false,
    error: '',
    lbls: [],
    values: [],
  };

  close = () => {
    this.setState({ showModal: false });
  };
  componentDidMount = () => {
    var self = this;
    this.setState({ showModal: true });
    var data = { limit: 10, search: 'xls' };
    Client.get('/rest/month12', data, function(result) {
      self.setState({ lbls: result.lbls, values: result.values });
    });
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
    console.log(data);
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
    return <Bar data={data} options={options} width={600} height={300} />;
  };
}
export default Stat;
