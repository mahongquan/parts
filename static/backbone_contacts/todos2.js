$(function(){
   ////console.log("running");
  var myglobal={};
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
        myglobal.total=data.total;
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
    button_prev_click:function(){
        myglobal.start=myglobal.start-myglobal.limit;
        if(myglobal.start<0) myglobal.start=0;
        //todos.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        App.mysetdata();
        console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    button_next_click:function(){
        myglobal.start=myglobal.start+myglobal.limit;
        if(myglobal.start>myglobal.total-myglobal.limit) myglobal.start=myglobal.total-myglobal.limit;
        App.mysetdata();//todos.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    mysetdata:function(){
        this.$("#todo-list").empty();
        todos.fetch({
            reset:true,
            data: { start:myglobal.start,limit:myglobal.limit},
            success:function(){
                console.log(todos.length+" todo")
                this.$("#page").empty();
                var right=myglobal.start+myglobal.limit
                this.$("#page").append("item "+(myglobal.start+1)+"_"+right+" of "+myglobal.total);
            },
            error:function(){
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    initialize: function() {
      myglobal.start=0;
      myglobal.limit=3;
      myglobal.total=0;
      this.listenTo(todos, 'add', this.addOne);
      this.listenTo(todos, 'reset', this.addAll);
      this.listenTo(todos, 'all', this.render);
      this.main = $('#main');
      this.editview = new TodoEditView({model: new Todo()});
      this.$("#section_edit").append(this.editview.render().el);
      this.$("#bt_prev").bind("click", {}, this.button_prev_click);
      this.$("#bt_next").bind("click", {}, this.button_next_click);
      this.mysetdata();
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
  });
  var App = new AppView();
});
