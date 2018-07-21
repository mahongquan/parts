import React, { Component } from 'react';
import App from './App_bootstrap_redux';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

class App2 extends React.Component{
  constructor(){
    super();
    this.store = createStore(reducer)
  }
    render(){
  return(
    <Provider store={this.store}>
      <App />
    </Provider>)}
}
export default App2