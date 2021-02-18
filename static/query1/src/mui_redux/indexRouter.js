import React, { Component } from 'react';
import App from './index';
import {HashRouter as Router, Route,Switch,Link} from 'react-router-dom'
class TIndex extends Component{
  render=()=>{
    // console.log(this.props);
    return(<div style={{display:"flex",width:"600px"
          ,justifyContent:"space-between"
          ,alignItems:"center"}}>
                <Link to="/" >App</Link>
                <Link to="/picker" >no test</Link>
              </div>);
  }
}
class Routers extends Component{
  render=()=>{
    // console.log(this.props);
    return(<Switch>
                <Route exact path="/index" component={TIndex} />
                <Route component={App}/>
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

