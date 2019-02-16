import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Client from './Client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ItemEdit from './ItemEdit';
export default class TablePages extends Component {
  state = {
    items: [],
    start: 0,
    total: 0,
    limit: 10,
    search: '',
    start_input: 1,
    showModal: false,
  };
  close = () => {
    this.setState({ showModal: false });
  };
  componentDidMount = () => {
    this.setState({ showModal: true });
    this.loaddata();
  };
  loaddata = () => {
    Client.get(
      '/rest/Item',
      {
        start: this.state.start,
        limit: this.state.limit,
        search: this.state.search,
        baoxiang: this.state.baoxiang,
      },
      Items2 => {
        this.setState({
          items: Items2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          total: Items2.total,
          start: this.state.start,
        });
        this.state.total = Items2.total;
      }
    );
  };
  handlePrev = e => {
    let start = this.state.start - this.state.limit;
    if (start < 0) {
      start = 0;
    }
    this.setState({ start: start }, () => {
      this.loaddata();
    });
  };
  handleNext = e => {
    let start = this.state.start + this.state.limit;
    if (start > this.state.total - this.state.limit) {
      start = this.state.total - this.state.limit; //total >limit
    }
    this.setState({ start: start }, () => {
      this.loaddata();
    });
  };
  jump = () => {
    let start = parseInt(this.state.start_input, 10) - 1;
    if (start > this.state.total - this.state.limit)
      start = this.state.total - this.state.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.setState({ start: start }, () => {
      this.loaddata();
    });
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };
  mapfunc = (item, idx) => {
    if (item.image === '')
      return (
        <tr key={idx}>
          <td>{item.id}</td>
          <td>{item.bh}</td>
          <td>
            <Button variant="contained" onClick={() => this.handleEdit(idx)}>
              {item.name}
            </Button>
          </td>
          <td>{item.guige}</td>
          <td>{item.danwei}</td>
          <td />
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td>{item.id}</td>
          <td>{item.bh}</td>
          <td>
            <Button variant="contained" onClick={() => this.handleEdit(idx)}>
              {item.name}
            </Button>
          </td>
          <td>{item.guige}</td>
          <td>{item.danwei}</td>
          <td>
            <img
              alt="no"
              src={'/media/' + item.image}
              width="100"
              height="100"
            />
          </td>
        </tr>
      );
  };
  handleEdit = idx => {
    this.refs.dlg.open2(idx);
  };
  render = () => {
    const contactRows = this.state.items.map(this.mapfunc);
    return (
      <div>
        <ItemEdit ref="dlg" parent={this} />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>编号</th>
              <th>名称</th>
              <th>规格</th>
              <th>单位</th>
              <th>图片</th>
            </tr>
          </thead>
          <tbody id="item-list">{contactRows}</tbody>
        </table>
        <Button onClick={this.handlePrev}>前一页</Button>
        <label id="page">
          {this.state.start + 1}/{this.state.total}
        </label>
        <Button onClick={this.handleNext}>后一页</Button>
        <input
          maxLength="6"
          size="6"
          onChange={this.handlePageChange}
          value={this.state.start_input}
        />
        <Button id="page_go" className="btn btn-info" onClick={this.jump}>
          跳转
        </Button>
      </div>
    );
  };
}
