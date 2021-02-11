import { createSlice } from '@reduxjs/toolkit';
import Client from '../Client';
var initialState={
    value:0,
    users:[],
    logined: false,
    connect_error: false,
    search2: '',
    search2tip: '',
    target: null,
    showcontext: false,
    contacts: [],
    usepacks:[],
    packitems:[],
    packs:[],
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
    showDlgCopyPack:false,
    showDlgForder:false,
    showdlgWait:false,
    showDlgPack:false,
    showDlgCheck:false,
    show_login: false,
    //edit
    hiddenPacks: true,
    allfile_err:null,
    detail:null,
  }
export const partsSlice = createSlice({
  name: 'parts',
  initialState: initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    login:(state,action)=>{
      // console.log(action);
      state.show_login=action.payload;
    },
    LOAD_CONTACT_RES:(state,action)=>{
      console.log(action);
      state.connect_error=false;
      state.contacts=action.payload.contacts;
      state.total=action.payload.total;
      state.user=action.payload.user;
      state.start=action.payload.start;
      state.baoxiang=action.payload.baoxiang;
    },
    LOG_OUT_RES:(state,action)=>{
      console.log(action);
      state=initialState;
    },
    LOG_IN_RES:(state,action)=>{
      state.user=action.payload.user;
      state.logined=action.payload.user;//todo
    },
  },
});
function load_contact(dispatch,data){
   Client.contacts(
      data,
      contacts => {
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
        dispatch(LOAD_CONTACT_RES(res));
        // load_user(dispatch);
      },
      error => {
        // console.log(typeof(error));
        console.log(error);
        if (error instanceof SyntaxError) {
          dispatch(login(true));
        } else {
          // dispatch({ type: LOAD_CONTACT_FAIL, error });
        }
      }
    );
}

export const {LOG_IN_RES, LOG_OUT_RES,LOAD_CONTACT_RES,login, increment, decrement, incrementByAmount } = partsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
export const LOG_OUT = data =>dispatch=> {
    Client.logout(() => {
      dispatch(LOG_OUT_RES());
    });
};
export const onLoginSubmit = data =>dispatch=> {
    Client.login(data.username, data.password, result => {
      if (result.success) {
        let res = {
          logined: true,
          user: data.username,
          contacts: [],
        };
        dispatch(LOG_IN_RES(res));
        load_contact(dispatch, initialState);   
      }
    });
};
export const loadCONTACT = data =>dispatch=> {
    load_contact(dispatch,data);
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;
export const select_show_login = state => state.counter.show_login;
export default partsSlice.reducer;
