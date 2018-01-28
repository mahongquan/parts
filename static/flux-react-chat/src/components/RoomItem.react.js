var React                  = require('react');
var ChatRoomActionCreators = require('../actions/ChatRoomActionCreators');
var s                      = require('underscore.string');
var PropTypes = require('prop-types');
var createLastMessage = function(room) {
  return(<p>hi</p>);
  // if (!_.isUndefined(room.lastMessage)){ 
  //   return (
  //     <p>
  //       {room.lastMessage.author}: {room.lastMessage.text}
  //     </p>
  //   );
  // }
};

class RoomItem  extends React.Component{
  static propTypes= {
    room: PropTypes.object.isRequired
  }
  render() {
    var defaultClass = 'list-group-item';
    //var disabled = this.props.room.isCreated ?  '' : 'disabled';
    //var active = this.props.room.isCurrent ? 'active' : '';
    console.log("room:"+this.props.room);
    var classNames = s.join(' ', defaultClass);
    var lastMessage = createLastMessage(this.props.room);
    return (
      <button  className={classNames} onClick={this._onClick}>
        <h4>{this.props.room.addr}</h4>
        {lastMessage}
      </button>
    );
  }
  _onClick=(event)=>{
    ChatRoomActionCreators.clickRoom(this.props.room);
  }
}

module.exports = RoomItem;
