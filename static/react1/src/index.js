import React from 'react';
import ReactDOM from 'react-dom';

import './autosuggest.css';
import 'react-datetime/css/react-datetime.css';
import 'bootstrap/dist/css/bootstrap.css';
import './bs4/index.css';
import myglobal from './myglobal';
myglobal.api = 'fetch';
myglobal.Client = require('./Client_fetch').default;
var App = require('./bs4/App_bootstrap').default;
ReactDOM.render(<App />, document.getElementById('root'));
