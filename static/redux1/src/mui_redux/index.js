import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers';
import { createStore, applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Note: this API requires redux@>=3.1.0
export default class Index extends React.Component {
  constructor() {
    super();
    this.store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    // console.log(this.store);
    window.store=this.store;
  }
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}
