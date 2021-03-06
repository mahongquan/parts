import React, { Component } from 'react';
import App from './bs4/App';
// import App_mui from './mui/App';
// import Todos from './todos/index';
import Todos_mui from './todos/index_mui';
// import App_redux from './mui_redux/index';
import App_use from './redux_use/index2';
// import Picker from './Mpicker.js'
import {HashRouter as Router, Route,Switch,Link} from 'react-router-dom'
// import createHashHistory from "history/createHashHistory";
// let createHashHistory= require("history").createHashHistory;
// // import createBrowserHistory from "history"
// const history = createHashHistory({
//   hashType: "slash" // the default
// })
class Index extends Component{
  render=()=>{
    // console.log(this.props);
    return(<div style={{display:"flex",width:"600px"
          ,justifyContent:"space-between"
          ,alignItems:"center"}}>
                <Link to="/contacts" >bs4 App</Link>
                <Link to="/mui_todos" >mui Todos</Link>
                <Link to="/app_use" >App use</Link>
              </div>);
  }
}
class Routers extends Component{
  render=()=>{
    // console.log(this.props);
    return(<Switch>
                <Route exact path="/app_use" component={App_use} />
                <Route exact path="/contacts" component={App} />
                <Route exact path="/mui_todos" component={Todos_mui} />
                <Route exact path="/index" component={Index} />
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

