import Client from './cs/src/Client';
import { observable,useStrict,action,autorun } from "mobx";//, action, computed
const immutable= require('immutable')
useStrict(false);
class ContactStore {
    @observable contacts = immutable.List();
    @observable start=0;
    @observable total=0;
    @observable showModal=false;
    @observable contact=immutable.Map();
    @observable bg=immutable.Map();
    @observable index=null;
    @observable search="";
    @observable start_input=1;
    @observable baoxiang="";
    //edit 
    //@observable rich=RichTextEditor.createEmptyValue();
    @observable editRich=false;
    limit=5;
    old={};
    constructor(){
      autorun(() => console.log(this.report));
      Client.socket.init(()=>{
          this.loaddata();
      })
    }
    report=()=>{
        console.log("report=============");
        console.log(this.contact);
    }
    @action loaddata=()=>{
      var data={search:this.search
        ,start:this.start
        ,baoxiang:this.baoxiang
        ,limit:this.limit};
            Client.contacts(
              data
              ,(res)=>{
                this.contacts=immutable.List(res.data);
                this.total=res.total;
                this.start=data.start;
              }
            );
    }
    @action handleItemSave=(data)=>{
      var url="/rest/Contact";
      Client.postOrPut(url,this.packitem,(res) => {
          this.packitem=immutable.Map(res.data);
          this.old=res.data;
          this.showModal=false;
      });
    }
  @action handleChange=(e)=>{
    if(this.old[e.target.name]===e.target.value)
    {
      const bg2=this.bg.set(e.target.name,"#ffffff");
      this.bg=bg2;
    }
    else{
      this.bg=this.bg.set(e.target.name,"#8888ff");
    }
    var r=this.contact[e.target.name]=e.target.value;

  }
   @action  handleItemChange=(e)=>{
      if(this.old[e.target.name]===e.target.value)
      {
        this.bg[e.target.name]="#ffffff"
      }
      else{
        this.bg[e.target.name]="#8888ff"
      }
      this.packitem[e.target.name]=e.target.value;
    }
}
var store=new ContactStore();
console.log(store.contacts);
