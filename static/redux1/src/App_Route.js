import React from 'react'
import ReactDOM from 'react-dom';
import { Router,Route} from 'react-router'
import App1 from './modules/App1'
import About from './modules/About'
import Repos from './modules/Repos'
class App extends React.Component {
    render(){
	   	return( 
	   	  <Router>
		    <Route path="/" component={App1}/>
		    <Route path="/repos" component={Repos}/>
		    <Route path="/about" component={About}/>
		  </Router>
		);
	}
}
export default App;