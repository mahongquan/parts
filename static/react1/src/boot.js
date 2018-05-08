window.myremote={
    fs:require('fs'),
    path:require("path"),
    electron:require('electron'),
    //csvStringify:require('csv-stringify')
    // remote:electron.remote,
    // ipcRenderer:electron.ipcRenderer,
    // shell:electron.shell,
    // webFrame:electron.webFrame,
};
require("babel-register");
require("babel-polyfill");
require("./index_local.js");