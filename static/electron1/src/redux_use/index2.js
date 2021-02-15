import React from 'react';
import ReactDOM from 'react-dom';
import store from './reducers/store';
import { Provider } from 'react-redux';
import App from './App2';
export default class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Provider store={store}>
        <App store={store} />
      </Provider>
    );
  }
}
