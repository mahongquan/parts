//todo create delete
$(function(){
  // Backbone.ajax = function() {
  //   var param = arguments[0];
  //   if (param.success) {//修改响应数据
  //     var oldSuccess = param.success;
  //     var oldError = param.error;
  //     param.success = function() {
  //       var newArguments = Array.prototype.slice.call(arguments, 0);
  //       //newArguments[0]=newArguments[0].data;//remove other
  //       oldSuccess.apply(null, newArguments);
  //     };
  //   }
  //   //2发送请求
  //   console.log("Backbone.ajax");
  //   console.log(param);
  //   console.log(param.data);
  //   return $.ajax({
  //     url : param.url,
  //     data : param.data,
  //     success : param.success,
  //     type : param.type,
  //     dataType :param.dataType
  //     contentType : 'multipart/form-data'//application/x-www-form-urlencoded, multipart/form-data, or text/plain
  //   });
    
  // };
  var myglobal={};
  var Contact = Backbone.Model.extend({
    urlRoot : "/rest/Contact/",
    //fields:['id', 'yonghu', 'addr', 'channels', 'yiqixinghao', 'yiqibh', 'baoxiang', 'shenhe', 'yujifahuo_date', 'tiaoshi_date', 'hetongbh', 'method'],
    defaults: function() {
      var d=new Date();
      var dstr=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      return {
        id:undefined,yonghu:'',addr:'',channels:'',yiqixinghao:'',yiqibh:'',baoxiang:'',shenhe:'',yujifahuo_date:'',tiaoshi_date:'',hetongbh:'',method:''
      };
    }
  });
  var ContactList = Backbone.Collection.extend({
    model: Contact,
    url : "/rest/Contact/",
    //localStorage: new Backbone.LocalStorage("todos-backbone"),
   parse: function(data, options) {
      console.log("parse response");
      if(data.total)
        myglobal.total=data.total;
      return data.data;
   }
  });
  var Package= Backbone.Model.extend({
    urlRoot : "/rest/UsePack/",
    defaults: function() {
      return {
        id:undefined,name:''
      };
    }
  });
  var PackageList = Backbone.Collection.extend({
    model: Contact,
    url : "/rest/UsePack/",
    parse: function(data, options) {
      console.log("parse response");
      // if(data.total)
      //   myglobal.total=data.total;
      return data.data;
   }
  });
  var todos = new ContactList();
  var ContactEditView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#contact-edit-template').html()),
    events: {
      "click #bt_file" : "uploadfile",
       "click #bt_save" : "save",
       "click #bt_clear" : "myclear",
       "click #bt_clearid" : "myclearid",
    },
    upload_click:function(event){
      console.log("upload_click");
      console.log(event.data);
      var view=event.data.view;
      $.ajax({
        context:view,
        url: '/rest/upload',
        type: 'POST',
        cache: false,
        data: new FormData($('#uploadForm')[0]),
        processData: false,
        contentType: false
        }).done(function(res) {
          console.log("done");
          console.log(res);//{"success":True, "files":fullfilepath}
          data=JSON.parse(res);
          if(data.success){
            this.$("#method").val(data.files);
            $('#uploadForm').dialog('close');
            console.log(this);
          }
          else{

          }
        }).fail(function(res) {

        });
    },
    uploadfile:function(){
      $("#upload").bind("click",{view:this},this.upload_click);
      $('#uploadForm').dialog({
            //bgiframe: true,
            //resizable: false, height: "530",width:"200",
            //height:140,
            modal: true
            , overlay: {
                backgroundColor: '#000'
                , opacity: 0.5
            }
            , autoOpen: true, // buttons: {
            //     Cancel: function() {
            //         $(this).dialog('close');
            //     },
            // }
      });
    },
    save_new:function(){
      console.log("upload_click");
      var data=new FormData(this.$('#uploadForm')[0]);
      $.ajax({
        context: this,
        url: "/rest/Contact/",
        cache: false,
        data: data,
        processData: false,
        contentType: false
        , error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
        , success: function (data) {
            console.log("ajax done");
            console.log(data);
            // if (data.success) {
            //     addrow(data.data.id, data.data.name);
            //     $("#dialog").dialog("close");
            // }
        }
      });
    },
    save:function(){
      var data={};
      for(var fname in this.model.attributes){
        if(fname!="id")
        {
            //var name=this.$("#"+fname).attr("name");
            var value=this.$("#"+fname).val();
            if (value) {
              var node=this.$("#"+fname);
              if(node.attr("type")=="checkbox")
              {
                  data[fname]=node[0].checked;
              }
              else
              {
               data[fname]=value;
              }//else
             }//if
        }//if
       }//for
      //console.log(data);
      if(this.model.get("id")==undefined)
      {
          todos.add(this.model);
      }
      this.model.set(data);
      this.model.save(null,{
        success:function(context, model, resp, options){
          console.log(options);
          console.log("save finish");
          //model.set(resp.success.arguments[0].data);
          context.set(model.data);
        }
      });
    },
    myclear:function(){
      //console.log("clear click");
      this.model=new Contact();
      this.render();
    },
    myclearid:function(){//copy
      //this.$("#id").val(undefined);
      data={}//copy data from old model
      for(var fname in this.model.attributes){
        if(fname!="id")
        {
              data[fname]=this.model.get(fname);
        }
      }
      data["id"]=undefined;//id undefined save use POST,else use PUT
      this.model=new Contact();
      this.model.set(data);
      this.render();
      this.listenTo(this.model, 'change', this.render);//model change must relisten
      this.listenTo(this.model, 'destroy', this.remove);
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$("#yujifahuo_date").datepicker({
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
       this.$("#tiaoshi_date").datepicker({
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
  var ContactView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#contact-template').html()),
    events: {
      "click .contact_edit" : "edit",
      "click .contact_delete" : "delete",
      "click .contact_package" : "package",
    },
    package:function(){
      var packageListview = new PackageListView({model:this.model});
           packageListview.render();
           packageListview.$el.dialog({
                modal: true
                , overlay: {
                    backgroundColor: '#000'
                    , opacity: 0.5
                }
                , autoOpen: true
       });
    },
    edit:function(){
        App.editview.model=this.model;
        //App.$("#section_edit").show();
        App.editview.render();
        App.editview.$el.dialog({
                modal: false
                , overlay: {
                    backgroundColor: '#000'
                    , opacity: 0.5
                }
                , autoOpen: true
       });
    },
    true_delete:function(){
        var data={};
        data.id=this.model.get("id");
        data.csrfmiddlewaretoken=csrf_token;
        data= JSON.stringify(data);
        this.model.destroy({ data:data,contentType:"application:json"});
    },
    delete:function(){
          //delete-template
           var deleteview = new DeleteView({model:this});
           deleteview.render();
           deleteview.$el.dialog({
                modal: true
                , overlay: {
                    backgroundColor: '#000'
                    , opacity: 0.5
                }
                , autoOpen: true
           });
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
     events: {
      "click #id_bt_search" : "mysearch",
    },
    mysearch:function(){
       myglobal.search=this.$("#id_input_search").val();
       myglobal.start=0;
       console.log("search="+myglobal.search);
       App.mysetdata();
    },

    button_prev_click:function(){
        myglobal.start=myglobal.start-myglobal.limit;
        if(myglobal.start<0) myglobal.start=0;
        //todos.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        App.mysetdata();
        //console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    button_next_click:function(){
        myglobal.start=myglobal.start+myglobal.limit;
        if(myglobal.start>myglobal.total-myglobal.limit) myglobal.start=myglobal.total-myglobal.limit;
        App.mysetdata();//todos.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        //console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    mysetdata:function(){
        this.$("#todo-list").empty();
        todos.fetch({
            reset:true,
            data: { start:myglobal.start,limit:myglobal.limit,search:myglobal.search},
            success:function(){
                console.log(todos.length+" todo")
                this.$("#page").empty();
                var right=myglobal.start+myglobal.limit
                this.$("#page").append((myglobal.start+1)+"..."+right+" of "+myglobal.total);
            },
            error:function(){
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    afterlogin:function(){
        myglobal.start=0;
        myglobal.limit=3;
        myglobal.total=0;
        myglobal.search="";
        this.listenTo(todos, 'add', this.addOne);
        this.listenTo(todos, 'reset', this.addAll);
        this.listenTo(todos, 'all', this.render);
        this.main = $('#main');
        this.editview = new ContactEditView({model: new Contact()});
        //this.$("#section_edit").append(this.editview.render().el);
        this.$("#bt_prev").bind("click", {}, this.button_prev_click);
        this.$("#bt_next").bind("click", {}, this.button_next_click);
        //this.$("#bt_search").bind("click", {}, this.search);
        this.mysetdata();
    },
    initialize: function() {
      if (user=="AnonymousUser"){
        console.log("begin login");
        this.userv= new UserView({model: new User()});
        this.$("#current_user").append(this.userv.render().el);
      }
      else{
        this.afterlogin();
      }
    },
    render: function() {
       if (todos.length) {
         this.main.show();
         //this.$("#section_edit").hide();
       } else {
         this.main.hide();
         //this.$("#section_edit").show();
       }
    },
    addOne: function(todo) {
      var view = new ContactView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },
    addAll: function() {
      todos.each(this.addOne, this);
    },
  });
  $("#current_user_name").text(user);
  var User = Backbone.Model.extend({
    defaults: function() {
      return {
        username:'mahongquan',password:'333333',csrfmiddlewaretoken:csrf_token
      };
    }
  });
  var UserView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#login-template').html()),
    events: {
      "click #bt_login" : "login",
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    login:function(){
      console.log("login");
      var data={};
       for(var name in this.model.attributes){
            console.log(name);
            var value=this.$("#"+name).val();
            if (value) {
              var node=this.$("#"+name);
              if(node.attr("type")=="checkbox")
              {
                  data[name]=node[0].checked;
              }
              else
              {
               data[name]=value;
              }
             }
       }//for
       console.log(data);
        $.ajax({
          context: App
          , type: 'POST'
          , url: "/rest/login"
          , data: data
          , complete: function () {
          }
          , error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(errorThrown);
          }
          , success: function (data) {
              console.log("ajax done");
              console.log(data);
              data=JSON.parse(data);
              if (data.success) {
                   user=data.data.name;
                  $("#current_user_name").text(user);
                  $("#current_user").attr("hidden",true);
                  //var app=$(this);
                  this.afterlogin();
              }
          }
      });
    },
  });  
  var DeleteView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#delete-template').html()),
    events: {
      "click #id_ok" : "ok",
      "click #id_cancel" : "cancel"
    },
    initialize: function() {
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    cancel:function(){
      console.log("cancel");
      var contactlistview=this.model;
      this.$el.dialog('close');
    },
    ok:function(){
      console.log("ok");
      var contactlistview=this.model;//ture object is view
      contactlistview.true_delete();
      this.$el.dialog("close");
    }
  });  
  /////////////////////////////////////////////////////////packageListView
  var PackageListView = Backbone.View.extend({
     tagName:  "div",
     template: _.template($('#package-list-template').html()),
     events: {
      "click #id_select_package" : "select_package",
    },
    select_package:function(){
      console.log("select_package");
    },
    button_prev_click:function(){
        myglobal.start=myglobal.start-myglobal.limit;
        if(myglobal.start<0) myglobal.start=0;
        //todos.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        App.mysetdata();
        //console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    button_next_click:function(){
        myglobal.start=myglobal.start+myglobal.limit;
        if(myglobal.start>myglobal.total-myglobal.limit) myglobal.start=myglobal.total-myglobal.limit;
        App.mysetdata();//todos.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        //console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    mysetdata:function(){
        this.$("#todo-list").empty();
        todos.fetch({
            reset:true,
            data: { start:myglobal.start,limit:myglobal.limit,search:myglobal.search},
            success:function(){
                console.log(todos.length+" todo")
                this.$("#page").empty();
                var right=myglobal.start+myglobal.limit
                this.$("#page").append((myglobal.start+1)+"..."+right+" of "+myglobal.total);
            },
            error:function(){
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    afterlogin:function(){
        myglobal.start=0;
        myglobal.limit=3;
        myglobal.total=0;
        myglobal.search="";
        this.listenTo(todos, 'add', this.addOne);
        this.listenTo(todos, 'reset', this.addAll);
        this.listenTo(todos, 'all', this.render);
        this.main = $('#main');
        this.editview = new ContactEditView({model: new Contact()});
        //this.$("#section_edit").append(this.editview.render().el);
        this.$("#bt_prev").bind("click", {}, this.button_prev_click);
        this.$("#bt_next").bind("click", {}, this.button_next_click);
        //this.$("#bt_search").bind("click", {}, this.search);
        this.mysetdata();
    },
    initialize: function() {
      if (user=="AnonymousUser"){
        console.log("begin login");
        this.userv= new UserView({model: new User()});
        this.$("#current_user").append(this.userv.render().el);
      }
      else{
        this.afterlogin();
      }
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    addOne: function(todo) {
      var view = new ContactView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },
    addAll: function() {
      todos.each(this.addOne, this);
    },
  });
 //////////////////////////////////////////////////////////packageView
  var PackageView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#package-template').html()),
    events: {
      "click .contact_edit" : "edit",
      "click .contact_delete" : "delete",
    },
    edit:function(){
      console.log("edit");
    },
    delete:function(){
      console.log("delete");
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
   var App = new AppView();
});
