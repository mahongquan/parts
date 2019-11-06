import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Client from './Client';
import { Button, Table } from 'react-bootstrap';
import PackEdit from './PackEdit';
import myglobal from '../myglobal';
class DlgPacks extends Component {
  state = {
    contacts: [],
    user: 'AnonymousUser',
    start: 0,
    limit:10,
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
    auto_items: [],
    auto_loading: false,
  };
  close = () => {
    this.setState({ showModal: false });
  };
  open = () => {
    this.setState({ showModal: true });
    this.loaddata();
  };
  loaddata = () => {
    Client.get(
      '/rest/Pack',
      {
        start: this.state.start,
        limit: this.state.limit,
        search: this.state.search,
      },
      contacts2 => {
        var user = contacts2.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts2.total,
          start: this.state.start,
        });
        // eslint-disable-next-line
        this.state.total = contacts2.total;
      },(error)=>{
      console.log(error);
      myglobal.app.show_webview(error);
    });
  };
  handlePrev = e => {
    // eslint-disable-next-line
    this.state.start = this.state.start - this.state.limit;
    if (this.state.start < 0) {
      // eslint-disable-next-line
      this.state.start = 0;
    }
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = e => {
    // eslint-disable-next-line
    this.state.start = this.state.start + this.state.limit;
    if (this.state.start > this.state.total - this.state.limit)
      // eslint-disable-next-line
      this.state.start = this.state.total - this.state.limit; //total >limit
    if (this.state.start < 0) {
      // eslint-disable-next-line
      this.state.start = 0;
    }
    this.loaddata();
  };
  jump = () => {
    // eslint-disable-next-line
    this.state.start = parseInt(this.state.start_input, 10) - 1;
    if (this.state.start > this.state.total - this.state.limit)
      // eslint-disable-next-line
      this.state.start = this.state.total - this.state.limit; //total >limit
    if (this.state.start < 0) {
      // eslint-disable-next-line
      this.state.start = 0;
    }
    this.loaddata();
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };
  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };
  search = e => {
    // eslint-disable-next-line
    this.state.start = 0;
    this.loaddata();
  };
  handleEdit = pack_id => {
    //this.setState({currentIndex:idx,showModal:true});
    this.refs.edit1.open(pack_id);
  };
  mapfunc = (contact, idx) => {
    if (contact.name)
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>
            <Button
              variant="light"
              onClick={() => this.handleEdit(contact.id)}
            >
              {contact.name}
            </Button>
          </td>
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td>{contact.id}</td>
          <td>
            <Button
              variant="light"
              onClick={() => this.handleEdit(contact.id)}
            >
              [NONAME]
            </Button>
          </td>
        </tr>
      );
  };
  render = () => {
    const contactRows = this.state.contacts.map(this.mapfunc);
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    //console.log(this.state);
    //console.log(this.state);
    if (this.state.start === 0) {
      hasprev = false;
    }
    //console.log(this.state.start+this.state.limit>=this.state.total);
    if (this.state.start + this.state.limit >= this.state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = <Button variant="light" onClick={this.handlePrev}>前一页</Button>;
    } else {
      prev = null;
    }
    if (hasnext) {
      next = <Button variant="light" onClick={this.handleNext}>后一页</Button>;
    } else {
      next = null;
    }
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>包</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PackEdit ref="edit1" title="编辑" />
          <input
            type="text"
            value={this.state.search}
            placeholder=""
            onChange={this.handleSearchChange}
          />
          <Button
            className="btn-primary"
            onClick={this.search}
          >
            搜索
          </Button>
          <Table size="sm" responsive bordered condensed="true">
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
              </tr>
            </thead>
            <tbody id="contact-list">{contactRows}</tbody>
          </Table>
          {prev}
          <label id="page">
            {this.state.start + 1}../{this.state.total}
          </label>
          {next}
          <input
            maxLength="6"
            size="6"
            onChange={this.handlePageChange}
            value={this.state.start_input}
          />
          <Button id="page_go" className="btn btn-info" onClick={this.jump}>
            跳转
          </Button>
        </Modal.Body>
      </Modal>
    );
  };
}
export default DlgPacks;
