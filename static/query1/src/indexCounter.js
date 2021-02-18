import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

export default class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

