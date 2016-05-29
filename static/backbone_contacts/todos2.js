$(function(){
   //console.log("running");
  var Todo = Backbone.Model.extend({
    urlRoot : "/extjs/board/",
    defaults: function() {
      return {
        name: "empty todo...",id:"",gender:"",epaper:true,dob:'2016-01-01'
      };
    }
  });
  var TodoList = Backbone.Collection.extend({
    model: Todo,
    url : "/extjs/board/",
    //localStorage: new Backbone.LocalStorage("todos-backbone"),
  });
  var todos = new TodoList();
  var TodoEditView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#item-edit-template').html()),
    events: {
      //"dblclick .view"  : "edit",
      "click #bt_save" : "save",
       "click #bt_clear" : "myclear",
      //"keypress .edit"  : "updateOnEnter",
      //"blur .edit"      : "close"
    },
    save:function(){
      console.log("save click");
      this.model.save();
      if(this.model.get("id")=="")
          todos.add(this.model);
    },
    myclear:function(){
      console.log("clear click");
      this.model=new Todo();
      this.render();
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      // this.input = this.$('.edit');
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
    // edit: function() {
    //   this.$el.addClass("editing");
    //   this.input.focus();
    // },
    // close: function() {
    //   var value = this.input.val();
    //   if (!value) {
    //     this.clear();
    //   } else {
    //     this.model.save({name: value});
    //     this.$el.removeClass("editing");
    //   }
    // },
    // updateOnEnter: function(e) {
    //   if (e.keyCode == 13) this.close();
    // },
    // clear: function() {
    //   this.model.destroy();
    // }
  });
  var TodoView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#item-template').html()),
    events: {
      //"dblclick .view"  : "edit",
      "click .item_edit" : "edit",
       "click .item_delete" : "delete",
      //"keypress .edit"  : "updateOnEnter",
      //"blur .edit"      : "close"
    },
    edit:function(){
      console.log("edit click");
      console.log(App);
      App.editview.model=this.model;
      App.editview.render();
    },
    delete:function(){
      console.log("delete click");
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
    // edit: function() {
    //   this.$el.addClass("editing");
    //   this.input.focus();
    // },
    // close: function() {
    //   var value = this.input.val();
    //   if (!value) {
    //     this.clear();
    //   } else {
    //     this.model.save({name: value});
    //     this.$el.removeClass("editing");
    //   }
    // },
    // updateOnEnter: function(e) {
    //   if (e.keyCode == 13) this.close();
    // },
    // clear: function() {
    //   this.model.destroy();
    // }
  });
  var AppView = Backbone.View.extend({
    el: $("#todoapp"),
    // events: {
    //   "keypress #new-todo":  "createOnEnter",
    // },
    // buttonclear_click:function(event){
    //   var table = event.data.appview.table;
    //   //console.log(this.table);
    //   var cs = table[0].children;
    //   //console.log(cs);
    //   cs = cs[0].children;
    //   var data = {}
    //   for (var i = 0; i < cs.length; i++) {
    //       var input1 = cs[i].children[1].children[0];
    //       if(input1.attributes["type"].value=="checkbox")
    //       {
    //         input1.checked=false;
    //       }
    //       else
    //       {
    //         input1.value="";//setAttribute("value","");
    //       }
    //   }
    // },
    // buttonedit_click:function(event){
    //   var tmpid=event.currentTarget.attributes["data"].value;
    //   var table = event.data.appview.table;
    //   var themodel=null;
    //    for(var i=0;i<todos.length;i++)
    //   {
    //         if(todos.models[i].attributes.id==tmpid)
    //         {
    //           themodel=todos.models[i]; 
    //           break;
    //         }
    //   }
    //   var cs = table[0].children;
    //   //console.log(cs);
    //   cs = cs[0].children;
    //   for (var i = 0; i < cs.length; i++) {
    //       var input1 = cs[i].children[1].children[0];
    //       var name=input1.attributes["name"].value;
    //       //console.log(themodel.attributes[name]);
    //       if(input1.attributes["type"].value=="checkbox")
    //       {
    //         input1.checked=themodel.attributes[name];
    //       }
    //       else
    //       {
    //         input1.value=themodel.attributes[name];//.value;
    //       }
    //   }
    // },
    // buttondelete_click:function(event){
    //   var tmpid=event.currentTarget.attributes["data"].value;
    //   var table = event.data.appview.table;
    //   var themodel=null;
    //    for(var i=0;i<todos.length;i++)
    //   {
    //         if(todos.models[i].attributes.id==tmpid)
    //         {
    //           themodel=todos.models[i]; 
    //           break;
    //         }
    //   }
    //   if(themodel!=null) themodel.destroy();
    // },
    // buttonsave_click:function(event){
    //   //console.log("save click");
    //   //console.log(this);
    //   //console.log(event);
    //   var table = event.data.appview.table;
    //   //console.log(this.table);
    //   var cs = table[0].children;
    //   //console.log(cs);
    //   cs = cs[0].children;
    //   var data = {}
    //   for (var i = 0; i < cs.length; i++) {
    //       var input1 = cs[i].children[1].children[0];
    //       ////console.log(cs[i].children[1].children[0].value);
    //       //console.log(input1.attributes["type"]);
    //       if(input1.attributes["type"].value=="checkbox")
    //       {
    //        data[input1.name] = input1.checked; 
    //       }
    //       else
    //       {
    //         data[input1.name] = input1.value;
    //       }
    //   }
    //   if(data["id"]!="")
    //   {
    //      var tmp=data["id"];
    //      var tmpid=parseInt(tmp);
    //      for(var i=0;i<todos.length;i++)
    //      {
    //         if(todos.models[i].attributes.id==tmpid)
    //         {
    //          todos.models[i].save(data); 
    //           break;
    //         }
    //      }
    //   }
    //   else{
    //     todos.create(data);
    //   }
    //   //console.log(data);
    //   event.data.appview.buttonclear_click(event);
    // },
    initialize: function() {
      this.table = this.$("#table_input");
      //console.log("init"+this.table);
      //console.log(this);
      //this.input = this.$("#new-todo");
      this.listenTo(todos, 'add', this.addOne);
      this.listenTo(todos, 'reset', this.addAll);
      this.listenTo(todos, 'all', this.render);
      this.main = $('#main');
      this.editview = new TodoEditView({model: new Todo()});
      this.$("#section_edit").append(this.editview.render().el);
      // this.bt_save = this.$("#bt_save");
      // this.bt_save.bind("click", {appview:this}, this.buttonsave_click);
      // this.$("#bt_clear").bind("click", {appview:this}, this.buttonclear_click);
      todos.fetch();
    },
    render: function() {
      if (todos.length) {
        this.main.show();
        // this.$(".item_edit").bind("click", {appview:this}, this.buttonedit_click);
        // this.$(".item_delete").bind("click", {appview:this}, this.buttondelete_click);
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
