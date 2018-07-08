import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Contacts,{ItemStore} from "./Contacts";

export default class App extends Component{
  constructor(){
    super();
    this.store=new ItemStore();
  }
  render=()=>{
    return(<div>
      <Contacts store={this.store} />
    </div>);
  }
}
