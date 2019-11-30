import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Client from './Client';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DropdownButton from './DropdownButton';
import MenuItem from '@material-ui/core/MenuItem';
// import sprintf from 'sprintf';
var moment = require('moment');
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class DlgItems extends Component {
  state = {
    items: [],
    items2: [],
    start: 0,
    total: 0,
    limit: 10,
    search: '',
    start_input: 1,
    baoxiang: '',
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.showModal && !this.props.showModal) {
      this.open();
    }
    if (nextProps.contact_id) {
      this.load_data(nextProps.contact_id);
    }
    if (nextProps.baoxiang != null) {
      this.setState({ baoxiang: nextProps.baoxiang });
    }
  }
  close = () => {
    console.log('close');
  };
  open = () => {
    this.loaddata();
  };
  loaddata = () => {
    var baoxiang = this.state.baoxiang;
    let end_date = moment();
    var start_date = moment().subtract(2, 'months');
    var start_date_s = start_date.format('YYYY-MM-DD');
    let end_date_s = end_date.format('YYYY-MM-DD');
    this.end_date = end_date;
    this.end_date_s = end_date_s;
    let cmd =
      "select * from parts_contact  where work_month IS NULL and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date_s +
      "' and '" +
      end_date_s +
      "'";
    Client.sql(cmd, contacts2 => {
      console.log(contacts2);
      this.setState({
        items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
        total: contacts2.total,
      });
    });

    let current_str = end_date.format('YYYY-MM');
    this.current_str = current_str;
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "select * from parts_contact  where strftime('%Y-%m',work_month)='" +
      current_str +
      "' and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date_s +
      "' and '" +
      end_date_s +
      "'";
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      this.setState({
        items2: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
      });
    });
  };
  handleEdit = idx => {
    let contact = this.state.items[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "update parts_contact set work_month='" +
      this.end_date_s +
      "' where id=" +
      contact.id;
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      this.loaddata();
    });
  };
  handleEdit2 = idx => {
    let contact = this.state.items2[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 = 'update parts_contact set work_month=NULL where id=' + contact.id;
    Client.sql(cmd2, contacts2 => {
      console.log(contacts2);
      this.loaddata();
    });
  };
  mapfunc = (contact, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell>{contact.tiaoshi_date}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={() => this.handleEdit(idx)}>
            {contact.yiqibh}
          </Button>
        </TableCell>
        <TableCell>{contact.yonghu}</TableCell>
        <TableCell>{contact.channels}</TableCell>
      </TableRow>
    );
  };
  mapfunc2 = (contact, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell>{contact.hetongbh}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={() => this.handleEdit2(idx)}>
            {contact.yiqibh}
          </Button>
        </TableCell>
        <TableCell>{contact.yonghu}</TableCell>
        <TableCell>{contact.yiqixinghao}</TableCell>
        <TableCell>{contact.channels}</TableCell>
      </TableRow>
    );
  };
  onSelectBaoxiang = e => {
    this.setState({ baoxiang: e }, () => {
      this.loaddata();
    });
  };
  render = () => {
    const contactRows = this.state.items.map(this.mapfunc);
    const contactRows2 = this.state.items2.map(this.mapfunc2);
    let right = (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>合同号</TableCell>
              <TableCell>仪器号</TableCell>
              <TableCell>用户</TableCell>
              <TableCell>仪器型号</TableCell>
              <TableCell>通道</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="contact-list">{contactRows2}</TableBody>
        </Table>
      </div>
    );
    return (
      <Dialog
        open={this.props.showModal}
        onClose={this.props.handleClose}
        fullScreen
      >
        <AppBar className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              
              onClick={this.props.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              
              className={this.props.classes.flex}
            >
              工作量
            </Typography>
            <DropdownButton
              title={'包箱:' + this.state.baoxiang}
              id="id_dropdown2"
            >
              <MenuItem onClick={() => this.onSelectBaoxiang('')}>*</MenuItem>
              <MenuItem onClick={() => this.onSelectBaoxiang('马红权')}>
                马红权
              </MenuItem>
              <MenuItem onClick={() => this.onSelectBaoxiang('陈旺')}>
                陈旺
              </MenuItem>
              <MenuItem onClick={() => this.onSelectBaoxiang('吴振宁')}>
                吴振宁
              </MenuItem>
            </DropdownButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div style={{ display: 'flex' }}>
            <div style={{ border: 'solid 1px' }}>
              未报工作量仪器
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>日期</TableCell>
                    <TableCell>仪器号</TableCell>
                    <TableCell>用户</TableCell>
                    <TableCell>通道</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody id="contact-list">{contactRows}</TableBody>
              </Table>
              <Button
                variant="contained"
                id="page_go"
                className="btn btn-info"
                onClick={this.jump}
              >
                全部
              </Button>
            </div>
            <div style={{ border: 'solid 1px' }}>
              本月({this.current_str})工作量
              {right}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(DlgItems);
