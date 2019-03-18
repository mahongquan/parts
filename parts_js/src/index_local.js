import React from 'react';
import ReactDOM from 'react-dom';
const fs= require('fs');
const path=require('path');
function fileExist(p){
    if(fs.existsSync(p)){
      return true;
    }
    return false;
}
function link(where,module_name) {
  // body...
  var thelink=document.createElement('link');
  thelink.setAttribute("rel","stylesheet");
  var file1=path.join(where,module_name)
  thelink.setAttribute("href",file1);
  document.head.appendChild(thelink);
}
function getWhere(){
  let path=window.require('electron').ipcRenderer.sendSync('getpath');
  let where;
  if(path==="."){
     where=".."; 
  }
  else{
    where="../.."
  }
  return where;
}
let module_name;
let where=getWhere();
let App;
module_name="./App_mui";
App=require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));

