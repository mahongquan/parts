$(function(){
   ////console.log("running");
  var Todo = Backbone.Model.extend({
    urlRoot : "/extjs/board/",
    fields:["name","id","gender","epaper","dob"],
    defaults: function() {
      var d=new Date();
      var dstr=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      return {
        name: "",id:"",gender:"",epaper:false,dob:dstr
      };
    }
  });
  var TodoList = Backbone.Collection.extend({
    model: Todo,
    url : "/extjs/board/",
    //localStorage: new Backbone.LocalStorage("todos-backbone"),
     parse: function(data, options) {
        return data.data;
     }
  });
  var todos = new TodoList();
  var TodoEditView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#item-edit-template').html()),
    events: {
      "click #bt_save" : "save",
       "click #bt_clear" : "myclear",
    },
    save:function(){
      //console.log("save click");
      var data={}
      for(var i in this.model.fields){
        var fname=this.model.fields[i];
        var name=this.$("#"+fname).attr("name");
        var value=this.$("#"+fname).val();
        if (value) {
          var node=this.$("#"+fname);
          if(node.attr("type")=="checkbox")
          {
              // console.log("checked");
              // console.log(node[0].checked);
              // console.log(node.attr("checked"));
              //var v=this.$("#"+fname).attr("checked")[0].checked;
              data[name]=node[0].checked;
          }
          else
          {
           data[name]=value;
          }
         }
       }//for
       console.log(data);
      this.model.save(data);
      if(this.model.get("id")=="")
      {
          todos.add(this.model);
          this.render();
      }
    },
    myclear:function(){
      //console.log("clear click");
      this.model=new Todo();
      this.render();
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      // var d=this.model.get("epaper");
      // console.log(d);
      var node =this.$("#epaper");// document.getElementById("#epaper");
      node[0].checked=this.model.get("epaper");
      // if (this.model.get("epaper"))
      // {
      //   this.$("#epaper").attr("checked","");
      // }
      // else{
      //   this.$("#epaper").removeAttr("checked");
      // }
      this.$("#dob").datepicker({
            dateFormat: 'yy-mm-dd',
            numberOfMonths:1,//显示几个月
            showButtonPanel:true,//是否显示按钮面板
            clearText:"清除",//清除日期的按钮名称
            closeText:"关闭",//关闭选择框的按钮名称
            yearSuffix: '年', //年的后缀
            showMonthAfterYear:true,//是否把月放在年的后面
            //defaultDate:'2011-03-10',//默认日期
            //minDate:'2011-03-05',//最小日期
            //maxDate:'2011-03-20',//最大日期
            monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesMin: ['日','一','二','三','四','五','六'],
      });
      return this;
    },
  });
  var TodoView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#item-template').html()),
    events: {
      "click .item_edit" : "edit",
       "click .item_delete" : "delete",
    },
    edit:function(){
      //console.log("edit click");
      //console.log(App);
      App.editview.model=this.model;
      App.editview.render();
    },
    delete:function(){
      //console.log("delete click");
       this.model.destroy();
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      // this.input = this.$('.edit');
      return this;
    },
  });
  var AppView = Backbone.View.extend({
    el: $("#todoapp"),
    // events: {
    //   "keypress #new-todo":  "createOnEnter",
    // },
    initialize: function() {
      this.listenTo(todos, 'add', this.addOne);
      this.listenTo(todos, 'reset', this.addAll);
      this.listenTo(todos, 'all', this.render);
      this.main = $('#main');
      this.editview = new TodoEditView({model: new Todo()});
      this.$("#section_edit").append(this.editview.render().el);
      todos.fetch();
    },
    render: function() {
      if (todos.length) {
        this.main.show();
      } else {
        this.main.hide();
      }
    },
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },
    addAll: function() {
      todos.each(this.addOne, this);
    },
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      todos.create({name: this.input.val()});
      this.input.val('');
    }
  });
  var App = new AppView();
});
