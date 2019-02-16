import React from 'react';
import ReactDOM from 'react-dom';
import models from './data/models';
import App from './mui/App';
import myglobal from './myglobal';
const path = require('path');
function link(where, module_name) {
  // body...
  var thelink = document.createElement('link');
  thelink.setAttribute('rel', 'stylesheet');
  var file1 = path.join(where, module_name);
  thelink.setAttribute('href', file1);
  document.head.appendChild(thelink);
}
function getWhere() {
  return window.require('electron').ipcRenderer.sendSync('getpath');
}
// let where = getWhere();
link('./', 'autosuggest.css');
link('./', 'react-datetime.css');
if (myglobal.api === 'models') {
  let models = require('./data/models').default;
  // console.log(models);
  
  models.sequelize.sync().then(() => {
    ReactDOM.render(<App models={models} />, document.getElementById('root'));
  });
} else if (myglobal.api === 'seq') {
  ReactDOM.render(<App />, document.getElementById('root'));
} else if (myglobal.api === 'socketio') {
  ReactDOM.render(<App />, document.getElementById('root'));
}
