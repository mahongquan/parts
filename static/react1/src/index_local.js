import React from 'react';
import ReactDOM from 'react-dom';
import models from './data/models';
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
myglobal.api="models";
if (myglobal.api === 'models') {
  myglobal.Client = require('./Client_models').default;
} else if (myglobal.api === 'seq') {
  myglobal.Client = require('./Client_seq').default;
} else
if (myglobal.api === 'socketio') {
  myglobal.Client = require('./Client_socketio').default;
}
if (myglobal.api === 'axios') {
  myglobal.Client = require('./Client_axios').default;
}
var App =require('./mui/App').default;
if (myglobal.api === 'models') {
  let models = require('./data/models').default;
  
  models.sequelize.sync().then(() => {
    ReactDOM.render(<App models={models} />, document.getElementById('root'));
  });
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
} 