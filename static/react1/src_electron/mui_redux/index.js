import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Note: this API requires redux@>=3.1.0
export default class Index extends React.Component {
  constructor() {
    super();
    this.store = createStore(reducer, applyMiddleware(thunk));
  }
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}
