import Client from './src/Client2';
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
      this.loaddata();
    }
    report=()=>{
        console.log("report=============");
        console.log(this.contact);
    }
    login=()=>{
      var url="/rest/login";
      Client.post(url,{username:"mahongquan",password:"333333"},(res) => {
          console.log(res);
      },(err)=>{
        console.log(err);
      });
    }
    loaddata=()=>{
      console.log("loaddata");
      var data={search:this.search
        ,start:this.start
        ,baoxiang:this.baoxiang
        ,limit:this.limit};
      Client.contacts(
      data, 
      (contacts) => {
        console.log("success");
        var user=contacts.user;
        if(user===undefined){
          user="AnonymousUser"
        }
        this.total=contacts.total;//because async ,mystate set must before state;
        this.contacts=contacts.data;//.slice(0, MATCHING_ITEM_LIMIT),
      },(error)=>{
          console.log("error loaddata");
          console.log(error);
          if(error instanceof SyntaxError){
            console.log("login")
            this.login();
          }
          if(error.type==="invalid-json"){
            console.log("login")
            this.login();
          }
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
