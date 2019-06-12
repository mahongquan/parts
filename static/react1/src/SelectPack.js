import React, { Component } from 'react';
import SelectPack from './mui/SelectPack'
export default class C extends Component{
   constructor(){
    super();
    this.state={inputValue:""}
  }
  onClick=()=>{
    this.setState({inputValue:"必备"});
  }
  render() {
    return (
      <div>
        <SelectPack   init_input={this.state.inputValue}  />
        <button onClick={this.onClick}>必备</button>
      </div>
    );
  }
}