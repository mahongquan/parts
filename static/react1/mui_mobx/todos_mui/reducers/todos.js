import {
  LOAD_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
} from '../constants/ActionTypes';

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
  },
];

export default function todos(state = initialState, action) {
  let new_state;
  switch (action.type) {
    case LOAD_TODO:
      new_state = JSON.parse(localStorage.getItem('mytodos'));
      if (!new_state) {
        new_state = [];
      }
      return new_state;

    case ADD_TODO:
      new_state = [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
        ...state,
      ];
      break;
    case DELETE_TODO:
      new_state = state.filter(todo => todo.id !== action.id);
      break;
    case EDIT_TODO:
      new_state = state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
      break;
    case COMPLETE_TODO:
      new_state = state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
      break;
    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed);
      new_state = state.map(todo => ({
        ...todo,
        completed: !areAllMarked,
      }));
      break;
    case CLEAR_COMPLETED:
      new_state = state.filter(todo => todo.completed === false);
      break;
    default:
      return state;
  }
  localStorage.setItem('mytodos', JSON.stringify(new_state));
  return new_state;
}
