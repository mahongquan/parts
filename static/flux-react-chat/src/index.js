import ReactDOM from 'react-dom';
import  ChatApp      from './components/ChatApp.react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import  ChatWebAPIUtils  from './utils/ChatWebAPIUtils';

var React            = require('react');
//var ChatSocketIUtils = require('./utils/ChatSocketUtils');
console.log(ChatWebAPIUtils);

//ChatWebAPIUtils.getRooms();
//ChatWebAPIUtils.getMessages();

ReactDOM.render(
  <ChatApp />, 
  document.getElementById('root')
);
// var email = prompt('Enter you email');
// if (!_.isUndefined(email) && !_.isEmpty(email)) {
//   ChatWebAPIUtils.createUser(email);
// } else {
//   ChatWebAPIUtils.getUser();
// }
