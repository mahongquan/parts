import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App  from './containers/App'
import reducer from './reducers'
import './index.css'

const store = createStore(reducer)
class App2 extends React.Component{
    render(){
	return(
	  <Provider store={store}>
	    <App />
	  </Provider>)}
}
export default App2