import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TableExampleSimple from './TableExampleSimple';
import ToolbarExamplesSimple from './ToolbarExamplesSimple';
injectTapEventPlugin();
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
//import { Navbar, Jumbotron, Button } from 'react-bootstrap';
var csrf_token = '';
var user = '';
class App extends Component {
  state = {
    user: null,
  };
  handleUserChange = user => {
    this.setState({ user: user });
  };
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <ToolbarExamplesSimple handleUserChange={this.handleUserChange} />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <TableExampleSimple />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
