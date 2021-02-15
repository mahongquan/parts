import React, { Component } from 'react';
import App_redux2 from './redux_use/index2';
import App_redux from './mui_redux/index';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
function Mini(){
  const [state,setState]=React.useState("http://127.0.0.1:8000");
  return (
  <div>
    <input id="input_1" 
    onKeyDown={(event)=>{
      if(event.keyCode===13){
        window.location=state;
      }
    }} 
    onChange={(e)=>{
      setState(e.target.value);
    }}
    value={state}>
    </input>
    <button onClick={()=>{
      window.location=state;
    }}>go</button></div>);
}
class Index extends Component {
  render = () => {
    // console.log(this.props);
    return (
      <div
        style={{
          display: 'flex',
          width: '600px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/mui_redux">mui_redux</Link>
        <Link to="/redux_use">redux_use</Link>
      </div>
    );
  };
}
class Routers extends Component {
  render = () => {
    // console.log(this.props);
    return (
      <Switch>
        <Route exact path="/mui_redux" component={App_redux} />
        <Route exact path="/redux_use" component={App_redux2} />
        <Route exact path="/index" component={Index} />
        <Route component={Index} />
      </Switch>
    );
  };
}
export default class Root extends Component {
  render() {
    return (
      <div>
      <a href="file:///home/mhq/web/index.html">home</a>
      <Mini />
      <Router>
        <Routers />
      </Router>
      </div>
    );
  }
}
