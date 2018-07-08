import React from 'react'
// import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App  from './containers/App'
import reducer from './reducers'
// import './index.css'

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