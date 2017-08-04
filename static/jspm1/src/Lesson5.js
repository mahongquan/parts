import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './lesson5/App'
import About from './lesson5/About'
import Repos from './lesson5/Repos'
export default React.createClass({
	render(){
		return (
		  <Router >
		    <Route path="/" component={App}>
		      <Route path="/repos" component={Repos}/>
		      <Route path="/about" component={About}/>
		    </Route>
		  </Router>
		)
	}
})
