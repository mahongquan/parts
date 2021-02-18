import React from 'react';
import store from './reducers/store';
import { Provider } from 'react-redux';
import App from './App2';
export default class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App store={store} />
      </Provider>
    );
  }
}
