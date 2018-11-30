import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import CopyPack from './CopyPack';
import Items from './Items';
import Stat from './Stat';
import RouteContactEdit from './RouteContactEdit';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './Home';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="todoapp" className="table-responsive">
            <Link to="/app">合同</Link>
            <Link style={{ paddingLeft: '20px' }} to="/app/items">
              备件
            </Link>
            <Link style={{ paddingLeft: '20px' }} to="/app/stat">
              统计
            </Link>
            <Link style={{ paddingLeft: '20px' }} to="/app/copypack">
              copy pack
            </Link>
          </div>
          <Route exact path="/app" component={Home} />
          <Route path="/app/items" component={Items} />
          <Route path="/app/stat" component={Stat} />
          <Route path="/app/copypack" component={CopyPack} />
          <Route path="/app/edit" component={RouteContactEdit} />
        </div>
      </Router>
    );
  }
}
export default App;
