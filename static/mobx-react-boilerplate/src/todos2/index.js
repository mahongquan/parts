import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

const initialState = window.initialState && JSON.parse(window.initialState) || {};
var todoStore = TodoStore.fromJS(initialState.todos || []);
var viewStore = new ViewStore();
todoStore.subscribeServerToStore();

export default class App extends React.Component{
	render=()=>{
		return(<TodoApp todoStore={todoStore} viewStore={viewStore}/>);
	}
}	