import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from './DropdownButton';
import DropdownButton2 from './DropdownButton2';
import update from 'immutability-helper';
import Client from './Client';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import DlgFolder from './DlgFolder';
import DlgFolder2 from './DlgFolder2';
import { withStyles } from '@material-ui/core/styles';
import DlgStat from './DlgMonthStat';
import DlgStat2 from './DlgYearStat';
import DlgImport from './DlgImport';
import DlgImportHT from './DlgImportHT';
import DlgCheck from './DlgCheck';
import DlgUrl from './DlgUrl';
import DlgCopyPack from './DlgCopyPack';
import DlgItems from './DlgItems';
import DlgPacks from './DlgPacks';
import DlgDetail from './DlgDetail';
import DlgWorkMonth from './DlgWorkMonth';
import DlgWebview from './DlgWebview2';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import myglobal from '../myglobal';
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
    // paddingTop: theme.spacing(1),
    paddingRight: 0,
    // paddingBottom: theme.spacing(1),
    // paddingLeft: theme.spacing(1),
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
  state = {
    connect_error: false,
    search2: '',
    search2tip: '',
    target: null,
    showcontext: false,
    contacts: [],
    limit: 15,
    user: 'AnonymousUser',
    start: 0,
    total: 0,
    search: '',
    start_input: 1,
    currentIndex: null,
    contactid:null,
    baoxiang: '',
    showDlgImport: false,
    showDlgEdit: false,
    showDlgDetail: false,
    showDlgTodos: false,
    showDlgItem: false,
    showDlgLogin: false,
    showDlgFolder2: false,
    showDlgFolder:false,
    showDlgUrl:false,
    showDlgStat:false,
    showWebview:false,
    url:"about:blank",
  };
  constructor(props) {
    super(props);
    myglobal.app=this;
    this.dlgwait = React.createRef();
    this.dlgcopypack = React.createRef();
    this.dlgcheck = React.createRef();
    this.dlgstat = React.createRef();
    this.dlgpacks = React.createRef();
    this.dlgimportHT = React.createRef();
  }
  show_webview=(url)=>{
    this.setState({showWebview:true,url:url});
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
    // Client.init(this.props.models, () => {
      this.load_data();
    // });
  };
  load_data = () => {
    Client.contacts(
      {
        start: this.state.start,
        limit: this.state.limit,
        search: this.state.search,
        baoxiang: this.state.baoxiang,
      },
      contacts => {
        // myglobal.app.show_webview(contacts);
        var user = contacts.user;
        if (user === undefined) {
          user = 'AnonymousUser';
        }
        this.setState({
          contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
          user: user,
          total: contacts.total,
          connect_error:false,
        });
      },
      (error)=>{
        console.log(error)
        if (error.type==="invalid-json") {
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
    this.setState({ search: e.target.value });
  };
  handleSearch2Change = e => {
    this.setState({ search2: e.target.value });
  };
  handlePrev = e => {
    let start = this.state.start - this.state.limit;
    if (start < 0) {
      start = 0;
    }
    this.setState({ start: start }, () => {
      this.load_data();
    });
  };
  search = e => {
    this.setState({ start: 0 }, () => {
      this.load_data();
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
      this.load_data();
    });
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
    let start = this.state.start + this.state.limit;
    if (start > this.state.total - this.state.limit)
      start = this.state.total - this.state.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.setState({ start: start }, () => {
      this.load_data();
    });
  };
  onSelectBaoxiang = e => {
    this.setState({ baoxiang: e, start: 0 }, () => {
      this.load_data();
    });
  };
  auto_change = (event, value) => {
    console.log('auto_change');
    if (value.length > 1) {
      this.setState({ auto_value: value, auto_loading: true });
      Client.get('/rest/Pack', { search: value }, items => {
        this.setState({ auto_items: items.data, auto_loading: false });
      },(error)=>{
      myglobal.app.show_webview(error.response.url);
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
    },(error)=>{
      console.log(error);
      myglobal.app.show_webview(error.response.url);
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
  // opendlgurl = (url, parent, idx, data) => {
  //   this.currentIndex = idx;
  //   this.dlgurl.current.open(url, data, this.handleContactChange2);
  // };
  openDlgItems = () => {
    // this.dlgitems.current.open();
    console.log('openDlgItems');
    this.setState({ showDlgItem: true });
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
    this.setState({ showDlgStat: true });
  };
  openDlgLogin = () => {
    // console.log("openDlgLogin");
    // this.dlglogin.current.open();
    this.setState({showDlgLogin:true});
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
    console.log("render=========================");
    console.log(this.state);

    const contactRows = this.state.contacts.map((contact, idx) => (
      <TableRow key={idx} className={this.props.classes.row}>
        <CustomTableCell>{contact.yonghu}</CustomTableCell>
        <CustomTableCell>{contact.hetongbh}</CustomTableCell>
        <CustomTableCell>
          <DropdownButton2 click_title={() => this.handleEdit(idx)} 
            title={contact.yiqibh} 
            >
            <MenuItem onClick={() => this.onDetailClick(contact.id)}>
              详细
            </MenuItem>
            <MenuItem
              onClick={() =>{
                // this.opendlgurl('/rest/updateMethod', this, idx, {
                //   id: contact.id,
                // })
                this.setState({
                  url:"/rest/updateMethod",
                  contactid:contact.id,
                  currentIndex:idx,
                  showDlgUrl:true});
              }}
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
            <MenuItem onClick={() =>{
              this.setState({contactid:contact.id,showDlgFolder:true});
            }}>
              资料文件夹
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.setState({contactid:contact.id, showDlgFolder2: true });
              }}
            >
              资料文件夹2
            </MenuItem>
          </DropdownButton2>
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
        <DlgWebview
          open={this.state.showWebview}
          url={this.state.url}
          onClose={() => {
            this.setState({ showWebview: false });
          }}
        />
        <DlgWorkMonth
          baoxiang={this.state.baoxiang}
          showModal={this.state.showDlgWorkMonth}
          handleClose={() => {
            this.setState({ showDlgWorkMonth: false });
          }}
        />
        <DlgItems 
          showModal={this.state.showDlgItem}
          handleClose={() => {
            this.setState({ showDlgItem: false });
          }}
        />
        <DlgPacks ref={this.dlgpacks} />
        <DlgCopyPack ref={this.dlgcopypack} />
        
        <DlgImport
          showModal={this.state.showDlgImport}
          handleClose={() => {
            this.setState({ showDlgImport: false });
          }}
        />
        <DlgImportHT ref={this.dlgimportHT} parent={this} />
        <DlgCheck ref={this.dlgcheck} />
        <DlgFolder contactid={this.state.contactid}
          open={this.state.showDlgFolder}
          onClose={() => {
            this.setState({ showDlgFolder: false });
          }}
        />
        <DlgWait ref={this.dlgwait} />
        <DlgUrl  contactid={this.state.contactid}
          url={this.state.url}
          idx={this.state.currentIndex}
          handleContactChange2={this.handleContactChange2}
          open={this.state.showDlgUrl}
          onClose={() => {
            this.setState({ showDlgUrl: false });
          }} />

        <DlgLogin
          open={this.state.showDlgLogin}
          onClose={() => {
            this.setState({ showDlgLogin: false });
          }}
          onLoginSubmit={this.onLoginSubmit}
        />
        <DlgDetail
          contactid={this.state.contactid}
          showModal={this.state.showDlgDetail}
          handleClose={() => {
            this.setState({ showDlgDetail: false });
          }}
        />
        <DlgStat showModal={this.state.showDlgStat}
          handleClose={() => {
            this.setState({ showDlgStat: false });
          }}
        />

        <DlgStat2
          showModal={this.state.showDlgStat2}
          handleClose={() => {
            this.setState({ showDlgStat2: false });
          }}
        />
        <DlgFolder2
          open={this.state.showDlgFolder2}
          onClose={() => {
            this.setState({ showDlgFolder2: false });
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
              className={this.props.classes.grow}
            >
              装箱单
            </Typography>
            <DropdownButton
              title={'包箱:' + this.state.baoxiang}
              id="id_dropdown2">
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
            <Button variant="outlined"  onClick={this.search}>
              <InputBase variant="outlined"
                onKeyPress={this.keypress}
                value={this.state.search}
                placeholder="合同/仪器编号/客户"
                classes={{
                  root: this.props.classes.inputRoot,
                  input: this.props.classes.inputInput,
                }}
                onChange={this.handleSearchChange}
              />
              <SearchIcon />
            </Button>
            <Button
              color="inherit"
              style={{ margin: '0px 10px 0px 10px' }}
              variant="outlined" 
              onClick={() => this.handleEdit(null)}
            >
              新仪器
            </Button>
            <Button
              variant="outlined" 
              onClick={this.openDlgImport}
            >
              导入标样
            </Button>
            <Button variant="outlined" onClick={this.openDlgCopyPack}>
              复制包
            </Button>
            
            <DropdownButton title="杂项">
              <MenuItem onClick={()=>{this.setState({showWebview:true})}}>
                webview
              </MenuItem>
              <MenuItem onClick={()=>{
                this.load_data();
              }}>
                reload 
              </MenuItem>
             <MenuItem onClick={this.openDlgPacks}>
              包
             </MenuItem>
             <MenuItem onClick={this.openDlgItems}>
              备件
             </MenuItem>
              <MenuItem onClick={this.openDlgStat}>月统计</MenuItem>
              <MenuItem
                onClick={() => {
                  this.setState({ showDlgStat2: true });
                }}
              >
                年统计
              </MenuItem>
              <MenuItem onClick={() => {
                this.setState({ showDlgWorkMonth: true });
              }}>工作量</MenuItem>
              <MenuItem style={{display: 'none' }} onClick={this.openDlgImportHT}>导入合同</MenuItem>

            </DropdownButton>
            <DropdownButton title={this.state.user} id="id_dropdown1">
              {this.state.user !== 'AnonymousUser' ? (
                <MenuItem onClick={this.handleLogout}>注销</MenuItem>
              ) : (
                <MenuItem onClick={this.openDlgLogin}>登录</MenuItem>
              )}
            </DropdownButton>
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
