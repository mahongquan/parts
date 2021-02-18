import React, { Component } from 'react';
import App from './indexCounter';
import App_redux from './mui_redux/index';
import App_redux_new from './mui_redux/index2';
import {HashRouter as Router, Route,Switch,Link} from 'react-router-dom'
class Index extends Component{
  render=()=>{
    // console.log(this.props);
    return(<div style={{display:"flex",width:"600px"
          ,justifyContent:"space-between"
          ,alignItems:"center"}}>
                <Link to="/counter" >counter</Link>
                <Link to="/parts" >mui_redux</Link>
                <Link to="/parts_new" >new mui_redux</Link>
              </div>);
  }
}
class Routers extends Component{
  render=()=>{
    // console.log(this.props);
    return(<Switch>
                <Route exact path="/counter" component={App} />
                <Route exact path="/parts" component={App_redux} />
                <Route exact path="/parts_new" component={App_redux_new} />
                <Route component={Index}/>
              </Switch>);
  }
}
export default class Root extends Component {
  render() {
    return (
        <Router>
            <Routers />
        </Router>
    );
  }
}

