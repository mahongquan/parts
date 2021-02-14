import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Client from './Client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PackEdit from './PackEdit';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
var _ = require('lodash');
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};
class DlgPacks extends Component {
  mystate = {
    start: 0,
    limit: 5,
    baoxiang: '',
    logined: false,
    search: '',
  };
  state = {
    contacts: [],
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
    auto_items: [],
    auto_loading: false,
  };
  shouldComponentUpdate(nextProps, nextState) {
    // if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
    //     return false
    // }
    // return true;
    if (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    ) {
      return true;
    } else {
      return false;
    }
  }
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
        start: this.mystate.start,
        limit: this.mystate.limit,
        search: this.mystate.search,
      },
      (contacts2) => {
        var user = contacts2.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          contacts: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts2.total,
          start: this.mystate.start,
        });
        this.mystate.total = contacts2.total;
      }
    );
  };
  handlePrev = (e) => {
    this.mystate.start = this.mystate.start - this.mystate.limit;
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    //this.setState({start:start});
    this.loaddata();
  };
  handleNext = (e) => {
    this.mystate.start = this.mystate.start + this.mystate.limit;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  jump = () => {
    this.mystate.start = parseInt(this.state.start_input, 10) - 1;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.loaddata();
  };
  handlePageChange = (e) => {
    this.setState({ start_input: e.target.value });
  };
  handleSearchChange = (e) => {
    this.mystate.search = e.target.value;
    this.setState({ search: this.mystate.search });
  };
  search = (e) => {
    this.mystate.start = 0;
    this.loaddata();
  };
  handleEdit = (pack_id) => {
    //this.setState({currentIndex:idx,showModal:true});
    this.props.store.actions.loadPackItem(pack_id);
    this.refs.edit1.open(pack_id);
  };
  mapfunc = (contact, idx) => {
    if (contact.name)
      return (
        <TableRow key={idx}>
          <TableCell>{contact.id}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => this.handleEdit(contact.id)}
            >
              {contact.name}
            </Button>
          </TableCell>
        </TableRow>
      );
    else
      return (
        <TableRow key={idx}>
          <TableCell>{contact.id}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => this.handleEdit(contact.id)}
            >
              [NONAME]
            </Button>
          </TableCell>
        </TableRow>
      );
  };
  render = () => {
    const contactRows = this.state.contacts.map(this.mapfunc);
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    //console.log(this.mystate);
    //console.log(this.state);
    if (this.state.start === 0) {
      hasprev = false;
    }
    //console.log(this.state.start+this.mystate.limit>=this.state.total);
    if (this.state.start + this.mystate.limit >= this.state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = (
        <Button variant="contained" onClick={this.handlePrev}>
          前一页
        </Button>
      );
    } else {
      prev = null;
    }
    if (hasnext) {
      next = (
        <Button variant="contained" onClick={this.handleNext}>
          后一页
        </Button>
      );
    } else {
      next = null;
    }
    return (
      <Dialog open={this.state.showModal} onClose={this.close}>
        <AppBar className={this.props.classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={this.props.classes.flex}
            >
              包
            </Typography>
            <input
              type="text"
              value={this.state.search}
              placeholder=""
              onChange={this.handleSearchChange}
            />
            <Button
              variant="contained"
              id="id_bt_search"
              color="secondary"
              onClick={this.search}
            >
              搜索
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <PackEdit store={this.props.store} ref="edit1" title="编辑" />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>名称</TableCell>
              </TableRow>
            </TableHead>
            <TableBody id="contact-list">{contactRows}</TableBody>
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
          <Button
            id="page_go"
            variant="contained"
            className="btn btn-info"
            onClick={this.jump}
          >
            跳转
          </Button>
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(DlgPacks);
