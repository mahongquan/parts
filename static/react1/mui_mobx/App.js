import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from './DropdownButton';
import update from 'immutability-helper';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import DlgFolder from './DlgFolder';
import {withStyles } from '@material-ui/core/styles';
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
import DlgWorkMonth from './DlgWorkMonth';
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
import { observer } from 'mobx-react';

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
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.dlgwait = React.createRef();
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
  handleContactChange = (idx, contact)=>{
    this.props.store.handleContactChange(idx,contact);
  }
  handleClickFilter = event => {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.props.store.setState({ target: event.target, showcontext: true });
    // setTimeout(()=>{
    //         this.props.store.setState({showcontext:false});
    //     },5000);
  };
  componentDidMount = () => {
  };
  onLoginSubmit = data => {
    this.props.store.onLoginSubmit(data);
  };
  handleUserChange = user => {
    this.props.store.handleUserChange(user);
  };
  handleLogout = () => {
    this.props.store.handleLogout();
  };
  keypress = e => {
    if (e.which !== 13) return;
    // console.log('你按了回车键...');

    this.search();
  };
  handleSearchChange = e => {
    this.props.store.setState({ search: e.target.value });
  };

  handlePrev = e => {
    let start = this.props.store.state.start - this.props.store.state.limit;
    if (start < 0) {
      start = 0;
    }
    this.props.store.setState({ start: start })
    this.props.store.load_data();
  };
  search = e => {
    this.props.store.setState({ start: 0 });
    this.props.store.load_data();
  };
  jump = () => {
    let start = parseInt(this.props.store.state.start_input, 10) - 1;
    if (start > this.props.store.state.total - this.props.store.state.limit)
      start = this.props.store.state.total - this.props.store.state.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.props.store.setState({ start: start });
    this.props.store.load_data();
  };
  handlePageChange = e => {
    this.props.store.setState({ start_input: e.target.value });
  };

  onDetailClick = contactid => {
    // console.log(contactid);
    // window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    this.props.store.setState({ showDlgDetail: true, contactid: contactid });
  };
  handleNext = e => {
    let start = this.props.store.state.start + this.props.store.state.limit;
    if (start > this.props.store.state.total - this.props.store.state.limit)
      start = this.props.store.state.total - this.props.store.state.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.props.store.setState({ start: start });
    this.props.store.load_data();
  };
  onSelectBaoxiang = e => {
    this.props.store.setState({ baoxiang: e, start: 0 });
      this.props.store.load_data();
  };
  handleEdit = idx => {
    this.props.store.setState({ showDlgEdit: true, currentIndex: idx });
  };
  opendlgwait = contactid => {
    this.dlgwait.current.open(contactid);
  };
  handleContactChange2 = contact => {
    var idx = this.currentIndex;
    console.log(idx);
    let contacts2;
    if (idx != null) {
      contacts2 = update(this.props.store.state.contacts, {
        [idx]: { $set: contact },
      });
      console.log(contacts2);
    } else {
      contacts2 = update(this.props.store.state.contacts, {
        $unshift: [contact],
      });
    }
    this.props.store.setState({ contacts: contacts2 });
  };
  opendlgurl = (url, parent, idx, data) => {
    this.currentIndex = idx;
    this.dlgurl.current.open(url, data, this.handleContactChange2);
  };
  openDlgItems = () => {
    // this.dlgitems.current.open();
    console.log('openDlgItems');
    this.props.store.setState({ showDlgItem: true });
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
    this.props.store.setState({ showDlgImport: true });
  };
  openDlgImportHT = () => {
    this.dlgimportHT.current.open();
  };
  onFilterDW = () => {
    console.log('filter dw');
  };
  closeFilter = () => {
    this.props.store.setState({ showcontext: false });
  };
  render() {
    console.log("render====================================================");

    const contactRows = this.props.store.state.contacts.map((contact, idx) => (
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
    //console.log(this.props.store.state);
    //console.log(this.props.store.state);
    if (this.props.store.state.start === 0) {
      hasprev = false;
    }
    //console.log(this.props.store.state.start+this.props.store.state.limit>=this.props.store.state.total);
    if (
      this.props.store.state.start + this.props.store.state.limit >=
      this.props.store.state.total
    ) {
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
        <DlgWorkMonth
          baoxiang={this.props.store.state.baoxiang}
          showModal={this.props.store.state.showDlgWorkMonth}
          handleClose={() => {
            this.props.store.setState({ showDlgWorkMonth: false });
          }}
        />
        <DlgItems
          showModal={this.props.store.state.showDlgItem}
          handleClose={() => {
            this.props.store.setState({ showDlgItem: false });
          }}
        />
        <DlgPacks ref={this.dlgpacks} />
        <DlgCopyPack ref={this.dlgcopypack} />
        <DlgStat ref={this.dlgstat} />
        <DlgImport
          showModal={this.props.store.state.showDlgImport}
          handleClose={() => {
            this.props.store.setState({ showDlgImport: false });
          }}
        />
        <DlgImportHT ref={this.dlgimportHT} parent={this} />
        <DlgCheck ref={this.dlgcheck} />
        <DlgFolder ref={this.dlgfolder} />
        <DlgWait ref={this.dlgwait} />
        <DlgUrl ref={this.dlgurl} />

        <DlgLogin
          showModal={this.props.store.state.showDlgLogin}
          handleClose={() => {
            this.props.store.setState({ showDlgLogin: false });
          }}
          onLoginSubmit={this.onLoginSubmit}
        />
        <DlgDetail
          contactid={this.props.store.state.contactid}
          showModal={this.props.store.state.showDlgDetail}
          handleClose={() => {
            this.props.store.setState({ showDlgDetail: false });
          }}
        />
        <DlgStat2
          showModal={this.props.store.state.showDlgStat2}
          handleClose={() => {
            this.props.store.setState({ showDlgStat2: false });
          }}
        />

        <ContactEdit2New
          store={this.props.store}
          showModal={this.props.store.state.showDlgEdit}
          handleClose={() => {
            this.props.store.setState({ showDlgEdit: false });
          }}
          parent={this}
          index={this.props.store.state.currentIndex}
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
                  this.props.store.setState({ showDlgStat2: true });
                }}
              >
                年
              </MenuItem>
            </DropdownButton>
            <DropdownButton
              title={'包箱:' + this.props.store.state.baoxiang}
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

            <InputBase
              color="inherit"
              onKeyPress={this.keypress}
              value={this.props.store.state.search}
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
              onClick={this.openDlgImportHT}
            >
              导入合同
            </Button>
            <Button
              color="inherit"
              variant="contained"
              style={{ margin: '0px 10px 0px 10px' }}
              onClick={() => {
                this.props.store.setState({ showDlgWorkMonth: true });
              }}
            >
              工作量
            </Button>
            <DropdownButton
              title={this.props.store.state.user}
              id="id_dropdown1"
            >
              {this.props.store.state.user !== 'AnonymousUser' ? (
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
            display: this.props.store.state.connect_error ? '' : 'none',
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
          {this.props.store.state.start + 1}../{this.props.store.state.total}
        </label>
        {next}
        <input
          maxLength="6"
          size="6"
          onChange={this.handlePageChange}
          value={this.props.store.state.start_input}
        />
        <Button id="page_go" variant="contained" onClick={this.jump}>
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
