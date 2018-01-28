var React                  = require('react');
var _                      = require('underscore');
var RoomStore              = require('../stores/RoomStore');
var ChatRoomActionCreators = require('../actions/ChatRoomActionCreators');
//var RoomItem               = require('./RoomItem.react');

var getStateFromStores = function() {
  return {
    rooms: RoomStore.getAll()
  };
};

var getRoomItem = function(room,idx) {
  //console.log(room);
  return (
    <tr key={idx}>
      <td>{room.id}</td><td>{room.name}</td>
    </tr>
  );
};

class RoomSection extends React.Component{
  state=getStateFromStores()
  
  componentDidMount=()=>{
    RoomStore.addChangeListener(this._onChange);
  }

  componentWillUnmount=()=> {
    RoomStore.removeChangeListener(this._onChange);
  }
  render=()=>{
    var buttonStyles = {
      marginTop: '-28px',
    };
    var roomListItems;
    if (this.state !== null) {
      roomListItems = this.state.rooms.map(getRoomItem);
    }
    return (
      <table className="table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>合同编号</th>
          </tr>
        </thead>
        <tbody>
            {roomListItems}
        </tbody>
      </table>
    );
  }

  _onClickPlus=(event)=> {
    var name = prompt('Name of the room');
    if (!_.isUndefined(name) && !_.isEmpty(name)) {
      ChatRoomActionCreators.creatingRoom(name);
    }
  }

  _onChange=()=> {
    this.setState(getStateFromStores());
  }
}

module.exports = RoomSection;
