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
export const types = { HIDE_LOGIN, SHOW_LOGIN,LOAD_TODO,SEARCH_CHANGE
  ,PAGE_CHANGE,LOG_OUT
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

export const TodoActions = {
  loadTodo,
  onLoginSubmit,handleLogout,
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
};

export function todos(state = initialState, action) {
  let new_state;
  console.log(action);
  switch (action.type) {
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
