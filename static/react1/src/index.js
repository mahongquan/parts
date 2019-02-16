import React from 'react';
import ReactDOM from 'react-dom';

import './autosuggest.css';
import 'react-datetime/css/react-datetime.css';
import myglobal from './myglobal';
myglobal.api="fetch";
if (myglobal.api === 'socketio') {
  myglobal.Client = require('./Client_socketio').default;
}
else if(myglobal.api === 'axios') {
  myglobal.Client = require('./Client_axios').default;
}
else{
  myglobal.Client = require('./Client_fetch').default;
}
var App =require('./mui/App').default;
ReactDOM.render(<App />, document.getElementById('root'));

