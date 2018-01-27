var user=user || "AnonymousUser";
var csrf_token=csrf_token || "";

if(host==undefined )
{
    var host="http://127.0.0.1:8000";   
}
$(function(){
  console.log("here");
        var availableTags = [
          "CS-1011C",
          "CS-2800",
          "CS-3000",
          "CS-3000G",
          "HD-5",
          "N-3000",
          "O-3000",
          "OH-3000",
          "ON-3000",
          "ON-4000",
          "ONH-3000"
        ];
        
        var availableTags_2 = [
          "1O(低氧)",
          "1O(高氧)",
          "1O(低氧)+2N",
          "1C(低碳)+2S",
          "1C(高碳)+2S",
          "2C+1S(低硫)",
          "2C+1S(高硫)",
          "2C+2S",
          "2O+2N",
          "2O",
        ];
function nowDate() {
    var date=new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var s_month=""+month;
    if (s_month.length<2) s_month="0"+s_month;
    var day = date.getDate();
    var s_day=""+day;
    if (s_day.length<2) s_day="0"+s_day;
    return year + "-" + s_month + "-" + s_day ;
}
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//   var object = {};
//   _.extend(object, Backbone.Events);
// var object2 = {};
//   _.extend(object2, Backbone.Events);
//   object.on("alert", function(msg) {
//     alert("object Triggered " + msg);
//   });
//   object2.on("alert", function(msg) {
//     alert("object2 Triggered " + msg);
//   });
//   object.trigger("alert", "an event");
//   object2.trigger("alert", "an event");
  $("#dropdownMenu1_text").text(user);
  
  var cache={};
  var cache_item={};
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
  //   //console.log("Backbone.ajax");
  //   //console.log(param);
  //   //console.log(param.data);
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
    urlRoot : host+"/rest/Contact/",
    //fields:['id', 'yonghu', 'addr', 'channels', 'yiqixinghao', 'yiqibh', 'baoxiang', 'shenhe', 'yujifahuo_date', 'tiaoshi_date', 'hetongbh', 'method'],
    defaults: function() {
      var d=new Date();
      var dstr=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      return {
        id:undefined,yonghu:'',addr:'',channels:'',yiqixinghao:'',yiqibh:'',baoxiang:'',shenhe:'',yujifahuo_date:nowDate(),tiaoshi_date:nowDate(),hetongbh:'',method:''
      };
    }
  });
  var ContactList = Backbone.Collection.extend({
    model: Contact,
    url : host+"/rest/Contact/",
    //localStorage: new Backbone.LocalStorage("contacts-backbone"),
   parse: function(data, options) {
     console.log("parse response:"+data.total);
      if(data.total!=undefined)
        myglobal.total=data.total;
      return data.data;
   }
  });
  var UsePack= Backbone.Model.extend({
    urlRoot : host+"/rest/UsePack/",
    defaults: function() {
      return {
        id:undefined,name:'',contact:undefined,pack:undefined,hetongbh:""
      };
    }
  });
  var Pack= Backbone.Model.extend({
    urlRoot : host+"/rest/Pack/",
    defaults: function() {
      return {
        id:undefined,name:''
      };
    }
  });
  var PackList = Backbone.Collection.extend({
    model: Pack,
    url : host+"/rest/Pack/",
    parse: function(data, options) {
      //console.log("parse response");
      // if(data.total)
      //   myglobal.total=data.total;
      return data.data;
   }
  });
  //{"itemid": 44, "ct": 1, "name": "镍箔", "pack": 111, "id": 1147},
  var Item= Backbone.Model.extend({
    urlRoot : host+"/rest/Item/",
    defaults: function() {
      return {
        id:undefined,name:'',guige:'',bh:'',danwei:''
      };
    }
  });
  var PackItem= Backbone.Model.extend({
    urlRoot : host+"/rest/PackItem/",
    defaults: function() {
      return {
        id:undefined,name:'',itemid:undefined,ct:0,pack:undefined,guige:'',danwei:'',bh:'',quehuo:false
      };
    }
  });
  var PackItemList = Backbone.Collection.extend({
    model: PackItem,
    url : host+"/rest/PackItem/",
    parse: function(data, options) {
      //console.log("parse response");
      // if(data.total)
      //   myglobal.total=data.total;
      return data.data;
   }
  });
  var UsepackList = Backbone.Collection.extend({
    model: UsePack,
    url : host+"/rest/UsePack/",
    parse: function(data, options) {
      //console.log("parse response");
      // if(data.total)
      //   myglobal.total=data.total;
      return data.data;
   }
  });
  var contacts = new ContactList();
  var ContactEditView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#contact-edit-template').html()),
    events: {
       "click #bt_file" : "uploadfile",
       "click #bt_removefile" : "removefile",
       "click #bt_save" : "save",
       "click #bt_clear" : "myclear",
       "click #bt_clearid" : "myclearid",
       "change input" : "mychange",
    },
    removefile:function(){
      this.$("#method").val("");
      this.$("#method").trigger("change");
    },
    mychange:function(event){
      var fname=$(event.target).attr("id");
      var fvalue=$(event.target).val();
      if(this.model.get(fname)!=fvalue){
        $(event.target).addClass( "newClass"); 
      }
      else{
        $(event.target).removeClass( "newClass");  
      }
    },
    uploadfile:function(){
        var dlg=new UploadView({parent:this});
        dlg.showdialog();
    },
    save:function(){
      var data={};
      for(var fname in this.model.attributes){
        if(fname!="id")
        {
            //var name=this.$("#"+fname).attr("name");
            var value=this.$("#"+fname).val();
            if (value!=undefined) {
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
      var newcontact=false
      if(this.model.get("id")==undefined)
      {
          contacts.unshift(this.model);
          newcontact=true;
      }
      if(data.yiqibh==undefined || data.yiqibh==""){
        alert("仪器编号不能为空！");
        return;
      }
      //console.log(data);
      this.model.set(data);
      var self=this;
      this.model.save(null,{
        success:function(context, model, resp, options){
          console.log(resp);
          if(model.success){
            context.set(model.data);
            if (newcontact)
            {
              self.parentview.changeModel(self.model);
            }
          }
          else
          {
            alert(model.message);
          }
        },
        error: function(model, response) {
          alert(response.statusText);
        }
      });
    },
    myclear:function(){
      ////console.log("clear click");
      this.model=new Contact();
      this.render();
    },
    myclearid:function(){//copy
      //this.$("#id").val(undefined);
      //console.log("clearid");
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
      this.parentview.changeModel(this.model);
      this.listenTo(this.model, 'change', this.render);//model change must relisten
      this.listenTo(this.model, 'destroy', this.remove);
    },
    initialize: function() {
      this.parentview=arguments[0].parentview;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      },
    render: function() {
      console.log("ContactEditView render")
      this.$(".mydate").datepicker("destroy");
      this.$el.html(this.template(this.model.toJSON()));

      // this.$("#channels").typeahead('destroy')
      // this.$("#channels").typeahead({source: availableTags_2});

      // this.$("#yiqixinghao").typeahead('destroy')
      // this.$("#yiqixinghao").typeahead({source: availableTags});

      this.$(".mydate").datepicker({
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
/////////////////////////////////////////////////////////////////////////////////////
  var ContactView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#contact-template').html()),
    events: {
      "click .contact_edit" : "edit",
      "click .contact_delete" : "delete",
      "click .contact_usepack" : "usepack",
      "click .contact_zxd" : "zxd",
      "click .contact_chuku" : "checkchuku",
      "click .contact_folder" : "folder",
      "click .contact_quehuo" : "quehuo",
      "click .contact_zs" : "zs",
      "click .contact_detail" : "detail",
      "click .contact_allfile" : "allfile",
      "click .contact_updatemethod" : "updatemethod",
    },
    // folder:function(){
    //   $.getJSON("/rest/folder?id="+this.model.get("id"),function(result){
    //       console.info(result);
    //   });

      // $.getJSON("/rest/folder", request, function (data, status, xhr) {
      //                   cache[term] = data;
      //                   response(data);
      //               });
    //},
    checkchuku:function(){
      check=new CheckChukuView({model:this.model})
      check.showdialog();
    },
    updatemethod:function(){
        var s=new WaitingView();
        s.showdialog();
        var self=this;
        $.getJSON(host+"/rest/updateMethod?id="+this.model.get("id"), function(result){
           console.info(result);
           if (result.success){
              self.model.set(result.data)
           }
           s.$el.dialog('close');
       }).fail(function() {
          alert( "error" );
       });
    },
    folder:function(){
        var s=new WaitingView();
        s.showdialog();
        $.getJSON(host+"/parts/folder?id="+this.model.get("id"), function(result){
           console.info(result);
           s.$el.dialog('close');
       }).fail(function() {
          alert( "error" );
       });
    },
    allfile:function(){
        //window.open("/parts/allfile?id="+this.model.get("id"));
        var s=new WaitingView();
        s.showdialog();
        $.getJSON(host+"/parts/allfile?id="+this.model.get("id"), function(result){
           console.info(result);
           s.$el.dialog('close');
           if (!result.success){
            $("<p>"+result.message+"</p>").dialog();
           }
       }).fail(function() {
        alert( "error" );
       });
    },
    detail:function(){
      window.open(host+"/parts/showcontact/?id="+this.model.get("id"), "detail", 'height=800,width=800,resizable=yes,scrollbars=yes');
    },
    zxd:function(){
        window.open(host+"/parts/zhuangxiangdan?id="+this.model.get("id"));
    },
    quehuo:function(){
        window.open(host+"/parts/que?id="+this.model.get("id"));
    },
    zs:function(){
        window.open(host+"/parts/tar?id="+this.model.get("id"));
    },
    usepack:function(){
           var usepackListView = new UsepackListView({model:this.model});
           //usepackListView.render();
           usepackListView.$el.dialog({
                width:"600px",//height:500,
                modal: true
                , overlay: {
                    backgroundColor: '#000'
                    , opacity: 0.5
                }
                , autoOpen: true,
                close: function (event,ui) {
                   $(this).dialog("destroy");
                }
           });
           usepackListView.$("#auto_pack1").typeahead({});
           // usepackListView.$("#auto_pack1").autocomplete({
           //      minLength: 1
           //      , focus: function (event, ui) {
           //          //$( "#auto_pack1" ).val( ui.item.value);
           //          return false;
           //      }
           //      , select: function (event, ui) {
           //          usepackListView.addrow(ui.item.pk, ui.item.value);
           //          return false;
           //      }
           //      , source: function (request, response) {
           //          var term = request.term;
           //          if (term in cache) {
           //              data = cache[term];
           //              response(data);
           //              return;
           //          }
           //          $.getJSON(host+"/admin/lookups/ajax_lookup/pack", request, function (data, status, xhr) {
           //              cache[term] = data;
           //              response(data);
           //          }).fail(function() {
           //            alert( "error" );
           //          });
           //      }
           //  }).autocomplete("instance")._renderItem = function (ul, item) {
           //      return $("<li>")
           //          .append("<a>" + item.pk + "_" + item.value + "</a>")
           //          .appendTo(ul);
           //  };
    },
    edit:function(){
        //console.log("edit");
        //console.log(arguments)
        var editview= new ContactEditView2({model: this.model});
        editview.showdialog();
        // App.editview.model=this.model;
        //App.$("#section_edit").show();
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
           //var deleteview = new DeleteView({callback:this.true_delete,obj:this});
           //deleteview.showdialog();
           var dlg=new UploadView({parent:this});
        dlg.showdialog();
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

///////////////////////////
  var ContactEditView2 = Backbone.View.extend({
    tagName:  "div",
    attributes:{class:"modal",tabindex:"-1",role:"dialog"},
    template: _.template($('#contact-edit2-template').html()),
    initialize: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.cev=new ContactEditView({model:this.model,parentview:this});
      var v=this.cev.render().el;
      this.$("#id_contact_edit").append(v);
      this.pev=new UsepackListView({model:this.model});
      var v=this.pev.render().el;
      if(this.model.get("id")==undefined)
      {
        this.$("#id_usepack_edit").attr("hidden",true);  
      }
      else
      {
        this.$("#id_usepack_edit").attr("hidden",false);   
      }
      this.$("#id_usepack_edit").append(v);
    },
    showdialog:function(){
        this.render();//must call because editview has no element now;
       // var self=this;
      //   console.log(this.$("#id_mymodal1"));
        
      //   this.cev.$("#yiqixinghao" ).autocomplete({
      //     minLength: 1,
      //     source: availableTags
      //   });
      //   this.cev.$("#channels" ).autocomplete({
      //     minLength: 1,
      //     source: availableTags_2
      //   });
      // this.pev.$("#auto_pack1").autocomplete({
      //           minLength: 1
      //           , focus: function (event, ui) {
      //               //$( "#auto_pack1" ).val( ui.item.value);
      //               return false;
      //           }
      //           , select: function (event, ui) {
      //               self.pev.addrow(ui.item.pk, ui.item.value);
      //               return false;
      //           }
      //           , source: function (request, response) {
      //               var term = request.term;
      //               if (term in cache) {
      //                   data = cache[term];
      //                   response(data);
      //                   return;
      //               }
      //               $.getJSON(host+"/rest/Pack?search="+term, request, function (data, status, xhr) {
      //                   data=data.data;
      //                   cache[term] = data;
      //                   response(data);
      //               }).fail(function() {
      //                 alert( "error" );
      //               });
      //           }
      //       }).autocomplete("instance")._renderItem = function (ul, item) {
      //           return $("<li>")
      //               .append("<a>" + item.pk + "_" + item.value + "</a>")
      //               .appendTo(ul);
      //       }; 
        this.$el.modal();
    },
    changeModel:function(model){
      console.log("changeModel=========================");
      console.log(this.model.get("id"));
      console.log(model.get("id"));
      // if (this.model.get("id")!=model.get("id"))
      // {
        this.model=model
        this.pev.model=this.model;
        this.pev.render();
        this.pev.mysetdata();//refresh data
        if(this.model.get("id")==undefined)
        {
          this.$("#id_usepack_edit").attr("hidden",true);  
        }
        else
        {
          this.$("#id_usepack_edit").attr("hidden",false);   
        }
      // }
    },
    render: function() {
      
      return this;
    },
  });
////////////////////////////////////////////////////////////////////////////
  var AppView = Backbone.View.extend({
     el: $("#todoapp"),
     events: {
      "click #id_bt_search" : "mysearch",
      "click #id_bt_new" : "newcontact",
      "click #id_bt_standard" : "importstandard",
      "click #id_login" : "showlogin",
      "click #id_logout" : "showlogout",
      "click .baoxiang" : "baoxiang",
      "change #id_input_search":"searchChange",
    },
    searchChange:function(){
      myglobal.search=this.$("#id_input_search").val();
    },
    importstandard:function(){
       var editview= new ImportStandardView();
       editview.showdialog();
       // var dlg=new UploadView({parent:this});
       //  dlg.showdialog();
    },
    newcontact:function(){
      //this.$("#id_mymodal1").modal('show');
        var editview= new ContactEditView2({model: new Contact()});
        editview.showdialog();
    },
    mysearch:function(){
       myglobal.search=this.$("#id_input_search").val();
       myglobal.start=0;
       //console.log("search="+myglobal.search);
       App.mysetdata();
    },
    baoxiang:function(event){
        myglobal.baoxiang=event.target.text;
        myglobal.start=0;
        App.mysetdata();
    },
    button_prev_click:function(){
        myglobal.start=myglobal.start-myglobal.limit;
        if(myglobal.start<0) myglobal.start=0;
        //contacts.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        App.mysetdata();
        ////console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    button_next_click:function(){
        myglobal.start=myglobal.start+myglobal.limit;
        if(myglobal.start>myglobal.total-myglobal.limit) myglobal.start=myglobal.total-myglobal.limit;//total >limit
        if(myglobal.start<0)
          myglobal.start=0;
        App.mysetdata();//contacts.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        ////console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
     page_go_click:function(){
        var pg=$("#page_input").val();
        var v=parseInt(pg);
        myglobal.start=v;//myglobal.start+myglobal.limit;
        if(myglobal.start>myglobal.total-myglobal.limit) myglobal.start=myglobal.total-myglobal.limit;//total >limit
        if(myglobal.start<0)
          myglobal.start=0;
        App.mysetdata();//contacts.fetch({ data: { start:myglobal.start,limit:myglobal.limit} });
        ////console.log(myglobal.start+","+myglobal.limit+","+myglobal.total);
    },
    mysetdata:function(){
        this.$("#contact-list").empty();
        contacts.fetch({
            reset:true,
            data: { start:myglobal.start,limit:myglobal.limit,search:myglobal.search,baoxiang:myglobal.baoxiang},
            success:function(){
                //console.log(contacts.length+" contacts")
                this.$("#page").empty();
                var right=myglobal.start+myglobal.limit;
                if (right>myglobal.total) right=myglobal.total;
                if(myglobal.total<1){
                	this.$("#page").append((0)+"..."+right+" of "+myglobal.total);
                  this.$("#page_input").val(0);
                }
                else{
                  var v=myglobal.start+1;
                  this.$("#page_input").val(v);
                	this.$("#page").append(v+"..."+right+" of "+myglobal.total);
                }
            },
            error:function(){
              alert("error");
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    showlogout:function(){
    	//console.log("showlogout");
    	var self=this;
	$.ajax({
	          context: App
	          , type: 'POST'
	          , url: host+"/rest/logout"
	          , complete: function () {
	          }
	          , error: function (XMLHttpRequest, textStatus, errorThrown) {
	              //console.log(errorThrown);
	          }
	          , success: function (data) {
	              //console.log("ajax done");
	              //console.log(data);
	              data=JSON.parse(data);
	              //console.log(data);
	              $("#dropdownMenu1_text").text("AnonymousUser");
                  	$("#li_login").attr("hidden",false);
                  	$("#li_logout").attr("hidden",true);
                  	self.mysetdata();
	          }
	      });
    },
    showlogin:function(){
      //before show login
      var self=this;
      $.ajax({
        //context:view,
        url:host+ '/rest/login_index',
        type: 'GET',
        cache: false,
        processData: false,
        contentType: false
        }).done(function(res) {
          data=JSON.parse(res);
          if(data.success){
            csrf_token=data.csrf_token;
            self.userv= new UserView({model: new User(),app:self});
          self.userv.render();
          self.userv.$el.dialog({
               width:"600px",height:250,
                  modal: true
                  , overlay: {
                      backgroundColor: '#000'
                      , opacity: 0.5
                  }
                  , autoOpen: true,
                  close: function (event,ui) {
                     $(this).dialog("destroy");
                  }
          });
          }
          else{

          }
        }).fail(function(res) {

        });
        
    },
    initialize: function() {
        myglobal.start=0;
        myglobal.limit=9;
        myglobal.total=0;
        myglobal.search="";
        this.listenTo(contacts, 'add', this.addOne);
        this.listenTo(contacts, 'reset', this.addAll);
        this.listenTo(contacts, 'all', this.render);
        this.main = this.$('#main');
        
        //this.$("#section_edit").append(this.editview.render().el);
        this.$("#bt_prev").bind("click", {}, this.button_prev_click);
        this.$("#bt_next").bind("click", {}, this.button_next_click);
        this.$("#page_go").bind("click", {}, this.page_go_click);

      if (user=="AnonymousUser"){
        this.showlogin();
      }
      else{
        this.mysetdata();
      }
    },
    render: function() {
       ////console.log("contact-list render");
       // if (contacts.length) {
       //   this.main.show();
       // } else {
       //   this.main.hide();
       //   //this.$("#section_edit").show();
       // }
    },
    addOne: function(contact) {
      var view = new ContactView({model: contact});
      this.$("#contact-list").append(view.render().el);
    },
    addAll: function() {
      contacts.each(this.addOne, this);
    },
  });
///////////////////////////
  var PackView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#pack-template').html()),
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
  ///////////////////////////////////
  var ImportStandardView = Backbone.View.extend({
    tagName:  "div",
     attributes:{class:"modal",tabindex:"-1",role:"dialog"},
    template: _.template($('#importstandard-template').html()),
    events: {
       "click #bt_upload2" : "uploadfile",
    },
    uploadfile:function(){
      var self=this;
      var data1=new FormData(this.$('#uploadForm')[0]);
      data1.append("id", this.$('#id').val());
      console.log(data1);
      $.ajax({
        context:this.parent,
        url: host+'/rest/standard',
        type: 'POST',
        cache: false,
        data: data1,
        processData: false,
        contentType: false
        }).done(function(res) {
          data=JSON.parse(res);
          if(data.success){
            console.log(data.result);
            self.mysetdata();
          }
          else{
          }
        }).fail(function(res) {
        });
    },
   initialize: function() {
      this.$el.html(this.template());
      this.start=0;
      this.limit=10;
      this.packs= new PackList();;
      this.listenTo(this.packs, 'add', this.addOne);
      this.listenTo(this.packs, 'reset', this.addAll);
      this.listenTo(this.packs, 'all', this.render);
      this.mysetdata();
    },
    mysetdata:function(){
        this.$("#pack-list").empty();
        this.packs.fetch({
            reset:true,
            data: { start:this.start,limit:this.limit,search:"xls"},
            success:function(){
            },
            error:function(){
                alert("error");
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    addOne: function(pack) {
      var view = new PackView({model: pack});
      this.$("#pack-list").append(view.render().el);
    },
    addAll: function() {
      this.packs.each(this.addOne, this);
    },
    render: function() {
      //this.$el.html(this.template());
      return this;
    },
    showdialog:function(){
        this.render();//must call because editview has no element now;
        var self=this;
        this.$el.modal();
    },
  });
 //////////////////////////////////////////////////////////////////////////
  var User = Backbone.Model.extend({
    defaults: function() {
      return {
        username:'mahongquan',password:'333333',csrfmiddlewaretoken:csrf_token
      };
    }
  });
  //////////////////////////////////////////////////////////////////////////
  var UserView = Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#login-template').html()),
    events: {
      "click #bt_login" : "login",
    },
    initialize: function() {
      this.app=arguments[0].app;
      this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    login:function(){
      //console.log("login");
      var data={};
       for(var name in this.model.attributes){
            //console.log(name);
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
       //console.log(data);
       var self=this;
        $.ajax({
          context: App
          , type: 'POST'
          , url: host+"/rest/login"
          , data: data
          , complete: function () {
          }
          , error: function (XMLHttpRequest, textStatus, errorThrown) {
              //console.log(errorThrown);
          }
          , success: function (data) {
              //console.log("ajax done");
              //console.log(data);
              data=JSON.parse(data);
              if (data.success) {
                   user=data.data.name;
                   csrf_token=getCookie('csrftoken'); //Ext.util.Cookies.get("csrftoken");
                  $("#dropdownMenu1_text").text(user);
                  $("#li_login").attr("hidden",true);
                  $("#li_logout").attr("hidden",false);
                  self.$el.modal("hide");
                  self.app.mysetdata();
              }
          }
      });
    },
  });  
/////////////////////////////////////////////////////////////////////////////
  var DeleteView = Backbone.View.extend({
     tagName:  "div",//el: $("#section_usepack"),
     attributes:{class:"modal",tabindex:"-1",role:"dialog"},
     template: _.template($('#delete-template').html()),
    events: {
      "click #delete_ok" : "ok",
      "click #delete_cancel" : "cancel"
    },
    showdialog:function(){
      this.render();
      this.$el.modal("show");
    },
    initialize: function() {
      //console.log(arguments);
      this.callback=arguments[0].callback;
      this.obj=arguments[0].obj;
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    cancel:function(){
      //console.log("cancel");
      //this.$el.dialog('close');
      this.$el.modal("hide");
    },
    ok:function(){
      console.log("ok");
      //var contactlistview=this.model;//ture object is view
      //contactlistview.true_delete();
      //this.callback();
      this.callback.apply(this.obj, []);
      this.$el.modal("hide");
    }
  });  
  /////////////////////////////////////////////////////////usepackListView
  var UsepackListView = Backbone.View.extend({
     tagName:  "div",//el: $("#section_usepack"),
     template: _.template($('#usepack-list-template').html()),
     events: {
      "click #id_new_usepack" : "new_usepack",
      "click #id_bibei_usepack" : "bibei_usepack",
    },
    bibei_usepack:function(){
      this.$("#auto_pack1").val("必备");
      this.$("#auto_pack1").trigger("keydown");
    },
    new_usepack:function(){
      //console.log("select_usepack");
      var p=new Pack();
      var self=this;
      p.set({name:this.$("#new_pack1").val()});
      p.save(null,{
        success:function(context, model, resp, options){
          //console.log(options);
          //console.log("save finish");
          //model.set(resp.success.arguments[0].data);
          context.set(model.data);
          //self.usepacks.add(p);
          //alert("success");
          self.addrow(p.get("id"),p.get("name"));
          self.$("#new_pack1").val("");
        },
        error: function(model, response) {
          alert(response.statusText);
        }
      });
    },
    mysetdata:function(){
        this.$("#usepack-list").empty();
        this.usepacks.fetch({
            timeout:8000,
            reset:true,
            data: { contact:this.model.get("id"),"limit":30},
            success:function(){
                ////console.log(this.usepacks.length+" usepacks")
                // this.$("#page").empty();
                // var right=myglobal.start+myglobal.limit
                // this.$("#page").append((myglobal.start+1)+"..."+right+" of "+myglobal.total);
            },
            error:function(context, model, resp, options){
              console.log("error");
              alert("error");
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    initialize: function() {
       this.usepacks = new UsepackList();
       this.listenTo(this.usepacks, 'add', this.addOne);
       this.listenTo(this.usepacks, 'reset', this.addAll);
       this.listenTo(this.usepacks, 'all', this.render);
       this.$el.html(this.template(this.model.toJSON()));
       this.mysetdata();
    },
    addrow:function(pk,value){
      //console.log(pk);
      //console.log(value);
      var p=new UsePack();
      var self=this;
      p.set({contact:this.model.get("id"),name:value,pack:pk});
      p.save(null,{
        success:function(context, model, resp, options){
          //console.log(options);
          //console.log("save finish");
          //model.set(resp.success.arguments[0].data);
          context.set(model.data);
          self.usepacks.add(p);
        },
        error: function(model, response) {
          alert(response.statusText);
        }
      });
    },
    render: function() {
      //console.log("usepack-list render");//_.template($('#usepack-list-template').html()),
       //this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    addOne: function(usepack) {
      //console.log("addOne usepacks");
      var view = new UsepackView({model: usepack});
      var viewc=view.render().el;
      //console.log(viewc);
      this.$("#usepack-list").append(viewc);
    },
    addAll: function() {
      //console.log("addAll usepacks");
      this.usepacks.each(this.addOne, this);
    },
  });
 //////////////////////////////////////////////////////////UsepackView
  var UsepackView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#usepack-template').html()),
    events: {
      "click .usepack_edit" : "edit",
      "click .usepack_delete" : "delete",
    },
    edit:function(){
      //console.log("edit");
      var packitemListView = new PackItemListView({model:this.model});
           packitemListView.$el.modal();
           // packitemListView.$el.dialog({
           //      width:"600px",//height:500,
           //      modal: true
           //      , overlay: {
           //          backgroundColor: '#000'
           //          , opacity: 0.5
           //      }
           //      , autoOpen: true,
           //      close: function (event,ui) {
           //         $(this).dialog("destroy");
           //      }

           // });
           // packitemListView.$("#auto_item1").autocomplete({
           //      minLength: 2
           //      , focus: function (event, ui) {
           //          //$( "#auto_pack1" ).val( ui.item.value);
           //          return false;
           //      }
           //      , select: function (event, ui) {
           //          packitemListView.addrow(ui.item.id, ui.item.name);
           //          return false;
           //      }
           //      , source: function (request, response) {
           //          var term = request.term;
           //          request={ query: term,limit:50};
           //          if (term in cache_item) {
           //              data = cache_item[term];
           //              response(data.data);
           //              return;
           //          }
           //          $.getJSON(host+"/rest/Item", request, function (data, status, xhr) {
           //              cache_item[term] = data;
           //              response(data.data);
           //          }).fail(function() {
           //            alert( "error" );
           //          });
           //      }
           //  }).autocomplete("instance")._renderItem = function (ul, item) {
           //      return $("<li>")
           //          .append("<a>" + item.id + "_" + item.name+ "_" + item.guige + "</a>")
           //          .appendTo(ul);
           //  };
    },
    true_delete:function(){
        var data={};
        data.id=this.model.get("id");
        data.csrfmiddlewaretoken=csrf_token;
        data= JSON.stringify(data);
        this.model.destroy({ data:data,contentType:"application:json"});     
    },
    delete:function(){
      var deleteview = new DeleteView({callback:this.true_delete,obj:this});
      deleteview.showdialog();
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
  /////////////////////////////
  ///////
  /////////////////////////////////////////////////////////usepackListView
  var PackItemListView = Backbone.View.extend({
     tagName:  "div",//el: $("#section_usepack"),
      attributes:{class:"modal",tabindex:"-1",role:"dialog"},
     template: _.template($('#packitem-list-template').html()),
     events: {
      "click #id_new_packitem" : "new_packitem",
    },
    new_packitem:function(){
      //console.log("new packitem");
      var p=new Item();
      var self=this;
      var nm=this.$("#new_item1").val();
      if(nm=="") {alert("输入备件名称");return;}
      p.set({name:this.$("#new_item1").val()});
      p.save(null,{
        success:function(context, model, resp, options){
          //console.log(options);
          //console.log("save finish");
          //model.set(resp.success.arguments[0].data);
          context.set(model.data);
          //self.usepacks.add(p);
          //alert("success");
          self.addrow(p.get("id"),p.get("name"));
          self.$("#new_item1").val("");
        },
        error: function(model, response) {
          alert(response.statusText);
        }
      });
    },
    mysetdata:function(){
        this.$("#packitem-list").empty();
        this.packitems.fetch({
            reset:true,
            data: { pack:this.model.get("pack"),start:0,limit:200},
            success:function(){
                ////console.log(this.usepacks.length+" usepacks")
                // this.$("#page").empty();
                // var right=myglobal.start+myglobal.limit
                // this.$("#page").append((myglobal.start+1)+"..."+right+" of "+myglobal.total);
            },
            error:function(){
              alert("error");
            }
          }
        );//{ reset: true,data: { start:this.start,limit:this.limit} });
    },
    initialize: function() {
       this.packitems = new PackItemList();
       this.listenTo(this.packitems, 'add', this.addOne);
       this.listenTo(this.packitems, 'reset', this.addAll);
       this.listenTo(this.packitems, 'all', this.render);
       this.$el.html(this.template(this.model.toJSON()));
       // this.pie=new PackItemEditView({model:new PackItem()});
       // this.$("#packitem-edit").append(this.pie.render().el);
       this.mysetdata();
    },
    addrow:function(pk,value){
      //console.log(pk);
      //console.log(value);
      var p=new PackItem();
      var self=this;
      p.set({pack:this.model.get("pack"),name:value,itemid:pk,ct:1});
      p.save(null,{
        success:function(context, model, resp, options){
          //console.log(options);
          //console.log("save finish");
          //model.set(resp.success.arguments[0].data);
          context.set(model.data);
          self.packitems.add(p);
        },
        error: function(model, response) {
          alert(response.statusText);
        }
      });
    },
    render: function() {
      //console.log("packitem-list render");//_.template($('#usepack-list-template').html()),
       //this.$el.html(this.template(this.model.toJSON()));
      //return this;
    },
    addOne: function(packitem) {
      //console.log("addOne usepacks");
      var view = new PackItemView({model: packitem});
      var viewc=view.render().el;
      //console.log(viewc);
      this.$("#packitem-list").append(viewc);
    },
    addAll: function() {
      //console.log("addAll usepacks");
      this.packitems.each(this.addOne, this);
    },
  });
 //////////////////////////////////////////////////////////UsepackView
  var PackItemView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#packitem-template').html()),
    events: {
      "click .packitem_edit" : "edit",
      "click .packitem_delete" : "delete",
    },
    edit:function(){
      //console.log("edit");
       var packitemedit=new PackItemEditView({model:this.model});
       packitemedit.render();
       packitemedit.$el.modal("show");
    },
    true_delete:function(){
        var data={};
        data.id=this.model.get("id");
        data.csrfmiddlewaretoken=csrf_token;
        data= JSON.stringify(data);
        this.model.destroy({ data:data,contentType:"application:json"});     
    },
    delete:function(){
      var deleteview = new DeleteView({callback:this.true_delete,obj:this});
      deleteview.render();
      deleteview.$el.modal("show");
      //deleteview.showdialog();
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      var node =this.$("#quehuo");// document.getElementById("#epaper");
      node[0].checked=this.model.get("quehuo");
      return this;
    },
  });
  //
  //   var ResultView = Backbone.View.extend({
  //    tagName:  "div",//el: $("#section_usepack"),
  //    template: _.template($('#packitem-list-template').html()),
  //    events: {
  //     "click #id_new_packitem" : "new_packitem",
  //   },
  //   new_packitem:function(){
  //     //console.log("new packitem");
  //     var p=new Item();
  //     var self=this;
  //     p.set({name:this.$("#new_item1").val()});
  //     p.save(null,{
  //       success:function(context, model, resp, options){
  //         //console.log(options);
  //         //console.log("save finish");
  //         //model.set(resp.success.arguments[0].data);
  //         context.set(model.data);
  //         //self.usepacks.add(p);
  //         //alert("success");
  //         self.addrow(p.get("id"),p.get("name"));
  //         self.$("#new_item1").val("");
  //       }
  //     });
  //   },
  //   mysetdata:function(){
  //       this.$("#packitem-list").empty();
  //       this.packitems.fetch({
  //           reset:true,
  //           data: { pack:this.model.get("pack"),start:0,limit:200},
  //           success:function(){
  //               ////console.log(this.usepacks.length+" usepacks")
  //               // this.$("#page").empty();
  //               // var right=myglobal.start+myglobal.limit
  //               // this.$("#page").append((myglobal.start+1)+"..."+right+" of "+myglobal.total);
  //           },
  //           error:function(){
  //           }
  //         }
  //       );//{ reset: true,data: { start:this.start,limit:this.limit} });
  //   },
  //   initialize: function() {
  //      this.packitems = new PackItemList();
  //      this.listenTo(this.packitems, 'add', this.addOne);
  //      this.listenTo(this.packitems, 'reset', this.addAll);
  //      this.listenTo(this.packitems, 'all', this.render);
  //      this.$el.html(this.template(this.model.toJSON()));
  //      // this.pie=new PackItemEditView({model:new PackItem()});
  //      // this.$("#packitem-edit").append(this.pie.render().el);
  //      this.mysetdata();
  //   },
  //   addrow:function(pk,value){
  //     //console.log(pk);
  //     //console.log(value);
  //     var p=new PackItem();
  //     var self=this;
  //     p.set({pack:this.model.get("pack"),name:value,itemid:pk,ct:1});
  //     p.save(null,{
  //       success:function(context, model, resp, options){
  //         //console.log(options);
  //         //console.log("save finish");
  //         //model.set(resp.success.arguments[0].data);
  //         context.set(model.data);
  //         self.packitems.add(p);
  //       }
  //     });
  //   },
  //   render: function() {
  //     //console.log("packitem-list render");//_.template($('#usepack-list-template').html()),
  //      //this.$el.html(this.template(this.model.toJSON()));
  //     //return this;
  //   },
  //   addOne: function(packitem) {
  //     //console.log("addOne usepacks");
  //     var view = new PackItemView({model: packitem});
  //     var viewc=view.render().el;
  //     //console.log(viewc);
  //     this.$("#packitem-list").append(viewc);
  //   },
  //   addAll: function() {
  //     //console.log("addAll usepacks");
  //     this.packitems.each(this.addOne, this);
  //   },
  // });
  //
  var CheckChukuView= Backbone.View.extend({
    tagName:  "div",
    template: _.template($('#check-template').html()),
    events: {
       "click #bt_upload" : "uploadfile",
    },
    uploadfile:function(){
      var self=this;
      var data1=new FormData(this.$('#uploadForm')[0]);
      data1.append("id", this.$('#id').val());
      console.log(data1);
      $.ajax({
        context:this.parent,
        url: host+'/rest/check',
        type: 'POST',
        cache: false,
        data: data1,
        processData: false,
        contentType: false
        }).done(function(res) {
          //console.log("done");
          //console.log(res);//{"success":True, "files":fullfilepath}
          data=JSON.parse(res);
          if(data.success){
            // console.log(data.result);
            self.$("#resultlist").empty();
                        var left=data.result[0];
            var notequal=data.result[1];
            var right=data.result[2];
            var n=left.length;
            if (n<right.length){
              n=right.length;
            }
            var table=$('<table class="table-bordered">');
            var tr=$("<tr>");
            var td=$("<td  style='color:blue;' colspan='3'>装箱单</td>")
            tr.append(td);
            var td=$("<td  style='color:green;' colspan='3'>备料计划</td>")
            tr.append(td);
            table.append(tr);

            for(var i=0;i<n;i++){
              var tr=$("<tr>");
              if(i<left.length){
                for(var one in left[i]){
                    var td=$("<td  style='color:blue;'>"+left[i][one]+"</td>")
                    tr.append(td);
                }
              }
              else{
                var td=$("<td></td>");
                tr.append(td);
                var td2=$("<td></td>");
                tr.append(td2);
                var td3=$("<td></td>");
                tr.append(td3);
              }
              if(i<right.length){
                for(var one in right[i]){
                    var td=$("<td  style='color:green;'>"+right[i][one]+"</td>")
                    tr.append(td);
                }
              }
              else{
                var td=$("<td></td>");
                tr.append(td);
                var td2=$("<td></td>");
                tr.append(td2);
                var td3=$("<td></td>");
                tr.append(td3);
              }
              table.append(tr);
             }
            n=notequal.length;
            for(var i=0;i<n/2;i++){
              var tr=$('<tr style="color:red;">');
              var l=2*i+0;
                for(var one in notequal[l]){
                    var td=$("<td>"+notequal[l][one]+"</td>")
                    tr.append(td);
                }
                var r=2*i+1;
                for(var one in notequal[r]){
                    var td=$("<td>"+notequal[r][one]+"</td>")
                    tr.append(td);
                }
              table.append(tr);
             }
             //table.dialog();
            self.$("#resultlist").append(table);
          }
          else{
            $("<p>仪器编号不一致</p>").dialog();
          }
        }).fail(function(res) {
        });
    },
    showdialog:function(){
        this.render();//must call because editview has no element now;
        var self=this;
        //console.log(this.$el);
        this.$el.modal("show");
    },
    save:function(){
    },
    initialize: function() {
      console.log("init");
      console.log(this.model)
      this.parent=arguments[0].parent;
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });
  //////////////
    var UploadView = Backbone.View.extend({
    tagName:  "div",
    attributes:{class:"modal",tabindex:"-1",role:"dialog"},
    template: _.template($('#upload-template').html()),
    events: {
       "click #bt_upload" : "uploadfile",
    },
    uploadfile:function(){
      var self=this;
      $.ajax({
        context:this.parent,
        url: host+'/rest/upload',
        type: 'POST',
        cache: false,
        data: new FormData(this.$('#uploadForm')[0]),
        processData: false,
        contentType: false
        }).done(function(res) {
          //console.log("done");
          //console.log(res);//{"success":True, "files":fullfilepath}
          data=JSON.parse(res);
          if(data.success){
            //$("#method").val(data.files);
            //view.model.set({method:data.files});
            self.parent.$("#method").val(data.files);
            self.parent.$("#method").trigger("change");
            //$("#upload").removeAttr("disabled");
            self.$el.modal('hide');
          }
          else{
          }
        }).fail(function(res) {
        });
    },
    showdialog:function(){
        this.render();//must call because editview has no element now;
        var self=this;
        //console.log(this.$el);
        this.$el.modal();
       //  this.$el.dialog({
       //          width:"600px",//height:800,
       //          modal: false
       //          , overlay: {
       //              //backgroundColor: '#0F0'
       //              //, 
       //              opacity: 0.5
       //          }
       //          , autoOpen: true,
       //         open: function (event, ui) {
       //           },
       //         close: function (event,ui) {
       //             $(this).dialog("destroy");
       //         }
       // });
    },
    save:function(){
    },
    initialize: function() {
      this.parent=arguments[0].parent;
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
  });
     //////////////
  var WaitingView = Backbone.View.extend({
    tagName:  "div",
    attributes:{class:"modal",tabindex:"-1",role:"dialog"},
    template: _.template($('#waiting-template').html()),
    showdialog:function(){
        this.render();//must call because editview has no element now;
        var self=this;
        //console.log(this.$el);
        this.$el.modal();
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
  });
    //////////////
    var PackItemEditView = Backbone.View.extend({
    tagName:  "div",
     attributes:{class:"modal",tabindex:"-1",role:"dialog"},
    template: _.template($('#packitem-edit-template').html()),
    events: {
       "click #bt_save_item" : "save",
    },
    save:function(){
      var data={};
      //console.log(this.model.attributes);
      for(var fname in this.model.attributes){
           //console.log(fname);
           if(fname!="id" ){
                      var value=this.$("#"+fname).val();
                      if (value!=undefined) {
                        var node=this.$("#"+fname);
                        if(node.attr("type")=="checkbox")
                        {
                            data[fname]=node[0].checked;
                        }
                        else
                        {
                         data[fname]=value;
                        }//else
                      }
           }
       }//for
      this.model.set(data);
      var self=this;
      this.model.save(null,{
        success:function(context, model, resp, options){
          //console.log(options);
          //console.log("packitem save finish");
          //model.set(resp.success.arguments[0].data);
          context.set(model.data);
          self.$el.modal("hide");
        },
        error: function(model, response) {
          alert(response.statusText);
        }
      });
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      var node =this.$("#quehuo");// document.getElementById("#epaper");
      node[0].checked=this.model.get("quehuo");
      return this;
    },
  });
   var App = new AppView();
});