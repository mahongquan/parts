import ReactDOM from 'react-dom';
var React            = require('react');
var ChatApp          = require('./components/ChatApp.react');
var ChatWebAPIUtils  = require('./utils/ChatWebAPIUtils');
//var ChatSocketIUtils = require('./utils/ChatSocketUtils');
var _                = require('underscore');

ChatWebAPIUtils.getRooms();
ChatWebAPIUtils.getMessages();

ReactDOM.render(
  <ChatApp />, 
  document.getElementById('root')
);
var email = prompt('Enter you email');
if (!_.isUndefined(email) && !_.isEmpty(email)) {
  ChatWebAPIUtils.createUser(email);
} else {
  ChatWebAPIUtils.getUser();
}
