var React          = require('react');
var MessageSection = require('./MessageSection.react');
var RoomSection    = require('./RoomSection.react');
var UserSection    = require('./UserSection.react');

class ChatApp  extends React.Component{
  render=()=> {
    return (
         <RoomSection />
    );
  }
}

module.exports = ChatApp;
