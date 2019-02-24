<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <span v-bind:title="author">
      鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
    <p v-if="seen">现在你看到我了</p>
    <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <ToDoItem
      v-for="item in todos"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></ToDoItem>
  </ol>
  <div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
<blogpost
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blogpost>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ToDoItem from './components/ToDoItem.vue'
import Client from './Client';
import blogpost from './components/blogpost.vue'
export default {
  name: 'app',
  data:()=>{
    return {
    author:"mhq"
    ,counter:0
    ,seen:true
    ,posts: [
      { id: 1, title: 'My journey with Vue',content:"" },
      { id: 2, title: 'Blogging with Vue' ,content:""},
      { id: 3, title: 'Why Vue is so fun' ,content:""}
    ]
    ,todos: [
      { text: '学习 JavaScript',id:0 },
      { text: '学习 Vue',id:1 },
      { text: '整个牛项目',id:2 }
    ]
    ,message:"hello world"
    };
  },
  methods: {
    reverseMessage: function () {
      console.log(this);
      this.message = this.message.split('').reverse().join('')
    }
  },
  components: {
    HelloWorld,ToDoItem,blogpost
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
