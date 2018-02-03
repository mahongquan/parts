import  ChatWebAPIUtils  from '../utils/ChatWebAPIUtils';
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants     = require('../constants/ChatConstants');
var ActionTypes       = ChatConstants.ActionTypes;

export default {
  getRooms: function(search) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.FETCHED_ROOMS,
      name: search
    });
    ChatWebAPIUtils.getRooms({
      search: search 
    });
  },
  creatingRoom: function(data) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATING_ROOM,
      data: data
    });
    ChatWebAPIUtils.createRoom(data);
  },
  clickRoom: function(room) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CLICKING_ROOM,
      room: room
    });
  }
};
