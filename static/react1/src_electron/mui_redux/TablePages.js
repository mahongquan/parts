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
        <TableRow key={idx}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.bh}</TableCell>
          <TableCell>
            <Button variant="contained" onClick={() => this.handleEdit(idx)}>
              {item.name}
            </Button>
          </TableCell>
          <TableCell>{item.guige}</TableCell>
          <TableCell>{item.danwei}</TableCell>
          <TableCell />
        </TableRow>
      );
    else
      return (
        <TableRow key={idx}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.bh}</TableCell>
          <TableCell>
            <Button variant="contained" onClick={() => this.handleEdit(idx)}>
              {item.name}
            </Button>
          </TableCell>
          <TableCell>{item.guige}</TableCell>
          <TableCell>{item.danwei}</TableCell>
          <TableCell>
            <img
              alt="no"
              src={'/media/' + item.image}
              width="100"
              height="100"
            />
          </TableCell>
        </TableRow>
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>编号</TableCell>
              <TableCell>名称</TableCell>
              <TableCell>规格</TableCell>
              <TableCell>单位</TableCell>
              <TableCell>图片</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="item-list">{contactRows}</TableBody>
        </Table>
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
