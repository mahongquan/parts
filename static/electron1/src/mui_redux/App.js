import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from './DropdownButton';
import update from 'immutability-helper';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import { withStyles } from '@material-ui/core/styles';
import DlgStatMonth from './DlgStatMonth';
import DlgStatYear from './DlgStatYear';
import DlgImport from './DlgImport';
// import DlgImportHT from './DlgImportHT';
import DlgCheck from './DlgCheck';
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

const styles = (theme) => ({
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
const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#333333',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleContactChange = (idx, contact) => {
    this.props.store.handleContactChange(idx, contact);
  };
  handleClickFilter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ target: event.target, showcontext: true });
  };
  componentDidMount = () => {
    this.props.actions.loadCONTACT({
      start: this.props.start,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: this.props.baoxiang,
    });
  };
  onLoginSubmit = (data) => {
    this.props.actions.onLoginSubmit(data);
  };
  handleUserChange = (user) => {
    this.props.store.handleUserChange(user);
  };
  handleLogout = () => {
    this.props.actions.handleLogout();
  };
  keypress = (e) => {
    if (e.which !== 13) return;
    // console.log('你按了回车键...');

    this.search();
  };
  handleSearchChange = (e) => {
    this.props.dispatch({ type: types.SEARCH_CHANGE, value: e.target.value });
  };

  handlePrev = (e) => {
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
  search = (e) => {
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
  handlePageChange = (e) => {
    this.props.dispatch({ type: types.PAGE_CHANGE, value: e.target.value });
  };

  onDetailClick = (contactid) => {
    // console.log(contactid);
    // window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    // this.setState({ showDlgDetail: true, contactid: contactid });
    this.props.actions.details(contactid);
  };
  handleNext = (e) => {
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
  onSelectBaoxiang = (e) => {
    this.props.actions.loadCONTACT({
      start: 0,
      limit: this.props.limit,
      search: this.props.search,
      baoxiang: e,
    });
  };
  handleEdit = (idx) => {
    // this.setState({ showDlgEdit: true, currentIndex: idx });
    if (idx) this.props.actions.loadUsePack(this.props.contacts[idx].id);
    this.props.dispatch({
      type: types.SHOW_DLG_EDIT,
      visible: true,
      index: idx,
    });
  };
  allfile = (contactid) => {
    // this.dlgwait.current.open(contactid);
    // this.props.dispatch({type: types.SHOW_DLG_WAIT, visible: true,index:idx});
    this.props.actions.allfile(contactid);
  };
  updateMethod = (contactid, idx) => {
    // this.dlgwait.current.open(contactid);
    // this.props.dispatch({type: types.SHOW_DLG_WAIT, visible: true,index:idx});
    this.props.actions.updateMethod(contactid, idx);
  };
  handleContactChange2 = (contact) => {
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
  openDlgItems = () => {
    // this.dlgitems.current.open();
    this.props.dispatch({ type: types.SHOW_DLG_ITEMS, visible: true });
  };
  opendlgfolder = (contactid) => {
    // this.dlgfolder.current.open(contactid);
    this.props.actions.forlder(contactid);
  };
  opendlgcheck = (idx) => {
    this.props.dispatch({
      type: types.SHOW_DLG_CHECK,
      visible: true,
      index: idx,
    });
  };
  openDlgPacks = () => {
    // this.dlgpacks.current.open();
    this.props.dispatch({ type: types.SHOW_DLG_PACK, visible: true });
  };
  openDlgCopyPack = () => {
    this.props.dispatch({ type: types.SHOW_DLG_COPYPACK, visible: true });
  };
  // openDlgStat = () => {
  //   this.dlgstat.current.open();
  // };
  openDlgImport = () => {
    this.props.dispatch({ type: types.SHOW_DLG_IMPORT, visible: true });
  };
  // openDlgImportHT = () => {
  //   this.dlgimportHT.current.open();
  // };
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
            <MenuItem onClick={() => this.updateMethod(contact.id, idx)}>
              更新方法
            </MenuItem>
            <MenuItem onClick={() => this.allfile(contact.id)}>
              全部文件
            </MenuItem>
            <MenuItem onClick={() => this.opendlgcheck(idx)}>
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
    const store = {
      detail: this.props.detail,
      contacts: this.props.contacts,
      packitems: this.props.packitems,
      usepacks: this.props.usepacks,
      dispatch: this.props.dispatch,
      hiddenPacks: this.props.hiddenPacks,
      currentIndex: this.props.currentIndex,
      allfile_err: this.props.allfile_err,
      actions: this.props.actions,
    };
    console.log('store==');
    console.log(store);
    return (
      <div className={this.props.classes.root}>
        <DlgWorkMonth
          showModal={this.props.showDlgWorkMonth}
          handleClose={() => {
            this.props.dispatch({
              type: types.SHOW_DLG_WORKMONTH,
              visible: false,
            });
          }}
          baoxiang={this.props.baoxiang}
        />
        <DlgItems
          showModal={this.props.showDlgItem}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_ITEMS, visible: false });
          }}
        />
        <DlgPacks
          showModal={this.props.showDlgPack}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_PACK, visible: false });
          }}
        />
        <DlgCopyPack
          showModal={this.props.showDlgCopyPack}
          handleClose={() => {
            this.props.dispatch({
              type: types.SHOW_DLG_COPYPACK,
              visible: false,
            });
          }}
        />

        <DlgStatMonth
          open={this.props.showDlgStatMonth}
          handleClose={() => {
            this.props.dispatch({
              type: types.SHOW_DLGSTAT_MONTH,
              visible: false,
            });
          }}
        />
        <DlgImport
          showModal={this.props.showDlgImport}
          handleClose={() => {
            this.props.dispatch({
              type: types.SHOW_DLG_IMPORT,
              visible: false,
            });
          }}
        />
        <DlgCheck
          showModal={this.props.showDlgCheck}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_CHECK, visible: false });
          }}
        />
        <DlgWait
          showModal={this.props.showdlgWait}
          store={store}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_WAIT, visible: false });
          }}
        />

        <DlgLogin
          showModal={this.props.show_login}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_LOGIN, visible: false });
          }}
          onLoginSubmit={this.onLoginSubmit}
        />
        <DlgDetail
          contactid={this.props.contactid}
          showModal={this.props.showDlgDetail}
          store={store}
          handleClose={() => {
            this.props.dispatch({
              type: types.SHOW_DLG_DETAIL,
              visible: false,
            });
          }}
        />
        <DlgStatYear
          open={this.props.showDlgStatYear}
          handleClose={() => {
            this.props.dispatch({
              type: types.SHOW_DLGSTAT_YEAR,
              visible: false,
            });
          }}
        />
        <ContactEdit2New
          store={store}
          showModal={this.props.showDlgEdit}
          index={this.props.currentIndex}
          handleClose={() => {
            this.props.dispatch({ type: types.SHOW_DLG_EDIT, visible: false });
          }}
          title="编辑"
        />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={this.props.classes.grow}>
              装箱单
            </Typography>
            <Button onClick={this.openDlgPacks}>包</Button>
            <Button onClick={this.openDlgItems}>备件</Button>
            <Button onClick={this.openDlgCopyPack}>复制包</Button>
            <DropdownButton title="统计">
              <MenuItem
                onClick={() => {
                  this.props.dispatch({
                    type: types.SHOW_DLGSTAT_MONTH,
                    visible: true,
                  });
                }}
              >
                月
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.props.dispatch({
                    type: types.SHOW_DLGSTAT_YEAR,
                    visible: true,
                  });
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
              onKeyPress={this.keypress}
              value={this.props.search}
              placeholder="合同/仪器编号/客户"
              classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput,
              }}
              onChange={this.handleSearchChange}
            />
            <Button onClick={this.search}>
              <SearchIcon />
            </Button>
            <Button
              style={{ margin: '0px 10px 0px 10px' }}
              variant="contained"
              onClick={() => this.handleEdit(null)}
            >
              新仪器
            </Button>
            <Button variant="contained" onClick={this.openDlgImport}>
              导入标样
            </Button>
            <Button
              style={{ margin: '0px 10px 0px 10px', display: 'none' }}
              onClick={this.openDlgImportHT}
            >
              导入合同
            </Button>
            <Button
              variant="contained"
              style={{ margin: '0px 10px 0px 10px' }}
              onClick={() => {
                // this.setState({ showDlgWorkMonth: true });
                this.props.dispatch({
                  type: types.SHOW_DLG_WORKMONTH,
                  visible: true,
                });
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
                    this.props.dispatch({
                      type: types.SHOW_LOGIN,
                      visible: true,
                    });
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
const mapStateToProps = (state) => {
  // console.log("map==============")
  // console.log(state);
  return state.CONTACTs;
};

const mapDispatchToProps = (dispatch) => {
  // console.log("map========================");
  // console.log(dispatch);
  return {
    actions: bindActionCreators(CONTACTActions, dispatch),
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
