import {
  LOAD_TODO,
  LOAD_TODO_RES,
  ADD_TODO,ADD_TODO_RES,
  DELETE_TODO,DELETE_TODO_RES,
  EDIT_TODO,EDIT_TODO_RES,
  COMPLETE_TODO,
  COMPLETE_TODO_RES,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
  CLEAR_COMPLETED_RES,
} from '../constants/ActionTypes';
// let todos=localStorage.getItem("todos");
const initialState = [];
export default function todos(state = initialState, action) {
  
  switch (action.type) {
    case LOAD_TODO_RES:
      console.log(action);
      let todos2 = action.res.data;
      return todos2;
    case LOAD_TODO:
      let todos = localStorage.getItem('todos');
      let initialState;
      if (todos) {
        try {
          initialState = JSON.parse(todos);
        } catch (SyntaxError) {
          initialState = [];
        }
      } else {
        initialState = [];
      }
      return initialState;
    case ADD_TODO:
      state = [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
        ...state,
      ];
      localStorage.setItem('todos', JSON.stringify(state));
      return state;
    case ADD_TODO_RES:
      console.log(action);
      state = [
        action.res.data,
        ...state,
      ];
      return state;
    case DELETE_TODO:
      state = state.filter(todo => todo.id !== action.id);
      localStorage.setItem('todos', JSON.stringify(state));
      return state;
    case DELETE_TODO_RES:
      state = state.filter(todo => todo.id !== action.res.data.id);
      return state;      
    case EDIT_TODO:
      state = state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
      localStorage.setItem('todos', JSON.stringify(state));
      return state;
    case EDIT_TODO_RES:
      console.log(state,action);
      state = state.map((todo) =>{
          if(todo.id === action.res.data.id)
            { return action.res.data }
          else
            {return  todo}
        }
      );
      console.log(state);
      return state;

    case COMPLETE_TODO_RES:
      console.log(action);
      state = state.map(todo =>
        todo.id === action.res.data.id ? { ...todo, completed:action.res.data.completed } : todo
      );
      console.log(state);
      return state;
    case COMPLETE_TODO:
      state = state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem('todos', JSON.stringify(state));
      return state;
    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      state = state.map(todo => ({
        ...todo,
        completed: !areAllMarked,
      }));
      localStorage.setItem('todos', JSON.stringify(state));
      return state;
    case CLEAR_COMPLETED:
      state = state.filter(todo => todo.completed === false);
      localStorage.setItem('todos', JSON.stringify(state));
      return state;
    case CLEAR_COMPLETED_RES:
      console.log(action)
      state = state.filter(todo => todo.completed === false);
      localStorage.setItem('todos', JSON.stringify(state));
      return state;

    default:
      return state;
  }
}
