import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    return (
      <TodoTextInput
        newTodo
        onSave={this.handleSave}
        placeholder="要做哪件事?"
      />
    );
  }
}
export default Header;
