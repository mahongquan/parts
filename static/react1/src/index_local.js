console.log("index_local");
import React from 'react';
import ReactDOM from 'react-dom';
const fs = window.require('fs');
const path = window.require('path');
function fileExist(p) {
  if (fs.existsSync(p)) {
    return true;
  }
  return false;
}
function link(where, module_name) {
  // body...
  var thelink = document.createElement('link');
  thelink.setAttribute('rel', 'stylesheet');
  var file1 = path.join(where, module_name);
  thelink.setAttribute('href', file1);
  document.head.appendChild(thelink);
}
let where = window.require('electron').ipcRenderer.sendSync('getpath');
// let module_name = './App_bootstrap';
// link(where, 'node_modules/bootstrap/dist/css/bootstrap.min.css');
link('./', 'autosuggest.css');
link(where, 'node_modules/react-datetime/css/react-datetime.css');
let module_name = './mui/App';
let App = require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));
