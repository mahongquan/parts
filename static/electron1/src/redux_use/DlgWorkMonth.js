// import { useSelector, useDispatch } from 'react-redux';
// import * as store from './reducers/partsSlice';
import React from 'react';
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
import UserDropDown from './UserDropDown';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import Datetime from 'react-datetime';
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

function lastDay(m) {
  var m1 = moment([m.year(), m.month(), 1]);
  m1.add(1, 'months');
  // console.log(m.format('YYYY-MM-DD'))
  m1.subtract(1, 'days');
  // console.log(m.format('YYYY-MM-DD'))
  return m1;
}
class DlgWorkMonth extends React.Component {
  constructor() {
    super();
    this.state = {
      month: moment(),
      items: [],
      items2: [],
      start: 0,
      total: 0,
      limit: 10,
      search: '',
      start_input: 1,
      baoxiang: '',
    };
  }
  prev = () => {
    //m.subtract(2, 'months')
    var m = this.state.month.clone();
    m.subtract(1, 'months');
    this.setState({ month: m }, () => {
      this.loaddata();
    });
    console.log(this.state);
  };
  next = () => {
    var m = this.state.month.clone();
    m.add(1, 'months');
    this.setState({ month: m }, () => {
      this.loaddata();
    });
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal) {
      this.open();
    } else if (prevProps.showModal && !this.props.showModal) {
      // this.onHide();
    }
  }
  yujifahuo_date_change = (value) => {
    var t = null;
    if (typeof value === 'string') {
      t = value;
    } else {
      t = value.format('YYYY-MM');
    }
    this.setState({ month: moment(t) }, () => {
      this.loaddata();
    });
  };
  close = () => {
    console.log('close');
  };
  open = () => {
    this.loaddata();
  };
  loaddata = () => {
    // window.m=this.state.month;
    // window.moment=moment;
    var baoxiang = this.state.baoxiang;
    let end_date = lastDay(this.state.month);
    var start_date = end_date.clone();
    start_date.subtract(2, 'months');
    // var start_date_s = start_date.format('YYYY-MM-DD');
    // let end_date_s = end_date.format('YYYY-MM-DD');
    // this.end_date = end_date;
    // this.end_date_s = end_date_s;
    let cmd =
      "select * from parts_contact  where work_month IS NULL and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date.format('YYYY-MM-DD') +
      "' and '" +
      end_date.format('YYYY-MM-DD') +
      "'";
    Client.sql(cmd, (contacts2) => {
      // console.log(contacts2);
      this.setState({
        items: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
        total: contacts2.total,
      });
    });

    // let current_str = end_date.format('YYYY-MM');
    // this.current_str = current_str;
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "select * from parts_contact  where strftime('%Y-%m',work_month)='" +
      end_date.format('YYYY-MM') +
      "' and baoxiang like '" +
      baoxiang +
      "'  and tiaoshi_date between '" +
      start_date.format('YYYY-MM-DD') +
      "' and '" +
      end_date.format('YYYY-MM-DD') +
      "'";
    Client.sql(cmd2, (contacts2) => {
      // console.log(contacts2);
      this.setState({
        items2: contacts2.data, //.slice(0, MATCHING_ITEM_LIMIT),
      });
    });
  };
  jump = () => {
    this.state.items.forEach((one, idx) => {
      console.log(idx);
      this.handleEdit(idx);
    });
  };
  handleEdit = (idx) => {
    let contact = this.state.items[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 =
      "update parts_contact set work_month='" +
      this.state.month.format('YYYY-MM-DD') +
      "' where id=" +
      contact.id;
    Client.sql(cmd2, (contacts2) => {
      console.log(contacts2);
      this.loaddata();
    });
  };
  handleEdit2 = (idx) => {
    let contact = this.state.items2[idx];
    let cmd2; //strftime('%Y',tiaoshi_date) as month,count(id) as ct
    cmd2 = 'update parts_contact set work_month=NULL where id=' + contact.id;
    Client.sql(cmd2, (contacts2) => {
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
  onSelectBaoxiang = (e) => {
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
            <IconButton onClick={this.props.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={this.props.classes.flex}>
              工作量
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserDropDown
                store={this.props.store}
                titile=""
                onSelect={this.onSelectBaoxiang}
              />
              <span>{this.state.baoxiang}</span>
              <DatePicker
                format="YYYY-MM-DD"
                value={this.state.month}
                onChange={this.yujifahuo_date_change}
              />
            </div>
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
                <Button variant="outlined" onClick={this.jump}>
                  全部
                </Button>
              </div>
              <div style={{ border: 'solid 1px' }}>{right}</div>
            </div>
          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
    );
  };
}
export default withStyles(styles)(DlgWorkMonth);
