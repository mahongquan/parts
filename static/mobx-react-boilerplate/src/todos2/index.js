import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

export default class App extends React.Component {
  constructor() {
    super();
    const initialState =
      (window.initialState && JSON.parse(window.initialState)) || {};
    this.todoStore = TodoStore.fromJS(initialState.todos || []);
    this.viewStore = new ViewStore();
    this.todoStore.subscribeServerToStore();
  }
  render = () => {
    return (
      <section id="todoapp" class="todoapp">
        <TodoApp todoStore={this.todoStore} viewStore={this.viewStore} />
      </section>
    );
  };
}
