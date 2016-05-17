Ext.require(['Ext.data.*', 'Ext.grid.*']);
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
        
        //LoginForm Logo
        // var logo = Ext.createWidget('ui.imglabel',{
        //     id:'loginFormLogo',
        //     //img_src:Ext.fly('loginLogo').getAttribute('src'),
        //     label:'Login'
        // });
        
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
                this.userDiv.dom.childNodes[0].data=resO.data.name;
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
Ext.define('Writer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',

    requires: ['Ext.form.field.Text'],

    initComponent: function(){
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'User -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'name',
                allowBlank: false,
            },{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank: false,
                vtype: 'email'
            }, {
                fieldLabel: 'First',
                name: 'first',
                allowBlank: false
            }, {
                fieldLabel: 'Last',
                name: 'last',
                allowBlank: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function(record){
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();

        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        }
    },

    onCreate: function(){
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function(){
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('Writer.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.RowEditing');//'Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'tbtext',
                    text: '<b>@cfg</b>'
                }, '|', {
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                resizable: false,
                draggable: false,
                hideable: false,
                menuDisabled: true,
                dataIndex: 'id',
                renderer: function(value){
                    return Ext.isNumber(value) ? value : '&nbsp;';
                }
            }, {
                header: 'Name',
                flex: 1,
                sortable: true,
                dataIndex: 'name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Email',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'First',
                width: 100,
                sortable: true,
                dataIndex: 'first',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Last',
                width: 100,
                sortable: true,
                dataIndex: 'last',
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
        this.store.sync();
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        var rec = new Writer.Person({
            first: '',
            last: '',
            email: ''
        }), edit = this.editing;

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: 0,
            column: 1
        });
    }
});
Ext.define('Item.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.itemform',

    requires: ['Ext.form.field.Text'],

    initComponent: function(){
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'Item -- All fields are required',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'name',
                allowBlank: false,
            },{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank: false,
                vtype: 'email'
            }, {
                fieldLabel: 'First',
                name: 'first',
                allowBlank: false
            }, {
                fieldLabel: 'Last',
                name: 'last',
                allowBlank: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Save',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function(record){
        this.activeRecord = record;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();

        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            this.onReset();
        }
    },

    onCreate: function(){
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function(){
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('Item.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.itemgrid',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.RowEditing');//'Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            bbar:this.paginTB,
            height:250,
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                // {
                //     xtype: 'tbtext',
                //     text: '<b>@cfg</b>'
                // }, '|', 
                {
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                    text: 'ID',
                    width: 50,
                    sortable: true,
                    dataIndex: 'id',
                }, {
                    text: '编号',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'bh',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '名称',
                    width: 120,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '规格',
                    width: 120,
                    sortable: true,
                    dataIndex: 'guige',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '单位',
                    width: 120,
                    sortable: true,
                    dataIndex: 'danwei',
                    field: {
                        xtype: 'textfield'
                    }
                }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
        this.store.sync();
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
         var rec = new Item({
            name: '',
            bh: '',
        });
        edit = this.editing;

        edit.cancelEdit();
        //this.store.insert(0, rec);
        this.store.add(rec);
        edit.startEdit(rec,0);
    }
});
Ext.define('Pack.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.packgrid',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.RowEditing');//'Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            bbar:this.paginTB,
            //height:250,
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            }, {
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                {
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                    text: 'ID',
                    //width: 50,
                    sortable: true,
                    dataIndex: 'id',
                }, {
                    header: '名称',
                    //width: 120,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
        this.store.sync();
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
         var rec = new Item({
            name: '',
            bh: '',
        });
        edit = this.editing;

        edit.cancelEdit();
        //this.store.insert(0, rec);
        this.store.add(rec);
        edit.startEdit(rec,0);
    }
});
Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },'name', 'email', 'first', 'last'],
    validators: {
        email: {
            type: 'length',
            min: 1
        },
        first: {
            type: 'length',
            min: 1
        },
        last: {
            type: 'length',
            min: 1
        }
    }
});
Ext.define('Item', {
    extend: 'Ext.data.Model',
    clientIdProperty: 'clientId',
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
    clientIdProperty: 'clientId',
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
Ext.define('Contact', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }
    , 'yonghu', 'yiqixinghao','yiqibh','baoxiang','shenhe',{name:'yujifahuo_date',type:"date"},'hetongbh'],
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
    myglobal.load_user_edit=function(){    
        var store = Ext.create('Ext.data.Store', {
            model: 'Writer.Person',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read: '/rest/app.php_users_view',
                    create: '/rest/app.php_users_create',
                    update: '/rest/app.php_users_update',
                    destroy: '/rest/app.php_users_destroy'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    rootProperty: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    rootProperty: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    if (operation.action == 'destroy') {
                        main.child('#form').setActiveRecord(null);
                    }
                    //Ext.example.msg(operation.action, operation.getResultSet().message);
                }
            }
        });
        var main = Ext.create('Ext.container.Container', {
            padding: '0 0 0 20',
            width: 500,
            height: Ext.themeName === 'neptune' ? 500 : 450,
            //renderTo: document.body,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                itemId: 'form',
                xtype: 'writerform',
                manageHeight: false,
                margin: '0 0 10 0',
                listeners: {
                    create: function(form, data){
                        store.insert(0, data);
                    }
                }
            }, {
                itemId: 'grid',
                xtype: 'writergrid',
                title: 'User List',
                flex: 1,
                store: store,
                listeners: {
                    selectionchange: function(selModel, selected) {
                        main.child('#form').setActiveRecord(selected[0] || null);
                    }
                }
            }]
        });
        return main;
    };
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
            title: contact.hetongbh+' 包',
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
                //width: 120,
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
                    text: 'Add',
                    iconCls: 'icon-add',
                    handler: function(){
                        selectPack(contact,store);
                    }
                },
                {
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
        var pageSize1=6;
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
            //width: 500,
            //height: 330,
           
            frame: true,
            title: '合同',
            store: store,
            iconCls: 'icon-contact',
            columns: [{
                text: 'ID',
                //width: 50,
                sortable: true,
                dataIndex: 'id',
            }, {
                text: '用户',
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
                //width: 120,
                sortable: true,
                dataIndex: 'yujifahuo_date',
                field: {
                    xtype: 'datefield'
                }
            }, {
                header: '包箱',
                //width: 120,
                sortable: true,
                dataIndex: 'baoxiang',
                field: {
                    xtype: 'textfield'
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                
                {
                    text: 'Add',
                    iconCls: 'icon-add',
                    handler: function(){
                        // empty record
                        store.insert(0, new Contact());
                        rowEditing.startEdit(0, 0);
                    }
                }, 
                '-', 
                {
                    itemId: 'delete',
                    text: 'Delete',
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
            grid.down('#delete').setDisabled(selections.length === 0);
            grid.down('#edit').setDisabled(selections.length === 0);
        });
        store.load({params:{start:0, limit:pageSize1}});
        return grid;
    };
    myglobal.selectObject=function(dest_store,contact,model){
        var className=model.$className;
        var helloWindow = new Ext.Window({
            title:className,x:0,y:90,width:600,height:400,modal:true,
        });
        var pageSize1=6;
        var raw_url='/rest/'+className;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: true,
            model: className,
            proxy: {
                type: 'rest',
                url: raw_url,
                useDefaultXhrHeader: false,
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    rootProperty: 'data',
                    messageProperty: 'message',
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    rootProperty: 'data'
                }
            },
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
        var queryStore = function(){
            var targetString = Ext.getCmp('queryText1').getValue();
            var targetString2 = Ext.getCmp('queryText2').getValue();
            store.proxy.url=raw_url+"?search="+targetString+"&search_bh="+targetString2;
            store.reload();
        }
        var clms=[];
        for(var v in model.fields)
        {
            //console.log(model.fields[v]);
            if (model.fields[v] instanceof Array)
                ;
            else
            {
                clms.push({header: model.fields[v].name,
                    sortable: true,
                    dataIndex: model.fields[v].name,
                    field: {
                        xtype: 'textfield'
                    }
                });//console.log(v);
            }
        }
        var grid = Ext.create('Ext.grid.Panel', {
            //renderTo: "container2",
            bbar:paginTB,
            plugins: [rowEditing],
            //width: 500,
            //height: 350,
            frame: true,
            //title: '部件',
            store: store,
            //iconCls: 'icon-item',
            columns: clms,
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                { xtype:'textfield', emptyText:'請輸入名称...', width:100, id:'queryText1' },
                { xtype:'textfield', emptyText:'請輸入编号...', width:100, id:'queryText2' },
                { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                {
                    text: 'Add',
                    iconCls: 'icon-add',
                    handler: function(){
                        // empty record
                        rowEditing.cancelEdit();
                        var o=Ext.create(className);
                        var rec=store.add(o);
                        rowEditing.startEdit(rec);
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
                                     //title:'确实删除?',
                                     message:'确实删除?',
                                     buttons: Ext.Msg.YESNO,
                                     icon: Ext.Msg.QUESTION,
                                     fn: function(btn) {
                                         if (btn === 'yes') {
                                            store.remove(selection);
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
                    text: 'select',
                    disabled: true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            var targetString = Ext.getCmp('queryText_2').getValue();
                            var r = Ext.create('PackItem', {
                                contact: contact.id,
                                item:selection.data.id,
                                name:selection.data.name,
                                ct:targetString
                            });
                            dest_store.add(r);
                            dest_store.sync();
                            dest_store.load();
                            window.close();
                        }
                    }
                }]//items
            }]//dock items
        });
        grid.getSelectionModel().on('selectionchange', function(selModel, selections){
            grid.down('#select').setDisabled(selections.length === 0);
            grid.down('#delete').setDisabled(selections.length === 0);
        });
        helloWindow.show('windowDiv');
        helloWindow.add(grid);//myglobal.loadItem(store,contact,helloWindow));
    };
    //////////////////////////////////////////////////////////////
    myglobal.loadItem=function(dest_store,contact,window){
        var pageSize1=6;
        var raw_url='/rest/Item';//?pack='+contact.id;///?contact='+contact.id,
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: true,
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
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
        var queryStore = function(){
                var targetString = Ext.getCmp('item_queryText1').getValue();
                var targetString2 = Ext.getCmp('item_queryText2').getValue();
                store.proxy.url=raw_url+"?search="+targetString+"&search_bh="+targetString2;
                  store.reload();
        }
        var grid = Ext.create('Ext.grid.Panel', {
            //renderTo: "container2",
            bbar:paginTB,
            plugins: [rowEditing],
            //width: 500,
            //height: 350,
            frame: true,
            title: '部件',
            store: store,
            iconCls: 'icon-item',
            columns: [{
                text: 'ID',
                //width: 50,
                sortable: true,
                dataIndex: 'id',
            }, {
                text: '编号',
                flex: 1,
                sortable: true,
                dataIndex: 'bh',
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '名称',
                //width: 120,
                sortable: true,
                dataIndex: 'name',
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '规格',
                //width: 120,
                sortable: true,
                dataIndex: 'guige',
                field: {
                    xtype: 'textfield'
                }
            }, {
                header: '单位',
                //width: 120,
                sortable: true,
                dataIndex: 'danwei',
                field: {
                    xtype: 'textfield'
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                { xtype:'textfield', emptyText:'請輸入名称...', width:100, id:'item_queryText1' },
                { xtype:'textfield', emptyText:'請輸入编号...', width:100, id:'item_queryText2' },
                { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                {

                    text: 'Add',
                    iconCls: 'icon-add',
                    handler: function(){
                        // empty record
                        store.insert(0, new Item());
                        rowEditing.startEdit(0, 0);
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
                                     //title:'确实删除?',
                                     message:'确实删除?',
                                     buttons: Ext.Msg.YESNO,
                                     icon: Ext.Msg.QUESTION,
                                     fn: function(btn) {
                                         if (btn === 'yes') {
                                            store.remove(selection);
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
                    text: 'select',
                    disabled: true,
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            var targetString = Ext.getCmp('queryText_2').getValue();
                            var r = Ext.create('PackItem', {
                                contact: contact.id,
                                item:selection.data.id,
                                name:selection.data.name,
                                ct:targetString
                            });
                            dest_store.add(r);
                            dest_store.sync();
                            //dest_store.load();
                            window.close();
                        }
                    }
                }]//items
            }]//dock items
        });
        grid.getSelectionModel().on('selectionchange', function(selModel, selections){
            grid.down('#select').setDisabled(selections.length === 0);
            grid.down('#delete').setDisabled(selections.length === 0);
        });
        return grid;
    };
    myglobal.loadPackOld=function(dest_store,contact,window){
        var pageSize1=6;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: true,
            model: 'Pack',
            proxy: {
                type: 'ajax',
                api: {
                    read: '/rest/view_pack',
                    create: '/rest/create_pack',
                    update: '/rest/update_pack',
                    destroy: '/rest/destroy_pack'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    rootProperty: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    rootProperty: 'data'
                },
            },
        });
        var paginTB = {
            xtype:'pagingtoolbar',
            store:store,
            pageSize:pageSize1,
            displayInfo:true
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
        var queryStore = function(){
            var targetString = Ext.getCmp('queryText1').getValue();
            store.proxy.url=raw_url+"?search="+targetString;
            store.reload();
        }
        var queryStore_2 = function(){
            var targetString = Ext.getCmp('queryText1').getValue();
            store.proxy.url=raw_url+"?search="+targetString;
            store.reload();
            //store.load({params:{start:0, limit:pageSize1,search:targetString,search_bh:targetString2}});
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
                    //width: 120,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [
                    { xtype:'textfield', emptyText:'請輸入名称...', width:100, id:'queryText1' },
                    { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                    {

                        text: 'Add',
                        iconCls: 'icon-add',
                        handler: function(){
                            store.insert(0, new Pack());
                            rowEditing.startEdit(0, 0);
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
                                         //title:'确实删除?',
                                         message:'确实删除?',
                                         buttons: Ext.Msg.YESNO,
                                         icon: Ext.Msg.QUESTION,
                                         fn: function(btn) {
                                             if (btn === 'yes') {
                                                store.remove(selection);
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
                        text: 'select',
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
                {
                    text: '部件',
                    iconCls: 'icon-edit',
                    handler: function(){
                        var selection = grid.getView().getSelectionModel().getSelection()[0];
                        if (selection) {
                            selectPackItem(selection.data,store);
                        }
                    }
                }]
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
        var pageSize1=6;
        var store = Ext.create('Ext.data.Store', {
            pageSize:pageSize1,
            autoLoad: true,
            autoSync: true,
            model: 'PackItem',
            proxy: {
                type: 'rest',
                url:'/rest/PackItem?pack='+packid,
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
        var queryStore_2 = function(){
            var targetString = Ext.getCmp('queryText1').getValue();
            store.proxy.url=raw_url+"?search="+targetString;
            store.reload();
            //store.load({params:{start:0, limit:pageSize1,search:targetString,search_bh:targetString2}});
        }
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
                    //width: 120,
                    sortable: true,
                    dataIndex: 'name',
                    field: {
                        xtype: 'textfield'
                    }
                }, {
                    header: '包id',
                    //width: 120,
                    sortable: true,
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
                    //width: 120,
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
                    { xtype:'textfield', emptyText:'請輸入名称...', width:100, id:'queryText1' },
                    { xtype:'button', text:'搜尋', handler:queryStore, scope:this },
                    {

                        text: 'Add',
                        iconCls: 'icon-add',
                        handler: function(){
                            store.insert(0, new PackItem());
                            rowEditing.startEdit(0, 0);
                        }
                    }, '-', {
                        itemId: 'editpack_delete',
                        text: 'Delete',
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
            x:0,y:90,width:600,height:400
        });
        helloWindow.show('windowDiv');
        helloWindow.add(grid);//loadUser());
    };
    //loadItemNew//
    // myglobal.loadItemNew=function(){
    //     var pageSize1=10;
    //     var store = Ext.create('Ext.data.Store', {
    //         pageSize:pageSize1,
    //         autoLoad: true,
    //         autoSync: true,
    //         model: 'Item',
    //         proxy: {
    //             type: 'ajax',
    //             api: {
    //                 read: '/rest/view_item2',
    //                 create: '/rest/create_item2',
    //                 update: '/rest/update_item2',
    //                 destroy: '/rest/destroy_item2'
    //             },
    //             reader: {
    //                 type: 'json',
    //                 successProperty: 'success',
    //                 rootProperty: 'data',
    //                 messageProperty: 'message'
    //             },
    //             writer: {
    //                 type: 'json',
    //                 writeAllFields: false,
    //                 rootProperty: 'data'
    //             },
    //             listeners: {
    //                 exception: function(proxy, response, operation){
    //                     Ext.MessageBox.show({
    //                         title: 'REMOTE EXCEPTION',
    //                         msg: operation.getError(),
    //                         icon: Ext.MessageBox.ERROR,
    //                         buttons: Ext.Msg.OK
    //                     });
    //                 }
    //             }
    //         },
    //     });
    //     var paginTB = {
    //         xtype:'pagingtoolbar',
    //         store:store,
    //         pageSize:pageSize1,
    //         displayInfo:true
    //     };
    //     var main = Ext.create('Ext.container.Container', {
    //         padding: '0 0 0 20',
    //         width: 500,
    //         height: 380,
    //         //renderTo: document.body,
    //         layout: {
    //             type: 'vbox',
    //             align: 'stretch'
    //         },
    //         items: [
    //         // {
    //         //     itemId: 'form',
    //         //     xtype: 'itemform',
    //         //     manageHeight: false,
    //         //     margin: '0 0 10 0',
    //         //     listeners: {
    //         //         create: function(form, data){
    //         //             store.insert(0, data);
    //         //         }
    //         //     }
    //         // }, 
    //         {
    //             itemId: 'grid',
    //             xtype: 'itemgrid',
    //             title: 'Item List',
    //             flex: 1,
    //             store: store,
    //             paginTB:paginTB,
    //             listeners: {
    //                 selectionchange: function(selModel, selected) {
    //                     //main.child('#form').setActiveRecord(selected[0] || null);
    //                 }
    //             }
    //         }]
    //     });
    //     return main;
    // };
    var onUser=function(){//user browse
        console.log("click");
        var helloWindow = new Ext.Window({
            x:0,y:90,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.load_user_edit());//loadUser());
    };
    var onItem=function(){//item browse
         myglobal.selectObject(null,null,Item);
    }; 
    var onContact=function(){//contact browse
        myglobal.selectObject(null,null,Contact);
    }; 
    var onUsePack=function(contact){//
        console.log("click");
        var helloWindow = new Ext.Window({
            x:0,y:90,width:600,height:400,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadUsePack(contact));
    }; 
    var onPackItem=function(pack){//
        console.log("click");
        var helloWindow = new Ext.Window({
            x:0,y:90,width:600,height:400,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadPackItem(pack));
    }; 

    // var selectPackItem=function(pack,store){
    //     console.log("click");
    //     var helloWindow = new Ext.Window({
    //         x:0,y:90,width:600,height:400,modal:true,
    //     });
    //     helloWindow.show('windowDiv');
    //     helloWindow.add(myglobal.loadItem(store,pack,helloWindow));
    // }; 
    var selectPackItem=function(pack,store){
        console.log("click");
        var helloWindow = new Ext.Window({
            x:0,y:90,width:600,height:400,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadItem(store,pack,helloWindow));
    };
    var selectPack=function(contact,store){
        console.log("click");
        var helloWindow = new Ext.Window({
            x:0,y:90,width:600,height:400,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadPackOld(store,contact,helloWindow));
    }; 
    var onPackItemTest=function(){
        var contact={id:9,hetongbh:"test"};
        onPackItem(contact);
    }; 
    var onTest=function(){
        var helloWindow = new Ext.Window({
            x:0,y:90,width:600,height:400,modal:true,
        });
        helloWindow.show('windowDiv');
        helloWindow.add(myglobal.loadContact());
    }; 
    var onPack=function(){
        myglobal.selectObject(null,null,Pack);
    }; 
    var tbar = new Ext.Toolbar({
    items:[
       { text:'用户', iconCls:'question',handler:onUser},
       { text:'部件', iconCls:'question',handler:onItem},
       { text:'合同', iconCls:'question',handler:onContact},
       { text:'包', iconCls:'question',handler:onPack},
       { text:'test', iconCls:'question',handler:onTest},
        ]
    });
    var panel = new Ext.Panel({
        title:'装箱单',
        tbar:tbar,
        renderTo:'windowDiv'
    });
};
Ext.onReady(function(){
    // var movieList = Ext.get('csrf');
    // var a=movieList.dom.childNodes[0];
    // myglobal.token=a.defaultValue;
    var userDiv = Ext.get('user');
    var a=userDiv.dom.childNodes[0];
    var user=a.data;
    var showLogin=function(){
        var helloWindow = new Ext.Window({
            x:0,y:90,modal:true,
        });
        var loginform=new ui.LoginForm({url:"/rest/login/",token:myglobal.token,win:helloWindow,userDiv:userDiv});
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
