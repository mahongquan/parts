import Client from './Client_fetch.js';
// import NullUsePackEdit from "./UsePackEdit.js";
let template=`<div class="container">
     <table  class="table-bordered">
    　<thead>
    　　<tr>
    　　　 <td>ID</td>
         <td>包名称</td>
         <td>操作</td>
    　　</tr>
    　</thead> 
     <tbody id="usepack-list">
                <tr v-for="(usepack,index) in usepacks">
                  <td>{{ usepack.id }}</td>
                  <td>{{ usepack.name }}</td>
                  <td>
                    <button v-on:click="edit_usepack"  v-bind:index="index">编辑</button>
                    <button v-on:click="delete_usepack"  v-bind:index="index">删除</button>
                  </td>
                </tr>
      </tbody>
      </table>
      <div style="padding: 5px 5px 50px 5px;min-height:300px">  <!-- leave margin to show autocomplete items -->
      <p><input id="auto_pack1" placeholder="输入包"></p>
      <vue-instant :suggestOnAllWords="true" :suggestion-attribute="suggestionAttribute" 
        v-model="value" :disabled="false" @input="changed" @click-input="clickInput" 
        @click-button="clickButton" @selected="selected" 
        @enter="enter" @key-up="keyUp" @key-down="keyDown" 
        @key-right="keyRight" @clear="clear" 
        @escape="escape" :show-autocomplete="true" :autofocus="false" 
        :suggestions="suggestions" name="customName" 
        placeholder="custom placeholder" type="google">
      </vue-instant>
      <p>
      <input v-bind:value="new_pack_name" 
        v-on:input="new_pack_name = $event.target.value" 
      placeholder="新包">
      <button class="btn btn-info"  v-on:click="new_pack_click">新包</button></p>
      </div>
  </div>`;
Vue.component('usepacks', {
  template: template,
  props: ['contact'],
  name:'usepacks',
  created: function() {
  },
  watch: {
    contact:function(val){
      this.load_data();
    },
  },  
  mounted:function(){
    this.load_data();
    var self=this;
    // $('#auto_pack1').typeahead({
    //   source:function(query,process){
    //     var param={search:query,limit:15};
    //     Client.get('/rest/Pack/', param, function(items){
    //         process(items.data);
    //     });
    //   },
    //   updater:function(item){
    //     console.log(item);
    //     self.addrow(item.id);
    //   }
    // });
  },
  data:function(){
    return {
      usepacks: [],
      new_pack_name:"",
      usepack: {},
      currentIndex:null,
      value: '',
      suggestionAttribute: 'name',
      suggestions: [],
      selectedEvent: ""
    };
  },
  methods: {
            clickInput: function(e) {
              this.selectedEvent = 'click input'
            },
            clickButton: function() {
                this.selectedEvent = 'click button'
            },
            selected: function(e) {
              console.log("selected")
              console.log(e);
              this.selectedEvent = 'selection changed'
            },
            enter: function(e) {
              this.selectedEvent = 'enter'
            },
            keyUp: function() {
                this.selectedEvent = 'keyup pressed'
            },
            keyDown: function() {
                this.selectedEvent = 'keyDown pressed'
            },
            keyRight: function() {
                this.selectedEvent = 'keyRight pressed'
            },
            clear: function() {
                this.selectedEvent = 'clear input'
            },
            escape: function() {
                this.selectedEvent = 'escape'
            },
            changed: function(){
              console.log("changed");
              this.suggestions = []
              var self=this;
              var param={search:this.value,limit:15};
              Client.get('/rest/Pack/', param, (response)=>{
                          console.log(response.data);
                          for(var i=0;i<20;i++){
                            if(response.data[i]){
                                  self.suggestions.push(response.data[i]);
                            }
                            else{
                              break;
                            }
                          }
                          console.log(self.suggestions);
              });
            },    
    addrow:function(pack_id){
      var url = '/rest/UsePack/';
      var data = { contact: this.contact.id, pack: pack_id };
      var self=this;
      Client.postOrPut(url, data, function(res){
        var p = res.data;
        self.usepacks = self.usepacks.concat(p);
      },(error)=>{
        console.log(error);
      });
    },
    new_pack_click:function(){
      console.log("new_pack_click")
      console.log(this.new_pack_name);
      var url = '/rest/UsePackEx/';
      var data = { name: this.new_pack_name, contact: this.contact.id };
      Client.postOrPut(url, data, res => {
        var p = res.data;
        this.usepacks= this.usepacks.concat(p);
      },(error)=>{
        console.log(error);
      });
    },
    edit_usepack:function(e) {
      let v=parseInt(e.target.attributes.index.value);
      if (isNaN(v)){
        this.currentIndex=null;  
        this.contact={};
      }
      else{
        this.currentIndex=v;   
        this.usepack=this.usepacks[this.currentIndex]
      }
      this.$refs.dlgEdit.open();
    },
    delete_usepack:function(e){
      let itemIndex=parseInt(e.target.attributes.index.value);
      var url = '/rest/UsePack/';
      var self=this;
      Client.delete1(url, { id: this.usepacks[itemIndex].id }, function(res){
        self.usepacks.splice(itemIndex,1);
      },(error)=>{
        console.log(error);
      });
    },
    load_data: function() {
      Client.UsePacks(
        this.contact.id,
        res => {
          console.log(res);
          this.usepacks=res.data;
        },
        function() {}
      );
  },  
}
})
export default {};