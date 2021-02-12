import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as store from './reducers/partsSlice';
import DlgLogin from './DlgLogin';
// console.log(store);
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
          login
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
      </div>
    </div>
  );
}
