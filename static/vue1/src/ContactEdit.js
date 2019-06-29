import NullMyEdit from "./MyEdit.js"
import NullUsePacks from "./UsePacks.js"
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

let template=`<div>
           <b-modal size="lg" ref="my-modal" hide-footer title="编辑仪器信息">
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
                      <input
                        v-bind:value="contact.yonghu"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>客户地址:</td>
                    <td>
                     <input
                        v-bind:value="contact.addr"
                      />
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
                      <input
                        type="text"
                        v-bind:value="contact.yiqibh"
                        v-on:input="contact.yiqibh = $event.target.value"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>包箱:</label></td>
                    <td>
                      <input
                        type="text"
                        v-bind:value="contact.baoxiang"
                        v-on:input="contact.baoxiang = $event.target.value"
                      />
                    </td>
                    <td>审核:</td>
                    <td>
                      <input
                        type="text"
                        v-bind:value="contact.shenhe"
                        v-on:input="contact.shenhe = $event.target.value"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>预计发货时间:</label></td>
                    <td>
                      <input id="id_yujifahuo_date" v-bind:value="yujifahuo_date"></input>
                    </td>
                    <td>调试时间:</td>
                    <td>
                      <input
                        type="text"
                        v-bind:value="contact.tiaoshi_date"
                        v-on:input="contact.tiaoshi_date = $event.target.value"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label>合同编号:</label></td>
                    <td>
                      <input
                        type="text"
                        v-bind:value="contact.hetongbh"
                        v-on:input="contact.hetongbh = $event.target.value"
                      />
                    </td>
                    <td>方法:</td>
                    <td>
                      <input
                        type="text"
                        v-bind:value="contact.method"
                      />
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
            </b-modal>
          </div>
`;
Vue.component('ContactEdit', {
  template: template,
  props: ['contact',"index"],
  name:'contact-edit',
  data:function(){
    return {yujifahuo_date:moment().format('YYYY-MM-DD')}
  },
  mounted:function(){
    // $("#id_yujifahuo_date").datetimepicker({//选择年月日       
    //   format: 'yyyy-mm-dd',       
    // });

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
      this.$refs['my-modal'].show();
      // $('#dlg_contact_edit').modal();
    }
  }
})
export default {}