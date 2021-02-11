import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  select_show_login,
  login,
  loadCONTACT,LOG_OUT,
  onLoginSubmit,
} from './reducers/partsSlice';
import DlgLogin from './DlgLogin';
export default function Counter() {
  const count = useSelector(selectCount);
  const show_login = useSelector(select_show_login);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  return (
    <div>
      <div >
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span>{count}</span>
        <button
          
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
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
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
        <button
          onClick={() => dispatch(login(true))}
        >
          login
        </button>
        <button
          onClick={() => dispatch(LOG_OUT(true))}
        >
          log out
        </button>
        <button
          onClick={() => dispatch(loadCONTACT({limit:3}))}
        >
          loadCONTACT
        </button>
        <DlgLogin
          showModal={show_login}
          handleClose={() => {
            console.log("close");
            dispatch(login(false));
          }}
          onLoginSubmit={(data)=>{
            dispatch(onLoginSubmit(data));
          }}
        />
      </div>
    </div>
  );
}
