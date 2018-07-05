import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import Contacts from './AppContacts';
import Contacts from './todos2/index3.js';
// import Toolbar from './AppToolbar'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './autosuggest.css';
import 'react-datetime/css/react-datetime.css';
ReactDOM.render(
    <div>
    <Contacts />
    </div>
    ,document.getElementById('root')
  );