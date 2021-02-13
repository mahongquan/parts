import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
import DlgLogin from './DlgLogin';
import DlgWorkMonth from './DlgWorkMonth';
import DlgStatYear from './DlgStatYear';
import DlgImport from './DlgImport';
import DlgStatMonth from './DlgStatMonth';
import ContactEdit2New from './ContactEdit2New';
import PackItems from './PackItems';
// window.store=store;
// var initialState={
//     value:0,
//     users:[],
//     logined: false,
//     connect_error: false,
//     search2: '',
//     search2tip: '',
//     target: null,
//     showcontext: false,
//     contacts: [],
//     usepacks:[],
//     packitems:[],
//     packs:[],
//     limit: 10,
//     user: 'AnonymousUser',
//     search: '',
//     start: 0,
//     total: 0,
//     start_input: 1,
//     currentIndex: null,
//     baoxiang: '',
//     showDlgImport: false,
//     showDlgEdit: false,
//     showDlgDetail: false,
//     showDlgCONTACTs: false,
//     showDlgStatYear: false,
//     showDlgStatMonth: false,
//     showDlgItem: false,
//     showDlgWorkMonth: false,
//     showDlgCopyPack:false,
//     showDlgForder:false,
//     showdlgWait:false,
//     showDlgPack:false,
//     showDlgCheck:false,
//     show_login: false,
//     //edit
//     hiddenPacks: true,
//     allfile_err:null,
//     detail:null,
//   }
export default function App() {
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  return (
    <div>
      <PackItems store={store} />
      <button onClick={()=>{
        dispatch(store.loadPackItems(1798));
      }}>load packitems</button>
      <DlgStatMonth open={useSelector((state) => state.parts.showDlgStatMonth)}
          handleClose={() => {
            dispatch(store.actions.SHOW_DLGSTAT_MONTH(false));
          }}
        />

      {/*<ContactEdit2New
          store={store}
          showModal={useSelector((state) => state.parts.showDlgEdit)}
          index={useSelector((state) => state.parts.currentIndex)}
          handleClose={() => {
            dispatch(store.actions.SHOW_DLG_EDIT(false));
          }}
          title="编辑"
        />*/}
      <button onClick={()=>{
        // if(idx) this.props.actions.loadUsePack(this.props.contacts[idx].id);
        dispatch(store.edit(null));
      }}>edit</button>
      <div >
        <button
          aria-label="Increment value"
          onClick={() => dispatch(store.actions.INCREMENT())}
        >
          +
        </button>
        <span>{useSelector((state) => state.parts.value)}</span>
        <button
          
          aria-label="Decrement value"
          onClick={() => dispatch(store.actions.DECREMENT())}
        >
          -
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(store.actions.INCREMENTBYAMOUNT(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(store.incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
        <button
          onClick={() => dispatch(store.actions.SHOW_LOGIN(true))}
        >
          show login
        </button>
        <button
          onClick={() => dispatch(store.actions.SHOW_DLG_WORKMONTH(true))}
        >
          show work
        </button>
        <button onClick={() => dispatch(store.actions.SHOW_DLGSTAT_YEAR(true))}>
          show year
        </button>
        <button onClick={() => dispatch(store.actions.SHOW_DLGSTAT_MONTH(true))}>
          show month
        </button>
        <button onClick={() => {
          var data = { limit: 10, search: 'xls' };
          dispatch(store.importXls(data));
        }}>
          show import 
        </button>
        <button
          onClick={() => dispatch(store.logout(true))}
        >
          log out
        </button>
        <button
          onClick={() => dispatch(store.loadCONTACT({limit:3}))}
        >
          loadCONTACT
        </button>
        <DlgLogin
          showModal={useSelector((state) => state.parts.show_login)}
          handleClose={() => {
            console.log("close");
            dispatch(store.actions.SHOW_LOGIN(false));
          }}
          onLoginSubmit={(data)=>{
            dispatch(store.onLoginSubmit(data));
          }}
        />
        <DlgStatYear open={useSelector((state) => state.parts.showDlgStatYear)}
          handleClose={() => {
            dispatch(store.actions.SHOW_DLGSTAT_YEAR(false));
          }}
        />
        <DlgWorkMonth
          showModal={useSelector((state) => state.parts.showDlgWorkMonth)}
          handleClose={() => {
            dispatch(store.actions.SHOW_DLG_WORKMONTH(false));
          }}
        />
        <DlgImport
          showModal={useSelector((state) => state.parts.showDlgImport)}
          handleClose={() => {
             dispatch(store.actions.SHOW_DLG_IMPORT(false));
          }}
        />
      </div>
    </div>
  );
}
