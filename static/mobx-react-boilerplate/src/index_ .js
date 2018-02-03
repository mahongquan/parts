import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
//import Items from './Items';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
    constructor(t){
        this.title=t;
    }
}
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();
store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);
ReactDOM.render(<TodoView todoList={store} />, document.getElementById('root'));