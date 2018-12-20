import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Overlay } from 'react-bootstrap';
import DropdownButton from './DropdownButton';
import update from 'immutability-helper';
import Client from './Client';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import DlgFolder from './DlgFolder';
import { withStyles } from '@material-ui/core/styles';
import DlgStat from './DlgStat';
import DlgStat2 from './DlgStat2';
import DlgImport from './DlgImport';
import DlgImportHT from './DlgImportHT';
import DlgCheck from './DlgCheck';
import DlgUrl from './DlgUrl';
import DlgCopyPack from './DlgCopyPack';
import DlgItems from './DlgItems';
import DlgPacks from './DlgPacks';
import DlgDetail from './DlgDetail';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// var socket = require('../data/seq');
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 1020,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  inputRoot: {
    color: 'inherit',
    width: '132px',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 132,
      '&:focus': {
        width: 132,
      },
    },
  },
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#333333',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
class App extends Component {
  mystate = {
    start: 0,
    limit: 10,
    total: 0,
    baoxiang: '',
    logined: false,
    search: '',
  };
  state = {
    connect_error: false,
    search2: '',
    search2tip: '',
    target: null,
    showcontext: false,
    contacts: [],
    limit: 10,
    user: 'AnonymousUser',
    start: 0,
    total: 0,
    search: '',
    start_input: 1,
    currentIndex: null,
    baoxiang: '',
    showDlgImport: false,
    showDlgEdit: false,
    showDlgDetail: false,
    showDlgTodos: false,
    showDlgStat2: false,
  };
  constructor(props) {
    super(props);
    this.dlgwait = React.createRef();
    this.dlgitems = React.createRef();
    this.dlgurl = React.createRef();
    this.dlgfolder = React.createRef();
    this.dlgcopypack = React.createRef();
    this.dlgcheck = React.createRef();
    this.dlgstat = React.createRef();
    this.dlgpacks = React.createRef();
    this.dlgimport = React.createRef();
    this.dlglogin = React.createRef();
    this.dlgimportHT = React.createRef();
  }
  handleClickFilter = event => {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.setState({ target: event.target, showcontext: true });
    // setTimeout(()=>{
    //         this.setState({showcontext:false});
    //     },5000);
  };
  componentDidMount = () => {
    // socket.init(() => {
    this.load_data();
    // });
  };
  load_data = () => {
    Client.contacts(
      {
        start: this.mystate.start,
        limit: this.mystate.limit,
        search: this.mystate.search,
        baoxiang: this.mystate.baoxiang,
      },
      contacts => {
        var user = contacts.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.mystate.total = contacts.total; //because async ,mystate set must before state;
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          limit: this.mystate.limit,
          user: user,
          total: contacts.total,
          start: this.mystate.start,
        });
      },
      error => {
        // console.log(typeof(error));
        console.log(error);
        if (error instanceof SyntaxError) {
          this.openDlgLogin();
        } else {
          this.setState({ connect_error: true });
        }
      }
    );
  };
  handleContactChange = (idx, contact) => {
    console.log(idx);
    let contacts2;
    if (idx != null) {
      contacts2 = update(this.state.contacts, { [idx]: { $set: contact } });
      console.log(contacts2);
    } else {
      contacts2 = update(this.state.contacts, { $unshift: [contact] });
    }
    this.setState({ contacts: contacts2 });
  };
  handleUserChange = user => {
    if (user === 'AnonymousUser') {
      this.setState({
        logined: false,
      });
    } else {
      this.setState({
        logined: true,
      });
    }
    this.setState({
      user: user,
      contacts: [], //slice(0, MATCHING_ITEM_LIMIT),
    });
    this.load_data();
  };
  handleLogout = () => {
    console.log('logout');
    Client.logout(data => {
      console.log('logout' + data);
      this.setState({
        logined: false,
        user: 'AnonymousUser',
        total: 0,
        start: 0,
      });
      this.handleUserChange(this.state.user);
    });
  };
  keypress = e => {
    if (e.which !== 13) return;
    // console.log('你按了回车键...');

    this.search();
  };
  handleSearchChange = e => {
    this.mystate.search = e.target.value;
    this.setState({ search: this.mystate.search });
  };
  handleSearch2Change = e => {
    this.setState({ search2: e.target.value });
  };
  handlePrev = e => {
    this.mystate.start = this.mystate.start - this.mystate.limit;
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.load_data();
  };
  search = e => {
    this.mystate.start = 0;
    this.load_data();
  };
  jump = () => {
    this.mystate.start = parseInt(this.state.start_input, 10) - 1;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.load_data();
  };
  handlePageChange = e => {
    this.setState({ start_input: e.target.value });
  };

  onDetailClick = contactid => {
    // console.log(contactid);
    // window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    this.setState({ showDlgDetail: true, contactid: contactid });
  };
  handleNext = e => {
    this.mystate.start = this.mystate.start + this.mystate.limit;
    if (this.mystate.start > this.mystate.total - this.mystate.limit)
      this.mystate.start = this.mystate.total - this.mystate.limit; //total >limit
    if (this.mystate.start < 0) {
      this.mystate.start = 0;
    }
    this.load_data();
  };
  onSelectBaoxiang = e => {
    this.mystate.start = 0;
    this.mystate.baoxiang = e;
    this.setState({ baoxiang: e });
    this.load_data();
  };
  auto_change = (event, value) => {
    console.log('auto_change');
    if (value.length > 1) {
      this.setState({ auto_value: value, auto_loading: true });
      Client.get('/rest/Pack', { search: value }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      });
    } else {
      this.setState({ auto_value: value, auto_loading: false });
    }
  };
  onLoginSubmit = data => {
    // console.log(data);
    Client.login(data.username, data.password, res => {
      if (res.success) {
        this.setState({
          logined: true,
        });
        this.setState({
          user: data.username,
        });
        this.handleUserChange(this.state.user);
      }
    });
  };
  handleEdit = idx => {
    this.setState({ showDlgEdit: true, currentIndex: idx });
    //this.setState({});
    //this.refs.contactedit.open2(idx);
  };
  //<Button onClick={()=>this.opendlgurl("/rest/updateMethod",this,idx,contact.id)}>更新方法</Button>
  //<Button onClick={()=>this.opendlgwait(contact.id)}>全部文件</Button>
  opendlgwait = contactid => {
    this.dlgwait.current.open(contactid);
  };
  handleContactChange2 = contact => {
    var idx = this.currentIndex;
    console.log(idx);
    let contacts2;
    if (idx != null) {
      contacts2 = update(this.state.contacts, { [idx]: { $set: contact } });
      console.log(contacts2);
    } else {
      contacts2 = update(this.state.contacts, { $unshift: [contact] });
    }
    this.setState({ contacts: contacts2 });
  };
  opendlgurl = (url, parent, idx, data) => {
    this.currentIndex = idx;
    this.dlgurl.current.open(url, data, this.handleContactChange2);
  };
  openDlgItems = () => {
    this.dlgitems.current.open();
  };
  opendlgfolder = contactid => {
    this.dlgfolder.current.open(contactid);
  };
  opendlgcheck = (contactid, yiqibh) => {
    this.dlgcheck.current.open(contactid, yiqibh);
  };
  openDlgPacks = () => {
    this.dlgpacks.current.open();
  };
  openDlgCopyPack = () => {
    this.dlgcopypack.current.open();
  };
  openDlgStat = () => {
    this.dlgstat.current.open();
  };
  openDlgLogin = () => {
    // console.log("openDlgLogin");
    this.dlglogin.current.open();
  };
  openDlgImport = () => {
    //this.refs.dlgimport.open();
    this.setState({ showDlgImport: true });
  };
  openDlgImportHT = () => {
    this.dlgimportHT.current.open();
  };
  onFilterDW = () => {
    console.log('filter dw');
  };
  closeFilter = () => {
    this.setState({ showcontext: false });
  };
  render() {
    //console.log("render=========================");

    const contactRows = this.state.contacts.map((contact, idx) => (
      <TableRow key={idx} className={this.props.classes.row}>
        <CustomTableCell>{contact.yonghu}</CustomTableCell>
        <CustomTableCell>{contact.hetongbh}</CustomTableCell>
        <CustomTableCell>
          <Button
            variant="outlined"
            style={{ display: 'inline' }}
            onClick={() => this.handleEdit(idx)}
          >
            {contact.yiqibh}
          </Button>
          <DropdownButton title="" id="id_dropdown3">
            <MenuItem onClick={() => this.onDetailClick(contact.id)}>
              详细
            </MenuItem>
            <MenuItem
              onClick={() =>
                this.opendlgurl('/rest/updateMethod', this, idx, {
                  id: contact.id,
                })
              }
            >
              更新方法
            </MenuItem>
            <MenuItem onClick={() => this.opendlgwait(contact.id)}>
              全部文件
            </MenuItem>
            <MenuItem
              onClick={() => this.opendlgcheck(contact.id, contact.yiqibh)}
            >
              核对备料计划
            </MenuItem>
            <MenuItem onClick={() => this.opendlgfolder(contact.id)}>
              资料文件夹
            </MenuItem>
          </DropdownButton>
        </CustomTableCell>
        <CustomTableCell>{contact.yiqixinghao}</CustomTableCell>
        <CustomTableCell>{contact.channels}</CustomTableCell>
        <CustomTableCell>{contact.yujifahuo_date}</CustomTableCell>
        <CustomTableCell>{contact.method}</CustomTableCell>
      </TableRow>
    ));
    // const tooltipdw = (
    //       <Tooltip id="tooltipdw"><strong>dw</strong></Tooltip>
    //     );
    var hasprev = true;
    var hasnext = true;
    let prev;
    let next;
    //console.log(this.mystate);
    //console.log(this.state);
    if (this.state.start === 0) {
      hasprev = false;
    }
    //console.log(this.state.start+this.state.limit>=this.state.total);
    if (this.state.start + this.state.limit >= this.state.total) {
      hasnext = false;
    }
    if (hasprev) {
      prev = (
        <Button variant="outlined" onClick={this.handlePrev}>
          前一页
        </Button>
      );
    } else {
      prev = null;
    }
    if (hasnext) {
      next = (
        <Button variant="outlined" onClick={this.handleNext}>
          后一页
        </Button>
      );
    } else {
      next = null;
    }
    return (
      <div className={this.props.classes.root}>
        <Overlay
          target={this.state.target}
          container={this}
          show={this.state.showcontext}
          placement="bottom"
        >
          <Tooltip id="tooltip1">
            <input
              type="text"
              value={this.state.search2}
              placeholder={this.state.search2tip}
              onChange={this.handleSearch2Change}
            />
            <Button onClick={this.closeFilter}>close</Button>
          </Tooltip>
        </Overlay>
        <DlgItems ref={this.dlgitems} />
        <DlgPacks ref={this.dlgpacks} />
        <DlgCopyPack ref={this.dlgcopypack} />
        <DlgStat ref={this.dlgstat} />
        <DlgImport
          showModal={this.state.showDlgImport}
          handleClose={() => {
            this.setState({ showDlgImport: false });
          }}
        />
        <DlgImportHT ref={this.dlgimportHT} parent={this} />
        <DlgCheck ref={this.dlgcheck} />
        <DlgFolder ref={this.dlgfolder} />
        <DlgWait ref={this.dlgwait} />
        <DlgUrl ref={this.dlgurl} />

        <DlgLogin ref={this.dlglogin} onLoginSubmit={this.onLoginSubmit} />
        <DlgDetail
          contactid={this.state.contactid}
          showModal={this.state.showDlgDetail}
          handleClose={() => {
            this.setState({ showDlgDetail: false });
          }}
        />
        <DlgStat2
          showModal={this.state.showDlgStat2}
          handleClose={() => {
            this.setState({ showDlgStat2: false });
          }}
        />

        <ContactEdit2New
          showModal={this.state.showDlgEdit}
          handleClose={() => {
            this.setState({ showDlgEdit: false });
          }}
          parent={this}
          index={this.state.currentIndex}
          title="编辑"
        />
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={this.props.classes.grow}
            >
              装箱单
            </Typography>
            <Button color="inherit" onClick={this.openDlgPacks}>
              包
            </Button>
            <Button color="inherit" onClick={this.openDlgItems}>
              备件
            </Button>
            <Button color="inherit" onClick={this.openDlgCopyPack}>
              复制包
            </Button>
            <DropdownButton title="统计">
              <MenuItem onClick={this.openDlgStat}>月</MenuItem>
              <MenuItem
                onClick={() => {
                  this.setState({ showDlgStat2: true });
                }}
              >
                年
              </MenuItem>
            </DropdownButton>
            <DropdownButton title="包箱" id="id_dropdown2">
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
            <DropdownButton title={this.state.user} id="id_dropdown1">
              {this.state.user !== 'AnonymousUser' ? (
                <MenuItem onClick={this.handleLogout}>注销</MenuItem>
              ) : (
                <MenuItem onClick={this.openDlgLogin}>登录</MenuItem>
              )}
            </DropdownButton>
            <InputBase
              color="inherit"
              onKeyPress={this.keypress}
              value={this.state.search}
              placeholder="合同/仪器编号/客户"
              classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput,
              }}
              onChange={this.handleSearchChange}
            />
            <Button color="inherit" onClick={this.search}>
              <SearchIcon />
            </Button>
            <Button
              color="inherit"
              style={{ margin: '0px 10px 0px 10px' }}
              variant="contained"
              color="primary"
              onClick={() => this.handleEdit(null)}
            >
              新仪器
            </Button>
            <Button
              color="inherit"
              variant="contained"
              onClick={this.openDlgImport}
            >
              导入标样
            </Button>
            <Button
              color="inherit"
              style={{ margin: '0px 10px 0px 10px', display: 'none' }}
              color="primary"
              onClick={this.openDlgImportHT}
            >
              导入合同
            </Button>
          </Toolbar>
        </AppBar>
        <div
          align="center"
          style={{
            display: this.state.connect_error ? '' : 'none',
            textAlign: 'center',
            color: 'red',
          }}
        >
          !!!!!!!!!!连接错误,服务器未运行!!!!!!!
        </div>
        <div className={this.props.classes.tableWrapper}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>
                  <span onClick={this.handleClickFilter}>客户单位</span>
                </CustomTableCell>
                <CustomTableCell>合同编号</CustomTableCell>
                <CustomTableCell>
                  <span onClick={this.handleClickFilter}>仪器编号</span>
                </CustomTableCell>
                <CustomTableCell>仪器型号</CustomTableCell>
                <CustomTableCell>通道配置</CustomTableCell>
                <CustomTableCell>入库时间</CustomTableCell>
                <CustomTableCell>方法</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{contactRows}</TableBody>
          </Table>
        </div>
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
        <Button id="page_go" onClick={this.jump}>
          跳转
        </Button>
        <div style={{ minHeight: '200px' }} />
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
