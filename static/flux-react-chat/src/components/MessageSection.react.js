var React        = require('react');
var MessageStore = require('../stores/MessageStore');
var RoomStore    = require('../stores/RoomStore');
var UserStore    = require('../stores/UserStore');
var MessageInput = require('./MessageInput.react');
var MessageItem  = require('./MessageItem.react');
var _            = require('underscore');


var getStateFromStores = function() {
  return {
    messages: MessageStore.getAllForCurrentRoom(),
    room:     RoomStore.getCurrentRoom(),
    user:     UserStore.getCurrentUser()
  };
};

var getMessageItem = function(message) {
  return (
    <MessageItem
      key={message._id}
      message={message}
      currentUser={this.state.user}
    />
  );
};

class MessageSection extends React.Component{

  
  state=getStateFromStores();

  componentDidMount=()=>{
    this._scrollChatToBottom();
    MessageStore.addChangeListener(this._onChange);
    RoomStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount=()=>{
    MessageStore.removeChangeListener(this._onChange);
    RoomStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  }

  componentDidUpdate=()=>{
    this._scrollChatToBottom();
  }

  render=()=> {
    var roomName, messagesListItems;
    if (!_.isUndefined(this.state.room)) {
      messagesListItems = _.isEmpty(this.state.messages) ? 'No Messages' : _.map(this.state.messages, getMessageItem, this);
      roomName = this.state.room.name;
    }
    var panelBodyStyle = {
      overflow: 'auto',
      maxHeight: '500px'
    };
    return (
      <div className='panel panel-default'>
        <div className='panel-heading text-center'>
          {roomName}
        </div>
        <div className='panel-body' style={panelBodyStyle} ref='panelBody'>
          {messagesListItems}
        </div>
        <div className='panel-footer'>
          <MessageInput 
            room={this.state.room}
          />
        </div>
      </div>
    );
  }

  _onChange=(event)=>{
    this.setState(getStateFromStores());
  }

  _scrollChatToBottom() {
    //var ul = this.refs.panelBody.getDOMNode();
    //ul.scrollTop = ul.scrollHeight;
  }

}

module.exports = MessageSection;
