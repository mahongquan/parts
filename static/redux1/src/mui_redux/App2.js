import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
import DlgLogin from './DlgLogin';
import DlgWorkMonth from './DlgWorkMonth';
import DlgStatYear from './DlgStatYear';
import DlgImport from './DlgImport';
// window.store=store;
export default function Counter() {
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  return (
    <div>
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
