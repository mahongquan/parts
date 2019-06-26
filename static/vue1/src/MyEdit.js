// var _ = require('lodash');
let template=`<input
      type="text"
      v-bind:value="mydata"
      :style="{ backgroundColor: this.bg }"
      v-on:input="mydata = $event.target.value"
    />`;
Vue.component('MyEdit', {
  template: template,
  props: ['old'],
  name:'my-edit',
  data:function(){
    return {bg:'#ffffff',mydata:""}
  },
  watch: {
    old: function (val) {
      this.mydata=val;
    },
    mydata:function(val){
      if(val===this.old){
        this.bg='#ffffff'
      }
      else{
        this.bg='#8888ff'
      }
    },
  },  
  // methods: {
  //   input_change:function(e){
  //     if (this.old === e.target.value) {
  //       this.bg='#ffffff'
  //     } else {
  //       this.bg='#8888ff'
  //     }
  //     this.data=e.target.value;
  //   },
  // }
})
export default {};