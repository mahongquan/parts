//import  ChatWebAPIUtils  from '../utils/ChatWebAPIUtils';
import Client from "./Client";
import  keyMirror from 'keymirror';
var Dispatcher    = require('flux').Dispatcher;
var EventEmitter      = require('events').EventEmitter;
var _                 = require('underscore');
var ChatConstants = {
  ActionTypes: keyMirror({
    CREATING_MESSAGE: null,
    CREATED_MESSAGE: null,
    CREATING_ITEM: null,
    CREATED_ITEM: null,
    FETCHING_ITEMS: null,
    FETCHED_ITEMS: null,
    CLICKING_ITEM: null,
    FETCHED_MESSAGES: null,
    NEW_MESSAGE: null,
    NEW_ITEM: null,
    CREATED_USER: null,
    UPDATED_ITEM: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null,
    SOCKET_ACTION: null
  })
};
/////////////////////////////////
var ActionTypes       = ChatConstants.ActionTypes;

var ItemActionCreators= {
  getItems: function(data) {
    console.log("ItemActionCreators");
    console.log(data);
    // ChatAppDispatcher.handleViewAction({
    //   type: ActionTypes.FETCHING_ITEMS,
    //   data: data
    // });
    Client.items(
      data
      ,(res)=>{
        console.log(res);
        ChatAppDispatcher.handleServerAction({
          type: ActionTypes.FETCHED_ITEMS,
          items: res
        });
      }
    );
  },
  creatingItem: function(name) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATING_ITEM,
      name: name 
    });
    // ChatWebAPIUtils.createItem({
    //   name: name 
    // });
  },
  clickItem: function(item) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CLICKING_ITEM,
      item: item
    });
  }
};
////////////////////////////////////////////////////////////////////////////////
var PayloadSources = ChatConstants.PayloadSources;

var ChatAppDispatcher = _.extend(new Dispatcher(), {
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  },
  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },
  handleSocketAction: function(action) {
    var payload = {
      source: PayloadSources.SOCKET_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

////////////////////////////////////////////////////////////////////////////
var _items = [];
var _total=0;
var CHANGE_EVENT = 'change';
var ActionTypes = ChatConstants.ActionTypes;

var sortItems = function() {
  _items = _.sortBy(_items, function(item) {
    return item.updatedAt;
  }).reverse();
};

class ItemStore extends{
  getCreatedItemData=(item)=>{
    //var date = Date.now();
    return {
      id:            item.id ,
      name:           item.name,
      bh:item.bh,
      guige:item.guige,
      danwei:item.danwei,
      image:item.image
    };
  }
  getAll=()=> {
    return [_items,_total];
  }
  emitChange=()=> {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener= (callback)=> {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener=(callback)=> {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

ItemStore.dispatchToken = ChatAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATING_ITEM:
      var conversation = ItemStore.getCreatedItemData({
        name: action.name
      });
      _items.push(conversation);
      ItemStore.emitChange(); 
      break;
    case ActionTypes.CREATED_ITEM:
      _items = _.map(_items, function(item) {
        if (item.name === action.item.name) {
          return action.item;
        } else {
          return item;
        }
      });
      ItemStore.emitChange();
      break;
    case ActionTypes.FETCHED_ITEMS:
      console.log(action);
      _items = _.map(action.items.data, ItemStore.getCreatedItemData);
      _total=action.items.total;
      ItemStore.emitChange();
      break;
    case ActionTypes.CLICKING_ITEM:
      _items = _.map(_items, function(item) {
        if (item._id === action.item._id) {
          item.isCurrent = true;
        } else {
          item.isCurrent = false;
        }
        return item;
      });
      ItemStore.emitChange();
      break;
    case ActionTypes.UPDATED_ITEM:
      _items = _.map(_items, function(item) {
        if (item._id === action.item._id) {
          action.item.isCurrent = item.isCurrent;
          return action.item;
        } else {
          return item;
        }
      });
      sortItems();
      ItemStore.emitChange();
      break;

    default:
  }
});
var myflux={ItemStore,ItemActionCreators};
export default myflux;
