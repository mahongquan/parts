import React, { Component } from 'react';
import App from './bs4/App';
import App_mui from './mui/App';
import Todos from './todos/index';
import Todos_mui from './todos_mui/index';
import {Router, Route,Switch,Link} from 'react-router-dom'
import createHashHistory from "history/createHashHistory";
// import createBrowserHistory from "history"
const history = createHashHistory({
  hashType: "slash" // the default
})
class Index extends Component{
  render=()=>{
    console.log(this.props);
    return(<div style={{display:"flex",width:"600px"
          ,justifyContent:"space-between"
          ,alignItems:"center"}}>
                <Link to="/contacts" >bs4 App</Link>
                <Link to="/todos" >bs4 Todos</Link>
                <Link to="/mui_todos" >mui Todos</Link>
                <Link to="/mui_app" >mui App</Link>
              </div>);
  }
}
class Routers extends Component{
  render=()=>{
    return(<Switch>
                <Route exact path="/contacts" component={App} />
                <Route exact path="/todos" component={Todos} />
                <Route exact path="/mui_todos" component={Todos_mui} />
                <Route exact path="/mui_app" component={App_mui} />
                <Route exact path="/index" component={Index} />
                <Route component={App}/>
              </Switch>);
  }
}
export default class Root extends Component {
  render() {
    return (
        <Router history={history}>
            <Routers />
        </Router>
    );
  }
}

