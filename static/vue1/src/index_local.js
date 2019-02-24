import Client from './Client_models';
var app = new Vue({
  el: '#app',
  created: function(){
    this.load_data();
  },
  methods: {
    load_data:function(){
      Client.contacts({
          limit:this.limit,start:this.start
          ,baoxiang:this.baoxiang
          ,search:this.search
        }
        ,(res)=>{
        this.contacts=res.data;
        this.total=res.total;
        console.log(this.contacts);
      },function(){

      });
    },
    prev:function(){
      this.start = this.start - this.limit;
      if (this.start < 0) {
        this.start = 0;
      }
      this.load_data();

    },
    next:function(){
      this.start = this.start + this.limit;
      if (this.start > this.total - this.limit)
        this.start = this.total - this.limit; //total >limit
      this.load_data();
    },
    go_search:function(){
      this.load_data();
    },
    baoxiang_change:function(e){
      this.baoxiang=e.target.text;
      this.load_data();
    },
  },
  data: {
    contacts:[{yonghu:"aaaaa"}],
    baoxiang:"",
    search:"",
    total:0,
    start:1,
    limit:3,
  }
});

