import Client from '../Client_models';
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});
var app = new Vue({
  el: '#app',
  created: function () {
    Client.contacts({limit:10},(res)=>{
      this.contacts=res.data;
      console.log(this.contacts);
    },function(){

    });
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  },
  data: {
    message: 'Hello Vue!',
    contacts:[{yonghu:"aaaaa"}],
    seen:true,
    todos: [
        { text: '学习 JavaScript',id:1 },
        { text: '学习 Vue' ,id:2},
        { text: '整个牛项目' ,id:3}
      ],
  }
});

