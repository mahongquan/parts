import React from 'react';
import { render } from 'react-dom';
// import DevTools from 'mobx-react-devtools';
import Model from './Model';
import App from './App';
import { autorun } from 'mobx';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
const store = new Model();
export default class AppM extends React.Component {
  render = () => {
    return (
      <div>
        <App store={store} />
      </div>
    );
  };
}
window.store = store;
