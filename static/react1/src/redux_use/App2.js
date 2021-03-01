import React from 'react';
import DropdownButton from './DropdownButton';
import DlgLogin from './DlgLogin';
import ContactEdit2New from './ContactEdit2New';
import DlgWait from './DlgWait';
import { withStyles } from '@material-ui/core/styles';
import DlgStatMonth from './DlgStatMonth';
import DlgStatYear from './DlgStatYear';
import DlgImport from './DlgImport';
import DlgCheck from './DlgCheck';
import DlgCopyPack from './DlgCopyPack';
import DlgItems from './DlgItems';
import DlgPacks from './DlgPacks';
import UserDropDown from "./UserDropDown";
// import DlgDetail from './DlgDetail';
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
import { useSelector, useDispatch } from 'react-redux';
import * as slice from './reducers/partsSlice';
// import {useMount} from 'react-use';
const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#333333',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
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
// window.slice=slice;
function App(props) {
  const dispatch = useDispatch();
  var contacts = useSelector((state) => state.parts.contacts);
  var start = useSelector((state) => state.parts.start);
  var limit = useSelector((state) => state.parts.limit);
  var search = useSelector((state) => state.parts.search);
  var baoxiang = useSelector((state) => state.parts.baoxiang);
  var total = useSelector((state) => state.parts.total);
  var connect_error = useSelector((state) => state.parts.connect_error);
  var start_input = useSelector((state) => state.parts.start_input);
  var user = useSelector((state) => {
    return state.parts.user;
  });
  React.useEffect(() => {
    console.log("App render=====================================");
    console.log(props.store.getState());
  });
  React.useEffect(() => {
    console.log("one time")
    // window.addEventListener('keydown', handleKeyDown);
    dispatch(slice.loadCONTACT({start:start,limit:limit}));
    dispatch(slice.load_user());
    // return () => {
    //   console.log("remove");
    //   window.removeEventListener('keydown', handleKeyDown);
    // };
  }, []);
  // componentDidMount = () => {
  //   props.actions.loadCONTACT({
  //     start: props.start,
  //     limit: props.limit,
  //     search: props.search,
  //     baoxiang: props.baoxiang,
  //   });
  // };
  const onLoginSubmit = (data) => {
    dispatch(slice.onLoginSubmit(data));
  };
  // const handleUserChange = (user) => {
  //   props.slice.handleUserChange(user);
  // };
  const handleLogout = () => {
    props.actions.handleLogout();
  };
  const keypress = (e) => {
    if (e.which !== 13) return;
    search_go();
  };
  const handleSearchChange = (e) => {
    dispatch(slice.actions.SEARCH_CHANGE(e.target.value));
  };

  const handlePrev = (e) => {
    let start2 = start - limit;
    if (start2 < 0) {
      start2 = 0;
    }
    dispatch(
      slice.loadCONTACT({
        start: start2,
        limit: limit,
        search: search,
        baoxiang: baoxiang,
      })
    );
  };
  const search_go = (e) => {
    dispatch(
      slice.loadCONTACT({
        start: 0,
        limit: limit,
        search: search,
        baoxiang: baoxiang,
      })
    );
  };
  const jump = () => {
    let start2 = parseInt(start_input, 10) - 1;
    if (start2 > total - limit) start2 = total - limit; //total >limit
    if (start2 < 0) {
      start2 = 0;
    }
    dispatch(
      slice.loadCONTACT({
        start: start2,
        limit: limit,
        search: search,
        baoxiang: baoxiang,
      })
    );
    
  };
  const handlePageChange = (e) => {
    dispatch(slice.actions.PAGE_CHANGE(e.target.value));
  };

  const onDetailClick = (contactid) => {
    // console.log(contactid);
    // window.open(host+"/parts/showcontact/?id="+contactid, "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    // setState({ showDlgDetail: true, contactid: contactid });
    props.actions.details(contactid);
  };
  const handleNext = (e) => {
    let start2 = start + limit;
    if (start2 > total - limit) start2 = total - limit; //total >limit
    if (start2 < 0) {
      start2 = 0;
    }
    dispatch(
      slice.loadCONTACT({
        start: start2,
        limit: limit,
        search: search,
        baoxiang: baoxiang,
      })
    );
  };
  const onSelectBaoxiang = (e) => {
    // dispatch(slice.actions.BAOXIANG(e));
    dispatch(
      slice.loadCONTACT({
        start: start,
        limit: limit,
        search: search,
        baoxiang: e,
      })
    );
  };
  const handleEdit = (idx,contactid) => {
    // setState({ showDlgEdit: true, currentIndex: idx });
    dispatch(slice.edit(idx,contactid));
  };
  const allfile = (contactid) => {
    // dlgwait.current.open(contactid);
    // props.dispatch({type: types.SHOW_DLG_WAIT, visible: true,index:idx});
    dispatch(slice.allfile(contactid));
  };
  const updateMethod = (contactid, idx) => {
    // dlgwait.current.open(contactid);
    // props.dispatch({type: types.SHOW_DLG_WAIT, visible: true,index:idx});
    dispatch(slice.updateMethod(contactid, idx));
  };
  // const openDlgItems = () => {
  //   // dlgitems.current.open();
  //   dispatch(slice.actions.SHOW_DLG_ITEMS(true));
  // };
  const opendlgfolder = (contactid) => {
    // dlgfolder.current.open(contactid);
    props.actions.forlder(contactid);
  };
  const opendlgcheck = (idx) => {
    dispatch(slice.actions.SHOW_DLG_CHECK({ visible: true, index: idx }));
  };
  // const openDlgPacks = () => {
  //   // dlgpacks.current.open();
  //   dispatch(slice.actions.SHOW_DLG_PACK(true));
  // };
  const openDlgCopyPack = () => {
    dispatch(slice.actions.SHOW_DLG_COPYPACK(true));
  };
  const openDlgImport = () => {
    // props.dispatch({ type: types.SHOW_DLG_IMPORT, visible: true});
    var data = { limit: 10, search: 'xls' };
    dispatch(slice.importXls(data));
  };
  const contactRows = contacts.map((contact, idx) => (
    <TableRow key={idx} className={props.classes.row}>
      <CustomTableCell>{contact.yonghu}</CustomTableCell>
      <CustomTableCell>{contact.hetongbh}</CustomTableCell>
      <CustomTableCell>
        <Button
          variant="outlined"
          style={{ display: 'inline' }}
          onClick={() => handleEdit(idx,contact.id)}
        >
          {contact.yiqibh}
        </Button>
        <DropdownButton title="" id="id_dropdown3">
          <MenuItem onClick={() => onDetailClick(contact.id)}>详细</MenuItem>
          <MenuItem onClick={() => updateMethod(contact.id, idx)}>
            更新方法
          </MenuItem>
          <MenuItem onClick={() => allfile(contact.id)}>全部文件</MenuItem>
          <MenuItem onClick={() => opendlgcheck(idx)}>核对备料计划</MenuItem>
          <MenuItem onClick={() => opendlgfolder(contact.id)}>
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
  var hasprev = true;
  var hasnext = true;
  let prev;
  let next;

  if (start === 0) {
    hasprev = false;
  }
  //console.log(start+limit>=total);
  if (start + limit >= total) {
    hasnext = false;
  }
  if (hasprev) {
    prev = (
      <Button variant="outlined" onClick={handlePrev}>
        前一页
      </Button>
    );
  } else {
    prev = null;
  }
  if (hasnext) {
    next = (
      <Button variant="outlined" onClick={handleNext}>
        后一页
      </Button>
    );
  } else {
    next = null;
  }

  return (
    <div className={props.classes.root}>
      <DlgWorkMonth
        showModal={useSelector((state) => state.parts.showDlgWorkMonth)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_WORKMONTH(false));
        }}
        baoxiang={baoxiang}
      />
      <DlgItems
        showModal={useSelector((state) => state.parts.showDlgItem)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_ITEMS(false));
        }}
      />
      <DlgPacks
        showModal={useSelector((state) => state.parts.showDlgPack)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_PACK(false));
        }}
      />
      <DlgCopyPack
        showModal={useSelector((state) => state.parts.showDlgCopyPack)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_COPYPACK(false));
        }}
      />

      <DlgStatMonth
        open={useSelector((state) => state.parts.showDlgStatMonth)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLGSTAT_MONTH(false));
        }}
      />
      <DlgImport
        showModal={useSelector((state) => state.parts.showDlgImport)}
        slice={slice}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_IMPORT(false));
        }}
      />
      <DlgCheck
        showModal={useSelector((state) => state.parts.showDlgCheck)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_CHECK(false));
        }}
      />
      <DlgWait
        showModal={useSelector((state) => state.parts.showdlgWait)}
        store={props.store}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_WAIT(false));
        }}
      />

      <DlgLogin
        showModal={useSelector((state) => state.parts.show_login)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_LOGIN(false));
        }}
        onLoginSubmit={onLoginSubmit}
      />
      {/*        <DlgDetail
          contactid={props.contactid}
          showModal={useSelector((state) => state.parts.showDlgDetail)}
          slice={slice}
          handleClose={() => {
            dispatch(slice.actions.SHOW_DLG_DETAIL(false));
          }}
        />*/}
      <DlgStatYear
        open={useSelector((state) => state.parts.showDlgStatYear)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLGSTAT_YEAR(false));
        }}
      />
      <ContactEdit2New
        showModal={useSelector((state) => state.parts.showDlgEdit)}
        handleClose={() => {
          dispatch(slice.actions.SHOW_DLG_EDIT({ visible: false }));
        }}
        title="编辑"
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={props.classes.grow}>
            装箱单
          </Typography>
          <Button variant="outlined" onClick={openDlgCopyPack}>复制包</Button>
          <DropdownButton title="统计">
            <MenuItem
              onClick={() => {
                dispatch(slice.actions.SHOW_DLGSTAT_MONTH(true));
              }}
            >
              月
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(slice.actions.SHOW_DLGSTAT_YEAR(true));
              }}
            >
              年
            </MenuItem>
          </DropdownButton>
          <UserDropDown
                title="包箱"
                onSelect={onSelectBaoxiang}
          />

          <InputBase
            onKeyPress={keypress}
            value={search}
            placeholder="合同/仪器编号/客户"
            classes={{
              root: props.classes.inputRoot,
              input: props.classes.inputInput,
            }}
            onChange={handleSearchChange}
          />
          <Button onClick={search_go}>
            <SearchIcon />
          </Button>
          <Button
            style={{ margin: '0px 10px 0px 10px' }}
            variant="contained"
            onClick={() => handleEdit(null)}
          >
            新仪器
          </Button>
          <Button variant="contained" onClick={openDlgImport}>
            导入标样
          </Button>
          <Button
            variant="contained"
            style={{ margin: '0px 10px 0px 10px' }}
            onClick={() => {
              dispatch(slice.actions.SHOW_DLG_WORKMONTH(true));
            }}
          >
            工作量
          </Button>
          <DropdownButton title={user} id="id_dropdown1">
            {user !== 'AnonymousUser' ? (
              <MenuItem onClick={handleLogout}>注销</MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  dispatch(slice.actions.SHOW_LOGIN(true));
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
          display: connect_error ? '' : 'none',
          textAlign: 'center',
          color: 'red',
        }}
      >
        !!!!!!!!!!连接错误,服务器未运行!!!!!!!
      </div>
      <div className={props.classes.tableWrapper}>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>
                <span>客户单位</span>
              </CustomTableCell>
              <CustomTableCell>合同编号</CustomTableCell>
              <CustomTableCell>
                <span>仪器编号</span>
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
        {start + 1}../{total}
      </label>
      {next}
      <input
        maxLength="6"
        size="6"
        onChange={handlePageChange}
        value={start_input}
      />
      <Button id="page_go" variant="contained" onClick={jump}>
        跳转
      </Button>
      <div style={{ minHeight: '200px' }} />
    </div>
  );
}
export default withStyles(styles)(App);
