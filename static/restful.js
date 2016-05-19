Ext.require(['Ext.data.*', 'Ext.grid.*','Ext.form.*']);
Ext.define('ui.AddItemForm',{
    extend:'Ext.Panel',
    alias: 'widget.ui.additemform',
    title:'输入已有备件',
    width:250,
    renderTarget:'container',
    fieldWidth:200,
    labelAlign:'right',
    labelWidth:50,
    submitBtnText:'送出',
    cancelBtnText:'取消',
    waitMsg:'登入中...',
    waitTitle:'資料傳送中...',
    style:'margin-left:auto;margin-right:auto',
    padding:'10px;',
    constructor:function(config){
        //Apply the configs 
        Ext.apply(this, config);
        if(typeof config.url == 'undefined' ||
           config.url == ''){
            throw "AddItemForm must have URL to which submit the form";
        }
        this.initConfig(config);
        
        this.callParent([config]);
        
        return this;
    }, //eo constructor()
    
    initComponent:function(){
        
        var packTxt = { xtype:'textfield',
            id:'additem_packTxt',
            name:"pack",
            fieldLabel:"包",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            allowBlank: false,
            blankText:'不可空白',
            minLength: 1,
            hidden:true,
            minLengthText:'最少{0}個字元',
            value:this.packid,
            msgTarget:'under'
        };
         var keywordStore = Ext.create('Ext.data.Store', {
            autoLoad: false,
            model: 'Item',
            proxy: {
                type: 'rest',
                url: '/rest/Item',
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            // listeners: {
            //     write: function(store, operation){
            //         var record = operation.getRecords()[0],
            //             name = Ext.String.capitalize(operation.action),
            //             verb;
     
            //         if (name == 'Destroy') {
            //             verb = 'Destroyed';
            //         } else {
            //             verb = name + 'd';
            //         }
            //     }
            // }
        });
        //Password TextField
        var itemTxt = { xtype:'combo',
            id:'additem_itemTxt',
            store: keywordStore,
            valueField:'id',
            displayField:'name',
            name:"itemid",
            fieldLabel:"备件",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            typeAhead : false,  
            hideLabel : false,  
            hideTrigger : true,  
            minChars: 1,
            matchFieldWidth: true,
            anchor : '100%', 
            listConfig: {
                loadingText: '正在查找...',
                emptyText: '没有找到匹配的数据'
            }
        };
        var ctTxt = { xtype:'textfield',
            id:'additem_ctTxt',
            name:"ct",
            fieldLabel:"数量",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            inputType:'count',
            allowBlank: false,
            blankText:'不可空白',
            minLength: 1,
            minLengthText:'最少{0}個字元',
            value:1,
            msgTarget:'under'
        };
        //Submit button
        var submitBtn = Ext.createWidget('button', {
            text:this.submitBtnText,
            scope:this,
            handler:this.onSubmitClickhandler,
            formBind:true
        });
        
        //Cancel button
        var cancelBtn = Ext.createWidget('button', {
            text:this.cancelBtnText,
            scope:this,
            handler:this.onCancelClickHandler
        });
        
        this.items = [ packTxt, itemTxt,ctTxt];
        this.buttons =[
                       submitBtn,
                       cancelBtn
                       ];
        
        this.callParent();
        
        this.on('afterrender', function(){
            Ext.getCmp('additem_itemTxt').focus();
        });
        
        return this;
    },//eo initComponent()
    
    onSubmitClickhandler:function(btn, evt){
        //masking the content
        //this.getEl().mask('登入中','x-mask-loading');
        console.log(Ext.getCmp('additem_packTxt').value);
        console.log(Ext.getCmp('additem_itemTxt').value);
        console.log(Ext.getCmp('additem_ctTxt').value);
        var p1=new PackItem();//'pack','itemid', 'name','ct'
        p1.data.pack=Ext.getCmp('additem_packTxt').value;
        p1.data.itemid=Ext.getCmp('additem_itemTxt').value;
        p1.data.ct=Ext.getCmp('additem_ctTxt').value;
        this.store.add(p1);
        //this.store.sync();

    },//eo onSubmitClickhandler()
    
    onCancelClickHandler:function(btn, evt){
        evt.stopEvent();
        var form = this.getForm();
        form.reset();
    },//eo onCancelClickHandler()
   
});
Ext.define('ui.NewItemForm',{
    extend:'Ext.Panel',
    alias: 'widget.ui.newitemform',
    title:'输入新备件',
    width:250,
    renderTarget:'container',
    fieldWidth:200,
    labelAlign:'right',
    labelWidth:50,
    submitBtnText:'送出',
    cancelBtnText:'取消',
    waitMsg:'登入中...',
    waitTitle:'資料傳送中...',
    style:'margin-left:auto;margin-right:auto',
    padding:'10px;',
    constructor:function(config){
        //Apply the configs 
        Ext.apply(this, config);
        if(typeof config.url == 'undefined' ||
           config.url == ''){
            throw "AddItemForm must have URL to which submit the form";
        }
        this.initConfig(config);
        
        this.callParent([config]);
        
        return this;
    }, //eo constructor()
    
    initComponent:function(){
        
        var packTxt = { xtype:'textfield',
            id:'newitem_packTxt',
            name:"pack",
            fieldLabel:"包",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            allowBlank: false,
            blankText:'不可空白',
            minLength: 1,
            hidden:true,
            minLengthText:'最少{0}個字元',
            value:this.packid,
            msgTarget:'under'
        };
        var nameTxt = { xtype:'textfield',
            id:'newitem_nameTxt',
            name:"name",
            fieldLabel:"名称",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
        };
        var guigeTxt = { xtype:'textfield',
            id:'newitem_nameTxt',
            name:"name",
            fieldLabel:"名称",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
        };
        var ctTxt = { xtype:'textfield',
            id:'newitem_ctTxt',
            name:"ct",
            fieldLabel:"数量",
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            inputType:'count',
            allowBlank: false,
            blankText:'不可空白',
            minLength: 1,
            minLengthText:'最少{0}個字元',
            value:1,
            msgTarget:'under'
        };
        //Submit button
        var submitBtn = Ext.createWidget('button', {
            text:this.submitBtnText,
            scope:this,
            handler:this.onSubmitClickhandler,
            formBind:true
        });
        
        //Cancel button
        var cancelBtn = Ext.createWidget('button', {
            text:this.cancelBtnText,
            scope:this,
            handler:this.onCancelClickHandler
        });
        
        this.items = [ packTxt, nameTxt,ctTxt];
        this.buttons =[
                       submitBtn,
                       cancelBtn
                       ];
        
        this.callParent();
        
        this.on('afterrender', function(){
            Ext.getCmp('additem_itemTxt').focus();
        });
        
        return this;
    },//eo initComponent()
    
    onSubmitClickhandler:function(btn, evt){
        //masking the content
        //this.getEl().mask('登入中','x-mask-loading');
        console.log(Ext.getCmp('additem_packTxt').value);
        console.log(Ext.getCmp('additem_itemTxt').value);
        console.log(Ext.getCmp('additem_ctTxt').value);
        var p1=new PackItem();//'pack','itemid', 'name','ct'
        p1.data.pack=Ext.getCmp('additem_packTxt').value;
        p1.data.itemid=Ext.getCmp('additem_itemTxt').value;
        p1.data.ct=Ext.getCmp('additem_ctTxt').value;
        this.store.add(p1);
        //this.store.sync();

    },//eo onSubmitClickhandler()
    
    onCancelClickHandler:function(btn, evt){
        evt.stopEvent();
        var form = this.getForm();
        form.reset();
    },//eo onCancelClickHandler()
   
});
Ext.define('ui.LoginForm',{
    extend:'Ext.form.FormPanel',
    alias: 'widget.ui.loginform',
    title:'登入表單',
    width:250,
    usernameTxt:null,
    passwordTxt:null,
    renderTarget:'container',
    usernameFL:'帳號', //username field label
    usernameFN:'username', //username field name
    passwordFL:'密碼', //password field label
    passwordFN:'password', //password field name
    fieldWidth:200,
    labelAlign:'right',
    labelWidth:50,
    submitBtnText:'送出',
    cancelBtnText:'取消',
    waitMsg:'登入中...',
    waitTitle:'資料傳送中...',
    style:'margin-left:auto;margin-right:auto',
    padding:'10px;',
    url:'',
    
    constructor:function(config){
        //Apply the configs 
        Ext.apply(this, config);
        
        if(typeof config.url == 'undefined' ||
           config.url == ''){
            throw "LoginForm must have URL to which submit the form";
        }
        
        this.initConfig(config);
        
        this.callParent([config]);
        
        return this;
    }, //eo constructor()
    
    initComponent:function(){
        
        //Username TextField
        var usernameTxt = { xtype:'textfield',
            id:'loginFormUsernameTxt',
            name:this.usernameFN,
            fieldLabel:this.usernameFL,
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            allowBlank: false,
            blankText:'不可空白',
            minLength: 4,
            minLengthText:'最少{0}個字元',
            msgTarget:'under'
        };
        
        //Password TextField
        var passwordTxt = { xtype:'textfield',
            id:'loginFormPasswordTxt',
            name:this.passwordFN,
            fieldLabel:this.passwordFL,
            labelWidth:this.labelWidth,
            width:this.fieldWidth,
            labelAlign:this.labelAlign,
            inputType:'password',
            allowBlank: false,
            blankText:'不可空白',
            minLength: 4,
            minLengthText:'最少{0}個字元',
            msgTarget:'under'
        };
        var tokenTxt = { xtype:'hidden',
            id:'csrfmiddlewaretoken',
            name:'csrfmiddlewaretoken',
            // fieldLabel:this.passwordFL,
            // labelWidth:this.labelWidth,
            //width:this.fieldWidth,
            // labelAlign:this.labelAlign,
            // inputType:'password',
            value:myglobal.token,
            //allowBlank: false,
            //blankText:'不可空白',
           // minLength: 4,
            //minLengthText:'最少{0}個字元',
            //msgTarget:'under'
        };
        
        //Submit button
        var submitBtn = Ext.createWidget('button', {
            text:this.submitBtnText,
            scope:this,
            handler:this.onSubmitClickhandler,
            formBind:true
        });
        
        //Cancel button
        var cancelBtn = Ext.createWidget('button', {
            text:this.cancelBtnText,
            scope:this,
            handler:this.onCancelClickHandler
        });
        
        this.items = [ //logo, 
                       usernameTxt,
                       passwordTxt,tokenTxt];
        this.buttons =[
                       submitBtn,
                       cancelBtn
                       ];
        // this.tools = [
        //      { id:'plus' , qtip:'註冊', 
        //        scope:this, 
        //        handler:this.onSignUpClickHandler }
        // ],
        
        this.callParent();
        
        this.on('afterrender', function(){
            Ext.getCmp('loginFormUsernameTxt').focus();
        });
        
        return this;
    },//eo initComponent()
    
    //Public methods
    renderForm:function(){
        this.render(this.renderTarget);
    },//eo renderForm()
    
    onSubmitClickhandler:function(btn, evt){
        //masking the content
        this.getEl().mask('登入中','x-mask-loading');
        
        this.submit({
            scope:this,
            success:function(form, action){
                var json=action.response.responseText;
                //var hds=action.response.getAllResponseHeaders();
                //console.log(this.token);
                myglobal.token=Ext.util.Cookies.get("csrftoken");
                //console.log(this.token);
                var resO=eval("(" + json + ')');
                //this.userDiv.dom.childNodes[0].data=resO.data.name;
                this.getEl().unmask('登入成功','x-mask-loading');
                this.getForm().reset();
                this.win.close();
                loadglobal();
            },//eo success()
            failure:function(form, action){
                this.getEl().unmask();
                var alertConfig = {
                    title:'錯誤',
                    //icon: Ext.window.MessageBoxWindow.ERROR,
                    buttons: Ext.Msg.OK,
                    msg:''
                };
                
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        alertConfig.msg = '表單值有誤';
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        alertConfig.msg = 'Ajax連線錯誤';
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        alertConfig.msg = '伺服器訊息：'+action.result.msg;
                }
                
                Ext.Msg.show(alertConfig);
                
            }//eo failure()
        });//eo submit()
        
    },//eo onSubmitClickhandler()
    
    onCancelClickHandler:function(btn, evt){
        evt.stopEvent();
        var form = this.getForm();
        form.reset();
    },//eo onCancelClickHandler()
    
    onSignUpClickHandler:function(){
        
        if(typeof this.signupForm == 'undefined'){
            var params = {
                url:Ext.fly('signupUrl').getAttribute('href')
            };
            this.signupForm = Ext.createWidget('ui.registerform', params);
        }
        this.signupForm.show();
    }//eo onSignUpClickHandler()
});
Ext.define('Item', {
    extend: 'Ext.data.Model',
    //clientIdProperty: 'clientId',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'bh', 'name','guige','danwei'],
    validators: {
        name: {
            type: 'length',
            min: 1
        },
    }
});
Ext.define('Pack', {
    extend: 'Ext.data.Model',
    //clientIdProperty: 'clientId',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'name'],
    validators: {
        name: {
            type: 'length',
            min: 1
        },
    }
});
    // yonghu = models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    // addr = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    // channels = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    // yiqixinghao=models.CharField(max_length=30,verbose_name="仪器型号")#仪器型号
    // yiqibh=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    // baoxiang =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    // shenhe =  models.CharField(max_length=30,verbose_name="审核")#审核
    // yujifahuo_date = models.DateField(verbose_name="预计发货时间")#预计发货时间
    // tiaoshi_date = models.DateField(null=True,blank=True,verbose_name="调试时间",default=datetime.datetime.now)#预计发货时间
    // hetongbh=models.CharField(max_length=30,verbose_name="合同编号")#合同编号
    // method=models.FileField(null=True,blank=True,verbose_name="方法")
Ext.define('Contact', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }
    , 'yonghu', 'addr','channels','yiqixinghao','yiqibh','baoxiang','shenhe'
    ,{name:'yujifahuo_date',type:"date",dateFormat: 'Y-m-d'}
    ,'hetongbh'
    ,{name:'tiaoshi_date',type:"date",dateFormat: 'Y-m-d'}
    ],
    // validators: {
    //     yiqibh: {
    //         type: 'length',
    //         min: 1
    //     },
    // }
});
Ext.define('PackItem', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'pack','itemid', 'name','ct'],
});
Ext.define('UsePack', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'contact', 'pack','hetongbh',"name"],
});
var myglobal={};
var loadglobal=function(){
    /////////////////////////////////////////////////////////////////////////
    myglobal.loadUsePack=function(contact){
        var pageSize1=6;
        var contactid=contact.id;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: false,
            model: 'UsePack',
            proxy: {
                type: 'rest',
                url: '/rest/UsePack/?contact='+contact.id,
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function(store, operation){
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;
     
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                }
            }
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                beforeedit:function(rowEditing, contextrowEditing, contextrowEditing, context){
                    console.log("beforeedit");
                },
                cancelEdit: function(rowEditing, context) {
                    console.log("cancel edit");
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateedit:function(rowEditing, context){
                },
                edit:function(rowEditing, context){
                    store.sync();
                },
            }
        });
      
        var grid = Ext.create('Ext.grid.Panel', {
            //renderTo: "container2",
            bbar:paginTB,
            plugins: [rowEditing],
            //width: 500,
            //height: 330,
            frame: true,
            title: "合同("+contact.hetongbh+')的包清单',
            store: store,
            iconCls: 'icon-contact-item',
            columns: [{
                text: 'ID',
                //width: 50,
                sortable: true,
                dataIndex: 'id',
            },
            {
                text: '合同id',
                flex: 1,
                dataIndex: 'contact',
                hidden:true,
                field: {
                    xtype: 'textfield'
                }
            },
            {
                text: '合同号',
                flex: 1,
                sortable: true,
                hidden:true,
                dataIndex: 'hetongbh',
                field: {
                    xtype: 'displayfield'
                }
            },{
                header: '包id',
                //width: 120,
                sortable: true,
                hidden:true,
                dataIndex: 'pack',
                field: {
                    xtype: 'textfield'
                }
            },{
                header: '包名称',
                flex:1,
                sortable: true,
                dataIndex: 'name',
                width:240,
                field: {
                    xtype: 'displayfield'
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    text: '选取包',
                    iconCls: 'icon-add',
                    handler: function(){
                        selectPack(contact,store);
                    }
                },
                {
                    itemId: 'delete',
                    text: '移除包',
                    iconCls: 'icon-delete',
                    disabled: true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                                 Ext.Msg.show({
                                     message:'确实删除?',
                                     buttons: Ext.Msg.YESNO,
                                     icon: Ext.Msg.QUESTION,
                                     fn: function(btn) {
                                         if (btn === 'yes') {
                                             store.remove(selection);
                                             store.sync();
                                         } else if (btn === 'no') {
                                             console.log('No pressed');
                                         } else {
                                             console.log('Cancel pressed');
                                         } 
                                     }
                                 });
                        }
                    }
                }, '-', 
                {
                    itemId: 'edit',
                    text: '编辑备件',
                    disabled:true,
                    iconCls: 'icon-edit',
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if(selection){
                            myglobal.editPack(selection.data.pack,selection.data.name);//edit usepack 's pack
                        }
                    }
                } 
                ]
            }]
        });
        grid.getSelectionModel().on('selectionchange', function(selModel, selections){
            grid.down('#delete').setDisabled(selections.length === 0);
            grid.down('#edit').setDisabled(selections.length === 0);
        });
        store.load({params:{start:0, limit:pageSize1}});
        return grid;
    };
    myglobal.loadPackItem=function(pack){
        var pageSize1=10;
        var contactid=contact.id;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: false,
            model: 'PackItem',
            proxy: {
                type: 'rest',
                url: '/rest/packitem/?pack='+pack.id,
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'results'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function(store, operation){
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;
     
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                }
            }
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                beforeedit:function(rowEditing, contextrowEditing, contextrowEditing, context){
                    console.log("beforeedit");
                },
                cancelEdit: function(rowEditing, context) {
                    console.log("cancel edit");
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateedit:function(rowEditing, context){
                },
                edit:function(rowEditing, context){
                    store.sync();
                },
            }
        });
      
        var grid = Ext.create('Ext.grid.Panel', {
            //renderTo: "container2",
            bbar:paginTB,
            plugins: [rowEditing],
            //width: 500,
            //height: 330,
            frame: true,
            title: pack.name+' 部件',
            store: store,
            iconCls: 'icon-contact-item',
            columns: [{
                text: 'ID',
                //width: 50,
                sortable: true,
                dataIndex: 'id',
            },
            {
                text: '包id',
                flex: 1,
                dataIndex: 'pack',
                field: {
                    xtype: 'textfield'
                }
            },
            {
                header: '部件id',
                //width: 120,
                sortable: true,
                dataIndex: 'item',
                field: {
                    xtype: 'textfield'
                }
            },{
                header: '部件名称',
                //width: 120,
                sortable: true,
                dataIndex: 'name',
                field: {
                    xtype: 'displayfield'
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    text: 'Add',
                    iconCls: 'icon-add',
                    handler: function(){
                        selectPack(contact,store);
                    }
                }, '-', {
                    itemId: 'delete',
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    disabled: true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                                 Ext.Msg.show({
                                     message:'确实删除?',
                                     buttons: Ext.Msg.YESNO,
                                     icon: Ext.Msg.QUESTION,
                                     fn: function(btn) {
                                         if (btn === 'yes') {
                                             store.remove(selection);
                                             store.sync();
                                         } else if (btn === 'no') {
                                             console.log('No pressed');
                                         } else {
                                             console.log('Cancel pressed');
                                         } 
                                     }
                                 });
                        }
                    }
                }]
            }]
        });
        grid.getSelectionModel().on('selectionchange', function(selModel, selections){
            grid.down('#delete').setDisabled(selections.length === 0);
        });
        store.load({params:{start:0, limit:pageSize1}});
        return grid;
    };     
    /////////////////////////////////////////////////////////////////////////////////////////
    myglobal.loadContact=function(){
        var pageSize1=12;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: false,
            //autoSync: true,
            model: 'Contact',
            proxy: {
                type: 'rest',
                url: '/rest/Contact',
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function(store, operation){
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;
     
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                    //Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                }
            }
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true,
            dock:'bottom',
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {

            listeners: {
                beforeedit:function(rowEditing, contextrowEditing, contextrowEditing, context){
                    console.log("beforeedit");
                },
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateedit:function(rowEditing, context){
                },
                edit:function(rowEditing, context){
                    store.sync();
                },
            }
        });
      
        var grid = Ext.create('Ext.grid.Panel', {
            //renderTo: "container2",
            bbar:paginTB,
            plugins: [rowEditing],
              
            frame: true,
            // title: '合同',
            store: store,
            // iconCls: 'icon-contact',
            columns: [{
                header: 'ID',
                //width: 50,
                sortable: true,
                dataIndex: 'id',
            }, {
                header: '用户',
                flex: 1,
                sortable: true,
                dataIndex: 'yonghu',
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '合同编号',
                //width: 120,
                sortable: true,
                dataIndex: 'hetongbh',
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '预计发货时间',
                width: 120,
                sortable: true,
                dataIndex: 'yujifahuo_date',
                renderer:Ext.util.Format.dateRenderer('Y-m-d'),  
                field: {
                    xtype: 'datefield',
                    id:'yujifahuo_date',
                    format: 'Y-m-d'  
                }
            }, {
                header: '包箱',
                //width: 120,
                sortable: true,
                dataIndex: 'baoxiang',
                field: {
                    xtype: 'textfield'
                }
            }
            , {
                header: '客户地址',
                //width: 120,
                sortable: true,
                dataIndex: 'addr',
                field: {
                    xtype: 'textfield'
                }
            }
            , {
                header: '通道',
                sortable: true,
                dataIndex: 'channels',
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '仪器编号',
                sortable: true,
                dataIndex: 'yiqibh',
                field: {
                    xtype: 'textfield'
                }
            },
             {
                header: '仪器型号',
                sortable: true,
                dataIndex: 'yiqixinghao',
                field: {
                    xtype: 'textfield'
                }
            },
             {
                header: '调试时间',
                sortable: true,
                width:120,
                dataIndex: 'tiaoshi_date',
                field: {
                   xtype: 'datefield',format:"Y-m-d",
                },
            }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                
                {
                    text: '新合同',
                    iconCls: 'icon-add',
                    handler: function(){
                        // empty record
                        store.insert(0, new Contact());
                        rowEditing.startEdit(0, 0);
                    }
                }, 
                '-', 
                // {
                //     itemId: 'delete',
                //     text: '删除合同',
                //     iconCls: 'icon-delete',
                //     disabled: true,
                //     handler: function(){
                //         var selection = grid.getView().getSelectionModel().getSelection()[0];
                //         if (selection) {
                //                  Ext.Msg.show({
                //                      //title:'确实删除?',
                //                      message:'确实删除?',
                //                      buttons: Ext.Msg.YESNO,
                //                      icon: Ext.Msg.QUESTION,
                //                      fn: function(btn) {
                //                          if (btn === 'yes') {
                //                              store.remove(selection);
                //                              store.sync();
                //                          } else if (btn === 'no') {
                //                              console.log('No pressed');
                //                          } else {
                //                              console.log('Cancel pressed');
                //                          } 
                //                      }
                //                  });
                //         }
                //     }
                // },
                {
                    itemId:"detail",
                    text: '详细',
                    //iconCls: 'icon-edit',
                    disabled:true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            onDetail(selection.data);
                        }
                    }
                },
                {
                    itemId:"packlist",
                    text: '装箱单',
                    disabled:true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            //onDetail(selection.data);
                            window.open("/parts/zhuangxiangdan?id="+selection.data.id);
                        }
                    }
                },
                {
                    itemId:"zhengshu",
                    text: '证书',
                    disabled:true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            //onDetail(selection.data);
                            window.open("/parts/tar?id="+selection.data.id);
                        }
                    }
                },
                {
                    itemId:"edit",
                    text: '包信息',
                    iconCls: 'icon-edit',
                    disabled:true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            onUsePack(selection.data);
                        }
                    }
                }
                ]
            }]
        });
        grid.getSelectionModel().on('selectionchange', function(selModel, selections){
            grid.down('#detail').setDisabled(selections.length === 0);
            grid.down('#packlist').setDisabled(selections.length === 0);
            grid.down('#zhengshu').setDisabled(selections.length === 0);
            grid.down('#edit').setDisabled(selections.length === 0);
        });
        store.load({params:{start:0, limit:pageSize1}});
        return grid;
    };
    myglobal.loadPackOld=function(dest_store,contact,window){
        var pageSize1=6;
        var raw_url="/rest/Pack";
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: false,
            model: 'Pack',
            proxy: {
               type: 'rest',
               url: '/rest/Pack',
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function(store, operation){
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;
     
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                    //Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                }
            }
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
       var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {

            listeners: {
                beforeedit:function(rowEditing, contextrowEditing, contextrowEditing, context){
                    console.log("beforeedit");
                },
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateedit:function(rowEditing, context){
                },
                edit:function(rowEditing, context){
                    store.sync();
                },
            }
        });
        var queryStore = function(){
            var targetString = Ext.getCmp('queryText1').getValue();
            store.proxy.url=raw_url+"?search="+targetString;
            store.reload();
        }
        var grid = Ext.create('Ext.grid.Panel', {
                //renderTo: "container2",
                bbar:paginTB,
                plugins: [rowEditing],
                //width: 500,
                //height: 350,
                frame: true,
                title: '包',
                store: store,
                iconCls: 'icon-item',
                columns: [{
                    text: 'ID',
                    //width: 50,
                    sortable: true,
                    dataIndex: 'id',
                }, {
                    header: '名称',
                    flex:1,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [
                    { xtype:'textfield', value:'必备', width:100, id:'queryText1' },
                    { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                    {

                        text: '新建',
                        iconCls: 'icon-add',
                        handler: function(){
                            store.insert(0, new Pack());
                            rowEditing.startEdit(0, 0);
                        }
                    }, '-', {
                        itemId: 'delete',
                        text: '删除',
                        iconCls: 'icon-delete',
                        disabled: true,
                        handler: function(){
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                            if (selection) {
                                     Ext.Msg.show({
                                         //title:'确实删除?',
                                         message:'确实删除?',
                                         buttons: Ext.Msg.YESNO,
                                         icon: Ext.Msg.QUESTION,
                                         fn: function(btn) {
                                             if (btn === 'yes') {
                                                store.remove(selection);
                                                store.sync();
                                             } else if (btn === 'no') {
                                                 console.log('No pressed');
                                             } else {
                                                 console.log('Cancel pressed');
                                             } 
                                         }
                                     });
                            }
                        }
                    },{
                        itemId: 'select',
                        iconCls: 'icon-select',
                        text: '选取',
                        disabled: true,
                        handler: function(){
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                            if (selection) {
                                var r = Ext.create('UsePack', {
                                    contact: contact.id,
                                    pack:selection.data.id,
                                    name:selection.data.name,
                                });
                                dest_store.add(r);
                                dest_store.sync();
                                //dest_store.load();
                                window.close();
                            }
                        }
                    },
                // {
                //     text: '部件',
                //     iconCls: 'icon-edit',
                //     handler: function(){
                //         var selection = grid.getView().getSelectionModel().getSelection()[0];
                //         if (selection) {
                //             selectPackItem(selection.data,store);
                //         }
                //     }
                // }
                ]
                }]
            });
            grid.getSelectionModel().on('selectionchange', function(selModel, selections){
                if (dest_store==undefined) {
                    grid.down('#select').setDisabled(true);
                }
                else
                {
                    grid.down('#select').setDisabled(selections.length === 0);   
                }
                grid.down('#delete').setDisabled(selections.length === 0);
            });
        return grid;
    };
    myglobal.loadDetail=function(contact){
        var raw_url="http://localhost:8000/parts/showcontact/?id="+contact.id;
        var p =new Ext.Panel({  
            region:'center',
            defaults:{autoScroll:true}, 
            width:800,
            height:600,
            layout:'fit',
            items:[{
                 id:'index1',
                 html:"<iframe scrolling='auto' frameborder='0' width='100%' height='100%' src='"+raw_url+"'> </iframe>"
            }],
            enableTabScroll:true  
        });  
        return p;
    };

    myglobal.loadItem=function(dest_store,packid,window){
        var pageSize1=6;
        var raw_url="/rest/Item";
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: false,
            model: 'Item',
            proxy: {
               type: 'rest',
               url: raw_url,
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function(store, operation){
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;
     
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                    //Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                }
            }
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
       var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {

            listeners: {
                beforeedit:function(rowEditing, contextrowEditing, contextrowEditing, context){
                    console.log("beforeedit");
                },
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateedit:function(rowEditing, context){
                },
                edit:function(rowEditing, context){
                    store.sync();
                },
            }
        });
        var queryStore = function(){
            var targetString = Ext.getCmp('queryText1').getValue();
            store.proxy.url=raw_url+"?query="+targetString;
            store.reload();
        }
        var grid = Ext.create('Ext.grid.Panel', {
                //renderTo: "container2",
                bbar:paginTB,
                plugins: [rowEditing],
                //width: 500,
                //height: 350,
                frame: true,
                title: 'Item',
                store: store,
                iconCls: 'icon-item',
                columns: [{
                    text: 'ID',
                    //width: 50,
                    sortable: true,
                    dataIndex: 'id',
                }, {
                    header: '编号',
                    flex:1,
                    sortable: true,
                    dataIndex: 'bh',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '名称',
                    flex:1,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '规格',
                    flex:1,
                    sortable: true,
                    dataIndex: 'guige',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '单位',
                    flex:1,
                    sortable: true,
                    dataIndex: 'danwei',
                    field: {
                        xtype: 'textfield'
                    }
                }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [
                    { xtype:'textfield', value:'必备', width:100, id:'queryText1' },
                    { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                    {

                        text: '新建',
                        iconCls: 'icon-add',
                        handler: function(){
                            store.insert(0, new Item());
                            rowEditing.startEdit(0, 0);
                        }
                    }, '-', {
                        itemId: 'delete',
                        text: '删除',
                        iconCls: 'icon-delete',
                        disabled: true,
                        handler: function(){
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                            if (selection) {
                                     Ext.Msg.show({
                                         //title:'确实删除?',
                                         message:'确实删除?',
                                         buttons: Ext.Msg.YESNO,
                                         icon: Ext.Msg.QUESTION,
                                         fn: function(btn) {
                                             if (btn === 'yes') {
                                                store.remove(selection);
                                                store.sync();
                                             } else if (btn === 'no') {
                                                 console.log('No pressed');
                                             } else {
                                                 console.log('Cancel pressed');
                                             } 
                                         }
                                     });
                            }
                        }
                    },{
                        itemId: 'select',
                        iconCls: 'icon-select',
                        text: '选取',
                        disabled: true,
                        handler: function(){
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                            if (selection) {
                                var r = Ext.create('PackItem', {
                                    pack: packid,
                                    itemid:selection.data.id,
                                    //name:selection.data.name,
                                    ct:1,
                                });
                                dest_store.add(r);
                                dest_store.sync();
                                //dest_store.load();
                                window.close();
                            }
                        }
                    },
                // {
                //     text: '部件',
                //     iconCls: 'icon-edit',
                //     handler: function(){
                //         var selection = grid.getView().getSelectionModel().getSelection()[0];
                //         if (selection) {
                //             selectPackItem(selection.data,store);
                //         }
                //     }
                // }
                ]
                }]
            });
            grid.getSelectionModel().on('selectionchange', function(selModel, selections){
                if (dest_store==undefined) {
                    grid.down('#select').setDisabled(true);
                }
                else
                {
                    grid.down('#select').setDisabled(selections.length === 0);   
                }
                grid.down('#delete').setDisabled(selections.length === 0);
            });
        return grid;
    };

    myglobal.editPack=function(packid,packname){
        var pageSize1=8;
        var raw_url='/rest/PackItem?pack='+packid;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: true,
            model: 'PackItem',
            proxy: {
                type: 'rest',
                url:raw_url,
               useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                write: function(store, operation){
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;
     
                    if (name == 'Destroy') {
                        verb = 'Destroyed';
                    } else {
                        verb = name + 'd';
                    }
                    //Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                }
            }
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {

            listeners: {
                beforeedit:function(rowEditing, contextrowEditing, contextrowEditing, context){
                    console.log("beforeedit");
                },
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                validateedit:function(rowEditing, context){
                },
                edit:function(rowEditing, context){
                    store.sync();
                },
            }
        });
        // var queryStore = function(){
        //     var targetString = Ext.getCmp('queryText1').getValue();
        //     store.proxy.url=raw_url+"?search="+targetString;
        //     store.reload();
        // }
        // var queryStore_2 = function(){
        //     var targetString = Ext.getCmp('queryText1').getValue();
        //     store.proxy.url=raw_url+"?search="+targetString;
        //     store.reload();
        //     //store.load({params:{start:0, limit:pageSize1,search:targetString,search_bh:targetString2}});
        // }
        var grid = Ext.create('Ext.grid.Panel', {
                //renderTo: "container2",
                bbar:paginTB,
                plugins: [rowEditing],
                //width: 500,
                //height: 350,
                frame: true,
                title: "包'"+packname+"'中备件清单",
                store: store,
                iconCls: 'icon-item',
                columns: [{
                    text: 'ID',
                    //width: 50,
                    sortable: true,
                    dataIndex: 'id',
                }, {
                    header: '名称',
                    width: 200,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '包id',
                    //width: 120,
                    sortable: true,
                    hidden:true,
                    dataIndex: 'pack',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '数量',
                    //width: 120,
                    sortable: true,
                    dataIndex: 'ct',
                    field: {
                        xtype: 'textfield'
                    }
                }
                , {
                    header: '备件id',
                    hidden:true,
                    sortable: true,
                    dataIndex: 'itemid',
                    field: {
                        xtype: 'textfield'
                    }
                }
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [
                    // { xtype:'textfield', emptyText:'請輸入名称...', width:100, id:'queryText1' },
                    // { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                    {

                        text: '选取',
                        iconCls: 'icon-add',
                        handler: function(){
                            selectItem(packid,store);
                        }
                    }, '-', 
                    {
                        itemId: 'editpack_delete',
                        text: '删除',
                        iconCls: 'icon-delete',
                        disabled: true,
                        handler: function(){
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                            if (selection) {
                                     Ext.Msg.show({
                                         //title:'确实删除?',
                                         message:'确实删除?',
                                         buttons: Ext.Msg.YESNO,
                                         icon: Ext.Msg.QUESTION,
                                         fn: function(btn) {
                                             if (btn === 'yes') {
                                                store.remove(selection);
                                                store.sync();
                                             } else if (btn === 'no') {
                                                 console.log('No pressed');
                                             } else {
                                                 console.log('Cancel pressed');
                                             } 
                                         }
                                     });
                            }
                        }
                    },]
                }]
            });
            grid.getSelectionModel().on('selectionchange', function(selModel, selections){
                //grid.down('#select').setDisabled(selections.length === 0);   
                grid.down('#editpack_delete').setDisabled(selections.length === 0);
            });
        var helloWindow = new Ext.Window({
            x:100,y:0,width:600,height:720,modal:true
        });
        helloWindow.show('windowDiv');
        helloWindow.add(grid);//editpack grid
        var p1=Ext.create('Ext.Panel', {
            layout: {
                type: 'hbox',
                pack: 'start',              //纵向对齐方式 start：从顶部；center：从中部；end：从底部
                align: 'stretchmax'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
            }
        });
        var panel=new ui.AddItemForm({url:"/rest/PackItem",store:store,packid:packid});
        p1.add(panel);//editpack grid
        // var panel2=new ui.NewItemForm({url:"/rest/PackItem",store:store,packid:packid});
        // p1.add(panel2);//editpack grid
        helloWindow.add(p1);
    };
    var selectPack=function(contact,store){
        console.log("click");
        var helloWindow = new Ext.Window({
            x:100,y:90,width:600,height:400,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadPackOld(store,contact,helloWindow));
    };
    var selectItem=function(packid,store){
        console.log("click");
        var helloWindow = new Ext.Window({
            x:100,y:90,width:600,height:400,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadItem(store,packid,helloWindow));
    };
    var onDetail=function(contact){//
        console.log("click");
        var helloWindow = new Ext.Window({
            x:50,y:90,width:800,height:600,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadDetail(contact));
    }; 
    var onUsePack=function(contact){//
        console.log("click");
        var helloWindow = new Ext.Window({
            x:50,y:90,width:650,height:400,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadUsePack(contact));
    }; 
    var panel = new Ext.Panel({
        // title:'装箱单',
        renderTo:'windowDiv'
    });
    panel.add(myglobal.loadContact());
};
Ext.onReady(function(){
    // var movieList = Ext.get('csrf');
    // var a=movieList.dom.childNodes[0];
    // myglobal.token=a.defaultValue;
    // var userDiv = Ext.get('user');
    // var a=userDiv.dom.childNodes[0];
    // var user=a.data;
    var showLogin=function(){
        var helloWindow = new Ext.Window({
            x:0,y:90,modal:true,
        });
        var loginform=new ui.LoginForm({url:"/rest/login/",token:myglobal.token,win:helloWindow});
        var main = Ext.create('Ext.container.Container', {
            padding: '0 0 0 20',
            width: 300,
            height:150,
            //renderTo: "loginDiv",
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [                loginform,
            ]
        });
        helloWindow.show('windowDiv');
        helloWindow.add(main);
    };
    if (user=="AnonymousUser"){
        showLogin();
    }
    else{
        loadglobal();
    }
    
    //toolbar//////////////////////////////////////////////////////////////////////
});
