import App from './mui/containers/App';
import React from 'react';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

class App2 extends React.Component {
  constructor() {
    super();
    this.store = createStore(
      reducer,
      applyMiddleware(thunk)
    );
  }
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}
export default App2;
