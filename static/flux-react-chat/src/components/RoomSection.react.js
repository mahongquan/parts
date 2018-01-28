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
            <div>
              <ItemEdit ref="dlg" parent={this} />
              <input type="text" value={this.state.search}  placeholder="" onChange={this.handleSearchChange} />
              <button id="id_bt_search" className="btm btn-info" onClick={this.search}>搜索</button>
               <Table responsive bordered condensed><thead>
               <tr>
               <th>ID</th>
               <th>编号</th>
               <th>名称</th>
               <th>规格</th>
               <th>单位</th>
               <th>图片</th>
               </tr></thead><tbody id="contact-list">{contactRows}</tbody></Table>
              {prev}
              <label id="page">{this.state.start+1}../{this.state.total}</label>
              {next}
              <input maxLength="6" size="6" onChange={this.handlePageChange} value={this.state.start_input} />
              <button id="page_go"  className="btn btn-info" onClick={this.jump}>跳转</button>
            </div>
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
