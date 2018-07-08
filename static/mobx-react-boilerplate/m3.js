import { observable,action,autorun , reaction} from "mobx";//, action, computed
class TodoModel {
	store;
	id;
	@observable title;
	@observable completed;

	constructor(store, id, title, completed) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
		autorun(() => {
        console.log("autorun========");
        console.log(this);
      });
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.completed);
	}
}
class ItemStore {
    url=null;
    data=null;
    yiqibh=null;
    @observable showDlgCheck =false;    
    @observable showDlgWait =false;
    @observable showDlgFolder =false;    
    @observable showDlgUrl =false;
    @observable showDlgLogin=false;
    @observable showDlgImport=false;
    @observable showDlgEdit=false;
    @observable showDlgDetail=false;
    @observable contactid=null;
    @observable currentIndex=null;
    @observable todos = [];
    @observable start=0;
    @observable total=0;
    @observable showModal=false;
    @observable packitem={};
    @observable bg={};
    @observable search="";
    @observable user="AnonymousUser";
    @observable baoxiang="";
    @observable start_input=1;
    @observable showDlgDetail=false;
    limit=10;
    constructor(){
      console.log("constructor");
      autorun(() => {
        console.log("autorun========");
        console.log(this);
      });
    }
    @action 
    setdata(res){
      console.log("setdata");

          this.todos=res.data;
          this.total=res.total;
          this.user=res.user;
          if(this.user===undefined){
            this.user="AnonymousUser";
          }
    }
    loaddata=()=>{
      var data={
        search:this.search
        ,start:this.start
        ,limit:this.limit
        ,baoxiang:this.baoxiang};
      Client.contacts(
        data
        ,(res)=>{
          this.setdata(res);
        }
      );
    }
}
// let store=new ItemStore();
// store.showDlgLogin=true;
let store=new TodoModel();
store.title="aaaa";
