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
    INCREMENT: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    DECREMENT: state => {
      state.value -= 1;
    },
    INCREMENTBYAMOUNT: (state, action) => {
      state.value += action.payload;
    },
    SHOW_LOGIN:(state,action)=>{
      // console.log(action);
      state.show_login=action.payload;
    },
    SEARCH_PACK_RES:(state,action)=>{
      state.packs=action.payload.data;
    },
    SHOW_DLG_IMPORT:(state,action)=>{
      state.showDlgImport=action.payload;
    },
    SHOW_DLG_WORKMONTH:(state,action)=>{
      state.showDlgWorkMonth=action.payload;
    },
    SHOW_DLGSTAT_YEAR:(state,action)=>{
      state.showDlgStatYear=action.payload;
    },
    LOAD_USER_RES:(state,action)=>{
      state.users=action.payload.data;
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
        dispatch(actions.LOAD_CONTACT_RES(res));
        load_user(dispatch);
      },
      error => {
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
export const actions=partsSlice.actions;
// export const {LOG_IN_RES, LOG_OUT_RES,LOAD_CONTACT_RES,login, increment, decrement, incrementByAmount } = partsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(actions.INCREMENTBYAMOUNT(amount));
  }, 1000);
};
export const logout = data =>dispatch=> {
    Client.logout(() => {
      dispatch(actions.LOG_OUT_RES());
    });
};
export const importXls = (data, callback) =>dispatch=> {
    dispatch(actions.SHOW_DLG_IMPORT(true));
    Client.get('/rest/Pack', data, (res) =>{
      console.log(res);
      dispatch(actions.SEARCH_PACK_RES(res));
    },(err)=>{
      console.log(err);
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
        dispatch(actions.LOG_IN_RES(res));
        load_contact(dispatch, {limit:initialState.limit,start:initialState.start});   
      }
    });
};
function load_user (dispatch)  {
    Client.users((res)=>{
          if(res.success){
            dispatch(actions.LOAD_USER_RES(res))
          }
          else{
            console.log("not success")
          }
    });
}
export const loadCONTACT = data =>dispatch=> {
    load_contact(dispatch,data);
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
