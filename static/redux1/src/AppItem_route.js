import React, { Component } from 'react';
import {  BrowserRouter as Router,Route} from 'react-router-dom'
import Items from './RouteItems';
import ItemEdit from './RouteItemEdit';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Items}/>
          <Route path="/edit/:idx" component={ItemEdit} />
        </div>
            
      </Router>
    );
  }
}
export default App;
