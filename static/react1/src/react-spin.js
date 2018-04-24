//'use strict';
import React from 'react';
import {Spinner} from './spin.js';
//var PropTypes = require('prop-types');
// exports.__esModule = true;

// var _react = require('react');

// var _react2 = _interopRequireDefault(_react);

// var _spin = require('spin.js');

// var _spin2 = _interopRequireDefault(_spin);

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

export default class ReactSpinner extends React.Component{
  // displayName='ReactSpinner';

  // propTypes= {
  //   config:PropTypes.object,
  //   stopped: PropTypes.bool
  // }

  componentDidMount=()=> {
    this.spinner = new Spinner(this.props.config);
    if (!this.props.stopped) {
      this.spinner.spin(this.refs.container);
    }
  }

  componentWillReceiveProps=(newProps)=> {
    if (newProps.stopped === true && !this.props.stopped) {
      this.spinner.stop();
    } else if (!newProps.stopped && this.props.stopped === true) {
      this.spinner.spin(this.refs.container);
    }
  }

  componentWillUnmount=()=> {
    this.spinner.stop();
  }

  render=()=> {
    return (<span ref="container"></span>);
  }
}

