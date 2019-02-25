import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TodoItem from './components/todoItem';
import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import { expr } from 'mobx-utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';
import { observer } from 'mobx-react';
import TodoOverview from './components/todoOverview';
import TodoFooter from './components/todoFooter';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class App extends React.Component {
  constructor() {
    super();
    const initialState =
      (window.initialState && JSON.parse(window.initialState)) || {};
    this.todoStore = TodoStore.fromJS(initialState.todos || []);
    this.viewStore = new ViewStore();
    this.todoStore.subscribeServerToStore();
  }
  componentDidMount() {
    var { Router } = require('director/build/director');
    var viewStore = this.viewStore;
    var router = Router({
      '/': function() {
        viewStore.todoFilter = ALL_TODOS;
      },
      '/active': function() {
        viewStore.todoFilter = ACTIVE_TODOS;
      },
      '/completed': function() {
        viewStore.todoFilter = COMPLETED_TODOS;
      },
    });
    router.init('/');
  }
  button_click = () => {
    console.log('click');
    this.todoStore.showmodal = !this.todoStore.showmodal;
  };
  getVisibleTodos() {
    return this.todoStore.todos.filter(todo => {
      switch (this.viewStore.todoFilter) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  toggleAll = event => {
    var checked = event.target.checked;
    this.todoStore.toggleAll(checked);
  };
  handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();
    console.log(val);
    console.log('keydown');

    if (val) {
      console.log('addTodo');
      this.todoStore.addTodo(val);
      ReactDOM.findDOMNode(this.refs.newField).value = '';
    }
  };
  render = () => {
    console.log('render');
    console.log(this.todoStore.showmodal);
    let div_todos = this.todoStore.todos.map((item, key) => {
      return <div key={key}>{item.title}</div>;
    });
    let modal;
    if (this.todoStore.showmodal) {
      modal = <div>modal</div>;
    }
    return (
      <section id="todoapp" className="todoapp">
        <input
          ref="newField"
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.handleNewTodoKeyDown}
          autoFocus={true}
        />
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={this.todoStore.activeTodoCount === 0}
          />
          <ul className="todo-list">
            {this.getVisibleTodos().map(todo => (
              <TodoItem key={todo.id} todo={todo} viewStore={this.viewStore} />
            ))}
          </ul>
        </section>
        <button style={{ backgoundColor: '#f00' }} onClick={this.button_click}>
          click
        </button>
        {div_todos}
        {modal}
      </section>
    );
  };
}
