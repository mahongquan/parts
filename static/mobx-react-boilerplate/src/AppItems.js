import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ItemStore,Items,ItemEdit} from "./Items";

export default class App extends Component{
  constructor(){
    super();
    this.store=new ItemStore();
  }
  render=()=>{
    return(<div>
      <Items store={this.store} />
      <ItemEdit store={this.store} />
    </div>);
  }
}
