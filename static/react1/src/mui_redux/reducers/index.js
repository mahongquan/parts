import { combineReducers } from 'redux';
import Client from '../Client';
import update from 'immutability-helper';
export const ADD_TODO = 'ADD_TODO';
export const LOAD_TODO = 'LOAD_TODO';
export const LOAD_TODO_RES = 'LOAD_TODO_RES';
export const LOAD_TODO_FAIL = 'LOAD_TODO_FAIL';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const SHOW_ALL = 'show_all';
export const SHOW_COMPLETED = 'show_completed';
export const SHOW_ACTIVE = 'show_active';
const SHOW_LOGIN = 'SHOW_LOGIN';
const HIDE_LOGIN = 'HIDE_LOGIN';
const SEARCH_CHANGE = 'SEARCH_CHANGE';
const LOG_OUT = 'LOG_OUT';
const PAGE_CHANGE = 'PAGE_CHANGE';
const LOGIN_RES = 'LOGIN_RES';
const SHOW_DLGEDIT="SHOW_DLGEDIT"
const SAVE_CONTACT_RES="SAVE_CONTACT_RES"
const hiddenPacks="hiddenPacks";
export const types = { HIDE_LOGIN, SHOW_LOGIN,LOAD_TODO,SEARCH_CHANGE
  ,PAGE_CHANGE,LOG_OUT,SHOW_DLGEDIT,hiddenPacks,
};

const onLoginSubmit = data => {
  return async dispatch => {
    Client.login(data.username, data.password, result=> {
      if (result.success) {
        let res={
           logined: true,
           user: data.username,
           contacts: []
        };
        dispatch({ type: LOGIN_RES, res});
      }
    });
  };
};
const loadTodo = data => {
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
          start:data.start,
          baoxiang:data.baoxiang,
        };
        dispatch({ type: LOAD_TODO_RES, res });
      },
      error => {
        // console.log(typeof(error));
        console.log(error);
        if (error instanceof SyntaxError) {
          dispatch({ type: SHOW_LOGIN });
        } else {
          dispatch({ type: LOAD_TODO_FAIL, error });
        }
      }
    );
  };
};
const handleLogout= () => {
  return async dispatch => {
    Client.logout(() => {
      dispatch({type:LOG_OUT});
    });
  };
}
const saveContact=(dataSave,index,callback)=>{
  return async dispatch => {
    var url = '/rest/Contact';
    Client.postOrPut(url, dataSave, res => {
      if (res.success) {
        let result={contact:res.data,currentIndex:index}
        dispatch({type:SAVE_CONTACT_RES,result:result})
        callback();
        // this.old = res.data;
        // this.setState({ bg: {} });
        // this.setState({ hiddenPacks: false });
      } else {
        alert(res.message);
      }
    });
  };
}
export const TodoActions = {
  loadTodo,
  onLoginSubmit,handleLogout,saveContact
};

const initialState = {
  logined:false,
  connect_error: false,
  search2: '',
  search2tip: '',
  target: null,
  showcontext: false,
  contacts: [],
  limit: 10,
  user: 'AnonymousUser',
  search:"",
  start: 0,
  total: 0,
  start_input: 1,
  currentIndex: null,
  baoxiang: '',
  showDlgImport: false,
  showDlgEdit: false,
  showDlgDetail: false,
  showDlgTodos: false,
  showDlgStat2: false,
  showDlgItem: false,
  showDlgWorkMonth: false,
  show_login: false,
  //edit
  hiddenPacks: true,
};

export function todos(state = initialState, action) {
  let new_state;
  console.log(action);
  switch (action.type) {
    case hiddenPacks:
      new_state = update(state, {
        hiddenPacks: { $set: true},
        currentIndex: { $set: null},
      });
      return new_state;

    case SAVE_CONTACT_RES:
      let contacts2;
      if (action.result.currentIndex != null) {
        contacts2 = update(state.contacts, 
          { [action.result.currentIndex]: { $set: action.result.contact } 
          });
        console.log(contacts2);
      } else {
        contacts2 = update(state.contacts, { $unshift: [action.result.contact] });
        action.result.currentIndex=0;
      }
      new_state = update(state, {
        contacts:{ $set: contacts2},
        hiddenPacks: { $set: false},
        currentIndex: { $set: action.result.currentIndex},
      });
      return new_state;
    case SHOW_DLGEDIT:
      new_state = update(state, {
        showDlgEdit: { $set: action.visible},
        hiddenPacks:{$set: action.index===null?true:false},
        currentIndex: { $set: action.index},
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
    case LOAD_TODO_RES:
      new_state = update(state, {
        connect_error: { $set: false},
        contacts: { $set: action.res.contacts },
        total: { $set: action.res.total },
        user:{ $set: action.res.user},
        start:{ $set: action.res.start},
        baoxiang:{ $set: action.res.baoxiang},
      });
      return new_state;
    case HIDE_LOGIN:
      new_state = update(state, {
        show_login: { $set: false },
      });
      return new_state;
    case SHOW_LOGIN:
      new_state = update(state, {
        show_login: { $set: true },
      });
      return new_state;
    case LOAD_TODO_FAIL:
      new_state = update(state, {
        connect_error: { $set: true },
      });
      return new_state;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos,
});

export default rootReducer;
