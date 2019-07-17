import * as types from '../constants/ActionTypes';
import Client from '../../Client';
export const addTodo = text => ({ type: types.ADD_TODO, text });
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAll = () => ({ type: types.COMPLETE_ALL });
// export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
// export const completeTodo_res = id => ({ type: types.COMPLETE_TODO_RES, id });
export function clearCompleted() {
  console.log("clear complete");
  return async (dispatch, getState) => {
    Client.sql("delete from todos_todo where completed=1",(res)=>{
      dispatch({ type: types.CLEAR_COMPLETED_RES, res});
    });
  };
}

export function loadTodo() {
  console.log("loadTodo");
  return async (dispatch, getState) => {
  	Client.get("/rest/Todo",{},(res)=>{
  		console.log(res);
  		dispatch({ type: types.LOAD_TODO_RES, res});
  	})
  };
}
// export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export function completeTodo(id,v_completed) {
  console.log("complete Todo");
  return async (dispatch, getState) => {
    Client.put("/rest/Todo",{id:id,completed:v_completed},(res)=>{
      console.log(res);
      dispatch({ type: types.COMPLETE_TODO_RES, res});
    })
  };
}
