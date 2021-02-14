import { createSlice } from '@reduxjs/toolkit';
import Client from '../Client';
var initialState = {
  hiddenPacks: false,
  contact: {},
  show_usepack_edit: false,
  pack_id: null,
  packitem: {},
  bg: {},
  old: {},
  index_packitem: null,
  value: 0,
  users: [],
  logined: false,
  connect_error: false,
  search2: '',
  search2tip: '',
  target: null,
  showcontext: false,
  contacts: [],
  usepacks: [],
  packitems: [],
  packs: [],
  limit: 3,
  user: 'AnonymousUser',
  search: '',
  start: 0,
  total: 0,
  start_input: 1,
  currentIndex: null,
  baoxiang: '',
  showDlgImport: false,
  showDlgEdit: false,
  showDlgDetail: false,
  showDlgCONTACTs: false,
  showDlgStatYear: false,
  showDlgStatMonth: false,
  showDlgItem: false,
  showDlgWorkMonth: false,
  showDlgCopyPack: false,
  showDlgForder: false,
  showdlgWait: false,
  showDlgPack: false,
  showDlgCheck: false,
  show_login: false,
  show_packitem_edit: false,
  //edit
  hiddenPacks: true,
  allfile_err: null,
  detail: null,
};
export const partsSlice = createSlice({
  name: 'parts',
  initialState: initialState,
  reducers: {
    INCREMENT: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    DECREMENT: (state) => {
      state.value -= 1;
    },
    PackItemEdit_SAVE: (state, action) => {
      // dispatch(savePackItemEdit(state.packitem));
    },
    DELETE_PACKITEM: (state, action) => {
      console.log(action);
      // var res=action.payload;
      // state.packitem=res.data;
      // state.bg={};
      // state.old = res.data;
    },
    ADD_PACKITEM_RES: (state, action) => {
      var res = action.payload;
      console.log(res);
      // if(res.success){
      state.packitems = state.packitems.concat(res.data);
      // }
    },
    SEARCH_CHANGE: (state, action) => {
      state.search = action.payload;
    },
    BAOXIANG: (state, action) => {
      state.baoxiang = action.payload;
    },
    PAGE_CHANGE: (state, action) => {
      state.start_input = action.payload;
    },
    PackItemEdit_SAVE_RES: (state, action) => {
      var res = action.payload;
      state.packitem = res.data;
      state.bg = {};
      state.old = res.data;
    },
    PackItemEdit_QUE_CHANGE: (state, action) => {
      var quehuo = state.packitem.quehuo;
      quehuo = !quehuo;
      if (state.old.quehuo === quehuo) {
        state.bg[action.payload.name] = '#ffffff';
      } else {
        state.bg[action.payload.name] = '#8888ff';
      }
      state.packitem.quehuo = quehuo;
    },
    PackItemEdit_CHANGE: (state, action) => {
      if (state.old[action.payload.name] === action.payload.value) {
        state.bg[action.payload.name] = '#ffffff';
      } else {
        state.bg[action.payload.name] = '#8888ff';
      }
      state.packitem[action.payload.name] = action.payload.value;
    },
    INCREMENTBYAMOUNT: (state, action) => {
      state.value += action.payload;
    },
    SHOW_LOGIN: (state, action) => {
      // console.log(action);
      state.show_login = action.payload;
    },
    SHOW_DLG_EDIT_PACKITEM: (state, action) => {
      state.show_packitem_edit = action.payload.visible;
      console.log(action);
      if (action.payload.visible && action.payload.idx != null) {
        console.log('set packitem');
        state.index_packitem = action.payload.idx;
        state.packitem = state.packitems[action.payload.idx];
        state.bg = {};
        state.old = state.packitem;
      } else {
        state.index_packitem = null;
        state.packitem = {};
        state.bg = {};
        state.old = state.packitem;
      }
    },
    SEARCH_PACK_RES: (state, action) => {
      state.packs = action.payload.data;
    },
    SHOW_DLG_EDIT_USEPACK: (state, action) => {
      state.show_usepack_edit = action.payload;
    },
    SHOW_DLG_IMPORT: (state, action) => {
      state.showDlgImport = action.payload;
    },
    SHOW_DLG_EDIT: (state, action) => {
      state.showDlgEdit = action.payload.visible;
      console.log(action);
      if (action.payload.visible && action.payload.idx != null) {
        console.log('set packitem');
        state.currentIndex = action.payload.idx;
        state.contact = state.contacts[action.payload.idx];
        state.bg = {};
        state.old = state.contact;
      } else {
        state.index_packitem = null;
        state.contact = {};
        state.bg = {};
        state.old = state.contact;
      }
    },
    SHOW_DLGSTAT_MONTH: (state, action) => {
      state.showDlgStatMonth = action.payload;
    },
    SHOW_DLG_WORKMONTH: (state, action) => {
      state.showDlgWorkMonth = action.payload;
    },
    SHOW_DLGSTAT_YEAR: (state, action) => {
      state.showDlgStatYear = action.payload;
    },
    LOAD_USER_RES: (state, action) => {
      state.users = action.payload.data;
    },
    LOAD_PACKITEM_RES: (state, action) => {
      state.pack_id = action.payload.pack_id;
      state.packitems = action.payload.res.data;
    },
    LOAD_CONTACT_RES: (state, action) => {
      console.log(action);
      state.connect_error = false;
      state.contacts = action.payload.contacts;
      state.total = action.payload.total;
      state.user = action.payload.user;
      state.start = action.payload.start;
    },
    LOAD_USEPACK_RES: (state, action) => {
      state.usepacks = action.payload.data;
    },
    LOG_OUT_RES: (state, action) => {
      console.log(action);
      state = initialState;
    },
    LOG_IN_RES: (state, action) => {
      state.user = action.payload.user;
      state.logined = action.payload.user; //todo
    },
  },
});
function load_contact(dispatch, data) {
  Client.contacts(
    data,
    (contacts) => {
      console.log(contacts);
      var user = contacts.user;
      if (user === undefined) {
        user = 'AnonymousUser';
      }
      let res = {
        contacts: contacts.data, //.slice(0, MATCHING_ITEM_LIMIT),
        user: user,
        total: contacts.total,
        start: data.start,
        baoxiang: data.baoxiang,
      };
      // dispatch({ type: LOAD_CONTACT_RES, res });
      dispatch(actions.LOAD_CONTACT_RES(res));
      load_user(dispatch);
    },
    (error) => {
      // console.log(typeof(error));
      console.log(error);
      if (error instanceof SyntaxError) {
        dispatch(actions.SHOW_LOGIN(true));
      } else {
        // dispatch({ type: LOAD_CONTACT_FAIL, error });
      }
    }
  );
}
export const actions = partsSlice.actions;
// export const {LOG_IN_RES, LOG_OUT_RES,LOAD_CONTACT_RES,login, increment, decrement, incrementByAmount } = partsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(actions.INCREMENTBYAMOUNT(amount));
  }, 1000);
};
export const logout = (data) => (dispatch) => {
  Client.logout(() => {
    dispatch(actions.LOG_OUT_RES());
  });
};

export const deletePackItem = (idx, item_id) => (dispatch) => {
  var url = '/rest/PackItem';
  Client.delete1(url, { id: item_id }, (res) => {
    dispatch(actions.DELETE_PACKITEM({ res: res, idx: idx }));
  });
};
export const editPackItem = (idx) => (dispatch) => {
  // if(contact_id) dispatch(loadUsePack(contact_id));
  dispatch(
    actions.SHOW_DLG_EDIT_PACKITEM({
      visible: true,
      idx: idx,
    })
  );
};
export const edit = (idx) => (dispatch) => {
  // if(contact_id) dispatch(loadUsePack(contact_id));
  dispatch(
    actions.SHOW_DLG_EDIT({
      visible: true,
      idx: idx,
    })
  );
};
export const addPackItem = (data) => (dispatch) => {
  var url = '/rest/PackItem';
  Client.post(url, data, (res) => {
    dispatch(actions.ADD_PACKITEM_RES(res));
    // var p = res.data;
    // const newFoods = state.items.concat(p);
    // set_state({ items: newFoods });
  });
};
export const loadUsePack = (contact_id) => (dispatch) => {
  Client.UsePacks(contact_id, (res) => {
    dispatch(actions.LOAD_USEPACK_RES(res));
  });
};
export const loadPackItems = (pack_id) => (dispatch) => {
  Client.PackItems(pack_id, (res) => {
    console.log(res);
    dispatch(actions.LOAD_PACKITEM_RES({ res: res, pack_id: pack_id }));
  });
  // function PackItems(query, cb) {
  //   var data = { pack: query };
  //   return get('/rest/PackItem/', data, cb);
  // }
};
export const importXls = (data, callback) => (dispatch) => {
  dispatch(actions.SHOW_DLG_IMPORT(true));
  Client.get(
    '/rest/Pack',
    data,
    (res) => {
      console.log(res);
      dispatch(actions.SEARCH_PACK_RES(res));
    },
    (err) => {
      console.log(err);
    }
  );
};
export const onLoginSubmit = (data) => (dispatch) => {
  Client.login(data.username, data.password, (result) => {
    if (result.success) {
      let res = {
        logined: true,
        user: data.username,
        contacts: [],
      };
      dispatch(actions.LOG_IN_RES(res));
      load_contact(dispatch, {
        limit: initialState.limit,
        start: initialState.start,
      });
    }
  });
};
function load_user(dispatch) {
  Client.users((res) => {
    if (res.success) {
      dispatch(actions.LOAD_USER_RES(res));
    } else {
      console.log('not success');
    }
  });
}
export const loadCONTACT = (data) => (dispatch) => {
  load_contact(dispatch, data);
};
export const savePackItemEdit = (data) => (dispatch) => {
  var url = '/rest/BothPackItem';
  Client.postOrPut(url, data, (res) => {
    dispatch(actions.PackItemEdit_SAVE_RES(res));
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const select_count = state =>{
//   return state.parts.value
// };
// export const select_show_login = state => state.parts.show_login;
// export const select_state = state => state.parts;
export default partsSlice.reducer;
