import {LOAD_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
// let todos=localStorage.getItem("todos");
const initialState=[];
export default function todos(state = initialState, action) {
  switch (action.type) {
    case LOAD_TODO:
        let todos=localStorage.getItem("todos");
        let initialState;
        if (todos) {
          try{
            initialState=JSON.parse(todos);
          }
          catch(SyntaxError){
            initialState=[];
          }
        }
        else{
           initialState=[];
        }   
        return initialState;
    case ADD_TODO:
      state= [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]
      localStorage.setItem("todos",JSON.stringify(state));
      return state;

    case DELETE_TODO:
      state=state.filter(todo =>
        todo.id !== action.id
      )
      localStorage.setItem("todos",JSON.stringify(state));
      return state;
    case EDIT_TODO:
      state=state.map(todo =>
        todo.id === action.id ? {...todo, text: action.text }:todo
      )
      localStorage.setItem("todos",JSON.stringify(state));
      return state;
    case COMPLETE_TODO:
      state=state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )
      localStorage.setItem("todos",JSON.stringify(state));
      return state;
    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      state=state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
      localStorage.setItem("todos",JSON.stringify(state));
      return state;
    case CLEAR_COMPLETED:
      state=state.filter(todo => todo.completed === false)
      localStorage.setItem("todos",JSON.stringify(state));
      return state;      

    default:

      return state
  }
}
