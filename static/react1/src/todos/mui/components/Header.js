import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';
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
