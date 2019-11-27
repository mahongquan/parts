import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from './DropdownButton';
import update from 'immutability-helper';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import DlgFolder from './DlgFolder';
import { withStyles } from '@material-ui/core/styles';
import DlgStatMonth from './DlgStatMonth';
import DlgStatYear from './DlgStatYear';
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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CONTACTActions, types } from './reducers';

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
    paddingTop: theme.spacing(1),
    paddingRight: 0,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
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
  constructor(props) {
    super(props);
    this.dlgwait = React.createRef();
    this.dlgurl = React.createRef();
    this.dlgfolder = React.createRef();
    this.dlgcopypack = React.createRef();
    this.dlgcheck = React.createRef();
    this.dlgpacks = React.createRef();
    this.dlgimport = React.createRef();
    this.dlgimportHT = React.createRef();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.logined && nextProps.logined) {
      this.props.actions.loadCONTACT({
        start: this.props.start,
        limit: this.props.limit,
        search: this.props.search,
        baoxiang: this.props.baoxiang,
      });
    }
  }

  handleContactChange = (idx, contact) => {
    this.props.store.handleContactChange(idx, contact);
  };
  handleClickFilter = event => {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.setState({ target: event.target, showcontext: true });
  };
  componentDidMount = () => {
    // this.props.dispatch({type:types.LOAD_CONTACT});
    this.props.actions.loadCONTACT({
      start: this.props.start,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: this.props.baoxiang,
    });
  };
  onLoginSubmit = data => {
    this.props.actions.onLoginSubmit(data);
  };
  handleUserChange = user => {
    this.props.store.handleUserChange(user);
  };
  handleLogout = () => {
    this.props.actions.handleLogout();
  };
  keypress = e => {
    if (e.which !== 13) return;
    // console.log('你按了回车键...');

    this.search();
  };
  handleSearchChange = e => {
    this.props.dispatch({ type: types.SEARCH_CHANGE, value: e.target.value });
  };

  handlePrev = e => {
    let start = this.props.start - this.props.limit;
    if (start < 0) {
      start = 0;
    }
    this.setState({ start: start });
    this.props.actions.loadCONTACT({
      start: start,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: this.props.baoxiang,
    });
  };
  search = e => {
    this.props.actions.loadCONTACT({
      start: 0,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: this.props.baoxiang,
    });
  };
  jump = () => {
    let start = parseInt(this.props.start_input, 10) - 1;
    if (start > this.props.total - this.props.limit)
      start = this.props.total - this.props.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.props.actions.loadCONTACT({
      start: start,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: this.props.baoxiang,
    });
  };
  handlePageChange = e => {
    this.props.dispatch({ type: types.PAGE_CHANGE, value: e.target.value });
  };

  onDetailClick = contactid => {
    // console.log(contactid);
    // window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    this.setState({ showDlgDetail: true, contactid: contactid });
  };
  handleNext = e => {
    let start = this.props.start + this.props.limit;
    if (start > this.props.total - this.props.limit)
      start = this.props.total - this.props.limit; //total >limit
    if (start < 0) {
      start = 0;
    }
    this.props.actions.loadCONTACT({
      start: start,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: this.props.baoxiang,
    });
  };
  onSelectBaoxiang = e => {
    this.props.actions.loadCONTACT({
      start: 0,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: e,
    });
  };
  handleEdit = idx => {
    // this.setState({ showDlgEdit: true, currentIndex: idx });
    this.props.dispatch({
      type: types.SHOW_DLG_EDIT,
      visible: true,
      index: idx,
    });
  };
  opendlgwait = contactid => {
    this.dlgwait.current.open(contactid);
  };
  handleContactChange2 = contact => {
    var idx = this.currentIndex;
    console.log(idx);
    let contacts2;
    if (idx != null) {
      contacts2 = update(this.props.contacts, {
        [idx]: { $set: contact },
      });
      console.log(contacts2);
    } else {
      contacts2 = update(this.props.contacts, {
        $unshift: [contact],
      });
    }
    this.setState({ contacts: contacts2 });
  };
  opendlgurl = (url, parent, idx, data) => {
    this.currentIndex = idx;
    this.dlgurl.current.open(url, data, this.handleContactChange2);
  };
  openDlgItems = () => {
    // this.dlgitems.current.open();
    this.props.dispatch({ type: types.SHOW_DLG_ITEMS, visible: true});
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
  // openDlgStat = () => {
  //   this.dlgstat.current.open();
  // };
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
    console.log('render====================================================');
    console.log(this.props);
    const contactRows = this.props.contacts.map((contact, idx) => (
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
    console.log(this.props);
    //console.log(this.props);
    if (this.props.start === 0) {
      hasprev = false;
    }
    //console.log(this.props.start+this.props.limit>=this.props.total);
    if (this.props.start + this.props.limit >= this.props.total) {
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
          showModal={this.props.showDlgWorkMonth}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_WORKMONTH, visible: false });
          }}
          baoxiang={this.props.baoxiang}
        />
        <DlgItems
          showModal={this.props.showDlgItem}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_ITEMS, visible: false });
          }}
        />
        <DlgPacks ref={this.dlgpacks} />
        <DlgCopyPack ref={this.dlgcopypack} />
        <DlgStatMonth open={this.props.showDlgStatMonth}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLGSTAT_MONTH, visible: false });
          }}
        />
        <DlgImport
          showModal={this.props.showDlgImport}
          handleClose={() => {
            this.setState({ showDlgImport: false });
          }}
        />
        <DlgImportHT ref={this.dlgimportHT} parent={this} />
        <DlgCheck ref={this.dlgcheck} />
        <DlgFolder ref={this.dlgfolder} />
        <DlgWait showModal={this.props.show_dlgwait}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_WAIT, visible: false });
          }}
        />
        <DlgUrl ref={this.dlgurl} />

        <DlgLogin
          showModal={this.props.show_login}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_LOGIN,visible:false});
          }}
          onLoginSubmit={this.onLoginSubmit}
        />
        <DlgDetail
          contactid={this.props.contactid}
          showModal={this.props.showDlgDetail}
          handleClose={() => {
            this.setState({ showDlgDetail: false });
          }}
        />
        <DlgStatYear open={this.props.showDlgStatYear}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLGSTAT_YEAR, visible: false });
          }}
        />
        <ContactEdit2New
          showModal={this.props.showDlgEdit}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_EDIT, visible: false });
          }}
          contacts={this.props.contacts}
          dispatch={this.props.dispatch}
          hiddenPacks={this.props.hiddenPacks}
          index={this.props.currentIndex}
          actions={this.props.actions}
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
              <MenuItem onClick={
                ()=>{this.props.dispatch({ type: types.SHOW_DLGSTAT_MONTH, visible: true });
              }}>月</MenuItem>
              <MenuItem
                onClick={() => {
                  this.props.dispatch({ type: types.SHOW_DLGSTAT_YEAR, visible: true });
                }}
              >
                年
              </MenuItem>
            </DropdownButton>
            <DropdownButton
              title={'包箱:' + this.props.baoxiang}
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
              value={this.props.search}
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
                // this.setState({ showDlgWorkMonth: true });
                this.props.dispatch({ type: types.SHOW_DLG_WORKMONTH, visible: true });
              }}
            >
              工作量
            </Button>
            <DropdownButton title={this.props.user} id="id_dropdown1">
              {this.props.user !== 'AnonymousUser' ? (
                <MenuItem onClick={this.handleLogout}>注销</MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    this.props.dispatch({ type: types.SHOW_LOGIN,visible:true });
                  }}
                >
                  登录
                </MenuItem>
              )}
            </DropdownButton>
          </Toolbar>
        </AppBar>
        <div
          align="center"
          style={{
            display: this.props.connect_error ? '' : 'none',
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
          {this.props.start + 1}../{this.props.total}
        </label>
        {next}
        <input
          maxLength="6"
          size="6"
          onChange={this.handlePageChange}
          value={this.props.start_input}
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
const mapStateToProps = state => {
  // console.log(state);
  return state.CONTACTs;
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CONTACTActions, dispatch),
  dispatch: dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));

