import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button,Overlay,Tooltip,Navbar,Nav,NavItem,NavDropdown,MenuItem,DropdownButton,Table} from "react-bootstrap";
const Example = React.createClass({
  getInitialState() {
    return { show: false };
  },

  toggle() {
    this.setState({ show: !this.state.show });
  },

  render() {
    const sharedProps = {
      show: this.state.show,
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.target)
    };

    return (
      <div style={{ height: 100, paddingLeft: 150, position: 'relative' }}>
        <Button ref="target" onClick={this.toggle}>
          Click me!
        </Button>
        <Overlay show={this.state.show} container={this} target={() => ReactDOM.findDOMNode(this.refs.target)} 
        >
          <label>用户名:</label>
          
        </Overlay>
      </div>
    );
  }
});
export default Example;