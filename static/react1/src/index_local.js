console.log('index_local');
import React from 'react';
import ReactDOM from 'react-dom';
import myglobal from './myglobal';
import App from './mui/App';
console.log(myglobal);
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
// myglobal.api = 'models';
// if (myglobal.api === 'models') {
//   myglobal.Client = require('./Client_models').default;
// } else if (myglobal.api === 'seq') {
//   myglobal.Client = require('./Client_seq').default;
// } else if (myglobal.api === 'socketio') {
//   myglobal.Client = require('./Client_socketio').default;
// }
// if (myglobal.api === 'axios') {
//   myglobal.Client = require('./Client_axios').default;
// }
// let AppName='./bs4/App';
let AppName='./mui/App';
// if (AppName==='./bs4/App'){
//   let where=getWhere();
//   link(where, 'node_modules/bootstrap/dist/css/bootstrap.css');
//   link('./bs4', 'index.css');
// }
ReactDOM.render(<App />, document.getElementById('root'));
