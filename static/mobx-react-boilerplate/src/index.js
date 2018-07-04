import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Contacts from './AppContacts';
import Toolbar from './AppToolbar'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './autosuggest.css';
import 'react-datetime/css/react-datetime.css';
ReactDOM.render(
    <div>
    <Toolbar />
    <Contacts />
    </div>
    ,document.getElementById('root')
  );