import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TodoEntry from './components/todoEntry';
import TodoOverview from './components/todoOverview';
import TodoOverview2 from './components/todoOverview2';
import TodoItem from './components/todoItem';
import TodoFooter from './components/todoFooter';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';
import DevTool from 'mobx-react-devtools';
const ENTER_KEY = 13;


export default class App extends React.Component{
	constructor(){
		super();
		const initialState = window.initialState && JSON.parse(window.initialState) || {};
		this.todoStore = TodoStore.fromJS(initialState.todos || []);
		this.viewStore = new ViewStore();
		this.todoStore.subscribeServerToStore();
	}
	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.todoStore.addTodo(val);
			ReactDOM.findDOMNode(this.refs.newField).value = '';
		}
	};
		componentDidMount() {
			var { Router } = require('director/build/director');
			var viewStore = this.viewStore;
			var router = Router({
				'/': function() { viewStore.todoFilter = ALL_TODOS; },
				'/active': function() { viewStore.todoFilter = ACTIVE_TODOS; },
				'/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
			});
		router.init('/');
	}

	render=()=>{
		console.log("index3 render=======")
		const {todoStore, viewStore} = this;
		console.log(todoStore.todos.length);
		let div_todos=todoStore.todos.map((item,key)=>{
			return(<div key={key}>{item.title}</div>);
		});
		return (<section id="todoapp" className="todoapp">
			<div>
			<div style={{position:"fixed",left:0,top:0}}>
			hello
			{div_todos}
			</div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<input
			ref="newField"
			className="new-todo"
			placeholder="What needs to be done?"
			onKeyDown={this.handleNewTodoKeyDown}
			autoFocus={true}
		/>
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore} />
			<ul className="todo-list">
			   <li>hello</li>
				{todoStore.todos.map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewStore={viewStore}
					/>)
				)}
			</ul>
			</div>

			</section>
		);
	}
}	