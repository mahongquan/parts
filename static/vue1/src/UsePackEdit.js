var availableTags = [
      'CS-1011C',
      'CS-2800',
      'CS-3000',
      'CS-3000G',
      'HD-5',
      'N-3000',
      'O-3000',
      'OH-3000',
      'ON-3000',
      'ON-4000',
      'ONH-3000',
    ];
availableTags=JSON.stringify(availableTags);
var availableTags_2 = [
      '1O(低氧)',
      '1O(高氧)',
      '1O(低氧)+2N',
      '1C(低碳)+2S',
      '1C(高碳)+2S',
      '2C+1S(低硫)',
      '2C+1S(高硫)',
      '2C+2S',
      '2O+2N',
      '2O',
    ];
availableTags_2=JSON.stringify(availableTags_2);

let template=`<div
            class="modal fade"
            id="dlg_contact_edit"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="false"
          >
            <div class="modal-dialog modal-lg">
            
              <div class="modal-content">
            <div class="modal-header">
              <div class="modal-titile">
                编辑仪器信息
              </div>
            </div>              
                <table id="table_input" class="table-condensed">
                  <tr>
                    <td>ID:</td>
                    <td>
                      <input
                        type="text"
                        v-bind:value="contact.id"
                        id="id"
                        name="id"
                        readonly="true"
                      />
                    </td>
                    <td><label>用户单位:</label></td>
                    <td>
                      <my-edit v-bind:old="contact.yonghu"></my-edit>
                    </td>
                  </tr>
                  <tr>
                    <td>客户地址:</td>
                    <td>
                      <my-edit v-bind:old="contact.addr"></my-edit>
                    </td>
                    <td>通道配置:</td>
                    <td>
                      <input
                        v-bind:value="contact.channels"
                        data-provide="typeahead"
                        data-source='${availableTags_2}'
                        name="channels"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>仪器型号:</label></td>
                    <td>
                      <input
                        v-bind:value="contact.yiqixinghao"
                        data-provide="typeahead"
                        data-source='${availableTags}'
                        name="yiqixinghao"
                      />
                    </td>
                    <td><label>仪器编号:</label></td>
                    <td>
                      <my-edit v-bind:old="contact.yiqibh"></my-edit >
                    </td>
                  </tr>
                  <tr>
                    <td><label>包箱:</label></td>
                    <td>
                      <my-edit v-bind:old="contact.baoxiang"></my-edit >
                    </td>
                    <td>审核:</td>
                    <td>
                      <my-edit v-bind:old="contact.shenhe"></my-edit >
                    </td>
                  </tr>
                  <tr>
                    <td><label>预计发货时间:</label></td>
                    <td>
                      <my-edit v-bind:old="contact.yujifahuo_date"></my-edit >
                    </td>
                    <td>调试时间:</td>
                    <td>
                      <my-edit v-bind:old="contact.tiaoshi_date"></my-edit >
                    </td>
                  </tr>
                  <tr>
                    <td><label>合同编号:</label></td>
                    <td>
                      <my-edit v-bind:old="contact.hetongbh"></my-edit >
                    </td>
                    <td>方法:</td>
                    <td>
                      <my-edit v-bind:old="contact.method"></my-edit >
                      <button class="btn" id="bt_file">选取文件</button>
                    </td>
                  </tr>
                </table>

                <div align="center">
                  <button v-on:click="save" class="btn btn-primary" id="bt_save">保存</button>
                  <button v-on:click="clear"  class="btn" id="bt_clear">清除</button>
                  <button v-on:click="copy"  class="btn" id="bt_clearid">复制</button>
                </div>
                <div  v-if="index!==null" id="id_usepacks">
                  <usepacks v-bind:contact="contact" />
                </div>
              </div>
            </div>
          </div>
`;
Vue.component('UsePackEdit', {
  template: template,
  props: ['contact',"index"],
  name:'usepack-edit',
  data:function(){
    return {}
  },
  methods: {
    copy:function(){
      console.log("copy")
    },
    clear:function(){
      console.log(this);
      this.contact.yiqibh="";
      this.contact.hetongbh="";
      this.contact.yonghu="";
      this.contact.yiqixinghao=""
    },
    save:function(){

    },
    open: function() {
      // $('#dlg_contact_edit').modal();
    }
  }
})
export default {}