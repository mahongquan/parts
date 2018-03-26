import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import CopyPack from './CopyPack';
import Items from './Items';
import Stat from './Stat';
import RouteContactEdit from './RouteContactEdit'
import {  BrowserRouter as Router,Link,Route} from 'react-router-dom'
import Home from './Home';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="todoapp" className="table-responsive">
              <Link to="/">合同</Link>
              <Link style={{paddingLeft:"20px"}} to ="/items">备件</Link>
              <Link style={{paddingLeft:"20px"}} to="/stat">统计</Link>
              <Link style={{paddingLeft:"20px"}} to="/copypack">copy pack</Link>
          </div>
          <Route exact path="/" component={Home}/>
          <Route path="/items" component={Items}/>
          <Route path="/stat" component={Stat}/>
          <Route path="/copypack" component={CopyPack}/>
          <Route path="/edit" component={RouteContactEdit} />
        </div>
            
      </Router>
    );
  }
}
export default App;
