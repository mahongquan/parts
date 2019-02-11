import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'react-bootstrap';
import ItemEdit from './ItemEdit';
class TablePages extends Component {
  state = {
    TablePages: [],
    user: 'AnonymousUser',
    start: 0,
    total: 0,
    search: '',
    start_input: 1,
    showModal: false,
    error: '',
    lbls: [],
    values: [],
    newPackName: '',
    newname: '',
    auto_value: '',
    auto_TablePages: [],
    auto_loading: false,
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
      TablePages2 => {
        var user = TablePages2.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          TablePages: TablePages2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: TablePages2.total,
          start: this.state.start,
        });
        this.state.total = TablePages2.total;
      }
    );
  };
  handlePrev = e => {
    let start = this.state.start - this.state.limit;
    if (start < 0) {
      start = 0;
    }
    this.setState({start:start},()=>{
      this.loaddata();
    });
  };
  handleNext = e => {
    let start = this.state.start + this.state.limit;
    if (start > this.state.total - this.state.limit){
      start = this.state.total - this.state.limit; //total >limit
    }
    this.setState({start:start},()=>{
      this.loaddata();
    });  
  };
  jump = () => {
    let start = parseInt(this.state.start_input, 10) - 1;
    if (start > this.state.total - this.state.limit)
      tart = this.state.total - this.state.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.setState({start:start},()=>{
      this.loaddata();
    });  
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };
  mapfunc = (contact, idx) => {
    if (contact.image === '')
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td>
            <a onClick={() => this.handleEdit(idx)}>{contact.name}</a>
          </td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td />
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>{contact.bh}</td>
          <td>{contact.name}</td>
          <td>{contact.guige}</td>
          <td>{contact.danwei}</td>
          <td>
            <img
              alt="no"
              src={'/media/' + contact.image}
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
    const contactRows = this.state.TablePages.map(this.mapfunc);
    return (
      <div>
        <ItemEdit ref="dlg" parent={this} />
        <p>TablePages</p>
        <Table responsive bordered condensed>
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
          <tbody id="contact-list">{contactRows}</tbody>
        </Table>
        <a onClick={this.handlePrev}>前一页</a>
        <label id="page">
          {this.state.start + 1}/{this.state.total}
        </label>
        <a onClick={this.handleNext}>后一页</a>
        <input
          maxLength="6"
          size="6"
          onChange={this.handlePageChange}
          value={this.state.start_input}
        />
        <button id="page_go" className="btn btn-info" onClick={this.jump}>
          跳转
        </button>
      </div>
    );
  };
}
export default TablePages;
