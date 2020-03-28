import { combineReducers } from 'redux';
import Client from '../Client';
import update from 'immutability-helper';
// const ADD_CONTACT = 'ADD_CONTACT';
const LOAD_CONTACT = 'LOAD_CONTACT';
// const EDIT_CONTACT = 'EDIT_CONTACT';
const SHOW_DLG_WORKMONTH="SHOW_DLG_WORKMONTH"
const SHOW_LOGIN = 'SHOW_LOGIN';
const SHOW_DLGSTAT_MONTH = 'SHOW_DLGSTAT_MONTH';
const SHOW_DLGSTAT_YEAR = 'SHOW_DLGSTAT_YEAR';
const SEARCH_CHANGE = 'SEARCH_CHANGE';
const LOG_OUT = 'LOG_OUT';
const PAGE_CHANGE = 'PAGE_CHANGE';
const SHOW_DLG_EDIT = 'SHOW_DLG_EDIT';
const SHOW_DLG_WAIT="SHOW_DLG_WAIT"
const SHOW_DLG_ITEMS="SHOW_DLG_ITEMS"
const hiddenPacks = 'hiddenPacks';

const LOAD_CONTACT_RES = 'LOAD_CONTACT_RES';
const LOAD_CONTACT_FAIL = 'LOAD_CONTACT_FAIL';
const LOGIN_RES = 'LOGIN_RES';
const SAVE_CONTACT_RES = 'SAVE_CONTACT_RES';

export const types = {
  SHOW_LOGIN,
  SHOW_DLG_ITEMS,
  SHOW_DLGSTAT_MONTH,
  SHOW_DLGSTAT_YEAR,
  LOAD_CONTACT,
  SEARCH_CHANGE,
  PAGE_CHANGE,
  LOG_OUT,
  SHOW_DLG_EDIT,
  SHOW_DLG_WORKMONTH,
  hiddenPacks,
};

const onLoginSubmit = data => {
  return async dispatch => {
    Client.login(data.username, data.password, result => {
      if (result.success) {
        let res = {
          logined: true,
          user: data.username,
          contacts: [],
        };
        dispatch({ type: LOGIN_RES, res });
      }
    });
  };
};
const loadCONTACT = data => {
  return async dispatch => {
    Client.contacts(
      data,
      contacts => {
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
        dispatch({ type: LOAD_CONTACT_RES, res });
      },
      error => {
        // console.log(typeof(error));
        console.log(error);
        if (error instanceof SyntaxError) {
          dispatch({ type: SHOW_LOGIN ,visible:true});
        } else {
          dispatch({ type: LOAD_CONTACT_FAIL, error });
        }
      }
    );
  };
};
const handleLogout = () => {
  return async dispatch => {
    Client.logout(() => {
      dispatch({ type: LOG_OUT });
    });
  };
};
const saveContact = (dataSave, index, callback) => {
  return async dispatch => {
    var url = '/rest/Contact';
    Client.postOrPut(url, dataSave, res => {
      if (res.success) {
        let result = { contact: res.data, currentIndex: index };
        dispatch({ type: SAVE_CONTACT_RES, result: result });
        callback();
        // this.old = res.data;
        // this.setState({ bg: {} });
        // this.setState({ hiddenPacks: false });
      } else {
        alert(res.message);
      }
    });
  };
};
export const CONTACTActions = {
  loadCONTACT,
  onLoginSubmit,
  handleLogout,
  saveContact,
};

const initialState = {
  logined: false,
  connect_error: false,
  search2: '',
  search2tip: '',
  target: null,
  showcontext: false,
  contacts: [],
  limit: 10,
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
  showdlgWait:false,
  show_login: false,
  //edit
  hiddenPacks: true,
};

export function CONTACTs(state = initialState, action) {
  let new_state;
  console.log(action);
  switch (action.type) {
    case hiddenPacks:
      new_state = update(state, {
        hiddenPacks: { $set: true },
        currentIndex: { $set: null },
      });
      return new_state;

    case SAVE_CONTACT_RES:
      let contacts2;
      if (action.result.currentIndex != null) {
        contacts2 = update(state.contacts, {
          [action.result.currentIndex]: { $set: action.result.contact },
        });
        console.log(contacts2);
      } else {
        contacts2 = update(state.contacts, {
          $unshift: [action.result.contact],
        });
        action.result.currentIndex = 0;
      }
      new_state = update(state, {
        contacts: { $set: contacts2 },
        hiddenPacks: { $set: false },
        currentIndex: { $set: action.result.currentIndex },
      });
      return new_state;
    case SHOW_DLG_EDIT:
      new_state = update(state, {
        showDlgEdit: { $set: action.visible },
        hiddenPacks: { $set: action.index === null ? true : false },
        currentIndex: { $set: action.index },
      });
      return new_state;
    case SHOW_DLG_WAIT:
      new_state = update(state, {
        showdlgWait: { $set: action.visible },
      });
      return new_state;      
    case SHOW_DLG_WORKMONTH:
      new_state = update(state, {
        showDlgWorkMonth: { $set: action.visible },
      });
      return new_state;   
    case SHOW_DLG_ITEMS:
      new_state = update(state, {
        showDlgItem: { $set: action.visible },
      });
      return new_state;          
    case LOG_OUT:
      new_state = initialState;
      return new_state;
    case LOGIN_RES:
      new_state = update(state, {
        user: { $set: action.res.user },
        logined: { $set: action.res.user },
      });
      return new_state;
    case PAGE_CHANGE:
      new_state = update(state, {
        start_input: { $set: action.value },
      });
      return new_state;
    case SEARCH_CHANGE:
      new_state = update(state, {
        search: { $set: action.value },
      });
      return new_state;
    case LOAD_CONTACT_RES:
      new_state = update(state, {
        connect_error: { $set: false },
        contacts: { $set: action.res.contacts },
        total: { $set: action.res.total },
        user: { $set: action.res.user },
        start: { $set: action.res.start },
        baoxiang: { $set: action.res.baoxiang },
      });
      return new_state;
    case SHOW_LOGIN:
      new_state = update(state, {
        show_login: { $set: action.visible },
      });
      return new_state;      
    case SHOW_DLGSTAT_MONTH:
      new_state = update(state, {
        showDlgStatMonth: { $set: action.visible },
      });
      return new_state;      
    
    case SHOW_DLGSTAT_YEAR:
      new_state = update(state, {
        showDlgStatYear: { $set: action.visible },
      });
      return new_state;      
    case LOAD_CONTACT_FAIL:
      new_state = update(state, {
        connect_error: { $set: true },
      });
      return new_state;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  CONTACTs,
});

export default rootReducer;
