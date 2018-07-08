import { observable,useStrict,action,computed,autorun } from "mobx";//, action, computed
var assert = require('assert');
const immutable= require('immutable')
var _ = require('lodash');
class ObservableTodoStore {
    @observable todos = [];
    @observable pendingRequests = 0;
    @observable contact={};
 
    constructor() {
        autorun(() => console.log(this.report));
    }
 
    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }
 
    @computed get report() {
        console.log("======")
        console.log(this.contact);
        console.log("----------")
    //     if (this.todos.length === 0)
    //         return "<none>";
    // return `Next todo: "${this.todos[0].task}". ` + 
    //     `Progress: ${this.completedTodosCount}/${this.todos.length}`; 
    }
 
    addTodo(task) {
    this.todos.push({ 
        task: task,
        completed: false,
        assignee: null
    });
    }
}
const observableTodoStore = new ObservableTodoStore();
//console.log(immutable)
//const c2=observableTodoStore.contact.set('a',1);
observableTodoStore.contact={a:2};


let c2=_.clone(observableTodoStore.contact);
c2.b=3;
observableTodoStore.contact=c2;

// var a={b:1,c:2};
// const m=immutable.Map(a);
// console.log(m);
// console.log(m.get('b'));

// const { Map } = require('immutable');
// const map1 = Map({ a: 1, b: 2, c: 3 })
// const map2 = map1.set('b', 50)
// console.log(map1.get('b') + " vs. " + map2.get('b')); // 2 vs. 50

// const { List } = require('immutable')
// const list1 = List([ 1, 2 ]);
// const list2 = list1.push(3, 4, 5);
// const list3 = list2.unshift(0);
// const list4 = list1.concat(list2, list3);
// assert.equal(list1.size, 2);
// assert.equal(list2.size, 5);
// assert.equal(list3.size, 6);
// assert.equal(list4.size, 13);
// assert.equal(list4.get(0), 1);
