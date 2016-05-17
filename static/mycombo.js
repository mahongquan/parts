Ext.define('MyGroup.combo', {
           extend: 'Ext.form.ComboBox',
           alias: 'widget.mycombo',
    initComponent: function() {
        this.callParent([arguments]);
    }
});

var keywordStore = Ext.create('Ext.data.SimpleStore',{
    fields: ['id', 'name'],
    data: [[1, 'mr'],[2, 'mr(yes)'],[3, 'mr(no)'], [4, 'example'], [5, 'example(yes)'],[6,'example(no)'],[7,'sample'],[8,'sample(yes)'],[9,'sample(no)'],[10,'mrs'],[11,'mrs(yes)'],[12,'mrs(no)']]
});

Ext.widget('mycombo',{
    xtype : 'combo',
        emptyText:'select keyword',
        store: keywordStore,
        valueField:'name',
           displayField:'name',
           mode: 'remote',
           autoSelect: false,
           selectOnFocus:true,
           //shadow:true,
           //forceSelection: false,
           //triggerAction: 'all',
           hideTrigger:true,
           //multiSelect:true,
           typeAhead:true,
        minChars:1,
    renderTo :document.body
       });