import React from 'react';
import ReactDOM from 'react-dom';
const fs = require('fs');
const path = require('path');
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
function getWhere() {
  let path = window.require('electron').ipcRenderer.sendSync('getpath');
  console.log(path);
  let where;
  where = '..';
  return where;
}
let module_name;
let where = getWhere();
let App;
module_name = './App_bootstrap';
link(where, 'node_modules/bootstrap/dist/css/bootstrap.min.css');
link('./', 'autosuggest.css');
link(where, 'node_modules/react-datetime/css/react-datetime.css');
  // link("./",'react-spinkit/css/base.css');
  // link("./",'react-spinkit/css/loaders-css.css');
  // link("./",'react-spinkit/css/fade-in.css');
  // link("./",'react-spinkit/css/chasing-dots.css');
  // link("./",'react-spinkit/css/circle.css');
  // link("./",'react-spinkit/css/cube-grid.css');
  // link("./",'react-spinkit/css/double-bounce.css');
  // link("./",'react-spinkit/css/folding-cube.css');
  // link("./",'react-spinkit/css/pulse.css');
  // link("./",'react-spinkit/css/rotating-plane.css');
  // link("./",'react-spinkit/css/three-bounce.css');
  // link("./",'react-spinkit/css/wandering-cubes.css');
  // link("./",'react-spinkit/css/wave.css');
  // link("./",'react-spinkit/css/wordpress.css');
App = require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));
